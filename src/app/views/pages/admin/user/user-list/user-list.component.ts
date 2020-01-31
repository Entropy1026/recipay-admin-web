import { Component, OnInit, ViewChild } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BaseModel } from '../../../../../model/base-model';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../../services/user.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { isLoggedIn } from 'src/app/core/auth';

@Component({
  selector: 'kt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  userGroup: FormGroup;
  userType = [
    {value: 'admin', viewValue: 'admin'},
    {value: 'carrier', viewValue: 'Carrier'}
  ];
  userStatus = [
    {value: 'active', viewValue: 'Active'},
    {value: 'suspended', viewValue: 'Suspended'}
  ];
  displayedColumns: any = ['id', 'username', 'firstname', 'lastname',
    'status', 'user_type', 'action'];
  dataSource: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  pages: any;
  seemoreinfo: boolean = false;
  newuser:boolean = false;
  //user-information
  name: any = ""; username: any = ""; lastname: any = ""; middlename: any = ""; mobile: any = "";
  email: any = ""; status: any = ""; user_type: any = ""; order_made: any = ""; product_favorite: any = "";
  joined: any; lastlogged: any;
  isMobile: boolean = this.deviceService.isMobile();
  constructor(private ngxService: NgxUiLoaderService,private userService: UserService, private modalService: NgbModal,
    private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
    private deviceService: DeviceDetectorService,private fb: FormBuilder) {

  }

  @ViewChild(MatPaginator , {static:true}) paginator: MatPaginator;

  ngOnInit() {
    this.userGroup = this.fb.group({
      username: ['', Validators.compose([
				Validators.required
			])
			],
      firstname: ['', Validators.compose([
				Validators.required
			])
      ],
      lastname: ['', Validators.compose([
        Validators.required
			])
      ],
      middlename: ['', Validators.compose([
				Validators.required,
			])
      ],
      mobile: ['', Validators.compose([
        Validators.required,
			])
      ],
      email: ['', Validators.compose([
				Validators.required,
			])
      ],
      user_type: [null, Validators.compose([
				Validators.required

			])
      ],
      user_status: [null, Validators.compose([
				Validators.required

			])
			],
    });
    this.fetchdata();
    if (this.isMobile) {
      this.pages = 5;
    }
    else {
      this.pages = 10;
    }
  }
  fetchdata() {
    this.ngxService.startLoader("user");
    this.userService.fetchAll().subscribe(
      user => {
        this.dataSource = new MatTableDataSource<BaseModel>(user.data);
        console.log(user.data);
        this.dataSource.paginator = this.paginator;
        this.toastr.info(user.message);
      },
      err => {
        this.ngxService.stopLoader("user");
      },
      () => {
        this.ngxService.stopLoader("user");
      }
    );
  }
  more(data: any) {
    this.username = data.username;
    this.name = data.firstname;
    this.lastname = data.lastname;
    this.middlename = data.middlename;
    this.mobile = data.mobile;
    this.lastlogged = data.last_logged.date;
    this.joined = data.joined.date;
    this.status = data.status;
    this.user_type = data.user_type;
    this.order_made = data.order_made;
    this.product_favorite = data.product_favorite;
    this.email = data.email;
    this.seemoreinfo = true;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  action(id: any, data: string) {

    // let enableDisable = data ? "Suspend" : "Unsuspend";
    this.confirmDialogService.confirm('Confirmation', 'Are you sure', '?')
      .then((confirmed) => {
        if (confirmed == true) {
          this.ngxService.startLoader("user");
          this.userService.action(id, data).subscribe((response) => {
            this.toastr.info(response.message);
          },
            err => {
            },
            () => {
              this.userService.fetchAll().subscribe(
                user => {
                  this.dataSource = new MatTableDataSource<BaseModel>(user.data);
                  console.log(user.data);
                  this.dataSource.paginator = this.paginator;

                },
                err => {
                  this.ngxService.stopLoader("user");
                },
                () => {
                  this.ngxService.stopLoader("user");
                }
              );
            }
          );
        }
        else {

        }

      })
      .catch();
  }
  closeInfo(){
    this.seemoreinfo = false;
  }
  addUser(){
    this.seemoreinfo = false;
    this.newuser = true;
  }
  closeAdd() {
    this.newuser = false;
  }
  submit() {
		const controls = this.userGroup.controls;

		// check form
		if (this.userGroup.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
    }
    this.ngxService.startLoader('user-proc'); // Start blocking
    this.userService.addUser(controls,controls.username.value).subscribe((response) => {
    this.toastr.info(response.message);
    },
      err => {
      },
      () => {
        this.ngxService.stopLoader('user-proc');
        this.ngxService.startLoader('user');
        this.userService.fetchAll().subscribe(
          user => {
            this.dataSource = new MatTableDataSource<BaseModel>(user.data);
            console.log(user.data);
            this.dataSource.paginator = this.paginator;
            this.newuser = false;

          },
          err => {
            this.ngxService.stopLoader('user');
          },
          () => {
            this.ngxService.stopLoader('user');
          }
        );

      }
    );
  }
}
