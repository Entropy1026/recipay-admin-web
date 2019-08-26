import { Component, OnInit, ViewChild } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BaseModel } from '../../../../../model/base-model';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../../services/user.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { isLoggedIn } from 'src/app/core/auth';

@Component({
  selector: 'kt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  displayedColumns: any = ['id', 'username', 'firstname', 'lastname',
    'status', 'user_type', 'action'];
  dataSource: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  pages: any;
  seemoreinfo: boolean = false;
  //user-information
  name: any = ""; username: any = ""; lastname: any = ""; middlename: any = ""; mobile: any = "";
  email: any = ""; status: any = ""; user_type: any = ""; order_made: any = ""; product_favorite: any = "";
  joined: any; lastlogged: any;
  isMobile: boolean = this.deviceService.isMobile();
  constructor(private userService: UserService, private modalService: NgbModal,
    private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
    private deviceService: DeviceDetectorService) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.fetchdata();
    if (this.isMobile) {
      this.pages = 5;
    }
    else {
      this.pages = 10;
    }
  }
  fetchdata() {
    this.blockUI.start('Loading'); // Start blocking
    this.userService.fetchAll().subscribe(
      user => {
        this.dataSource = new MatTableDataSource<BaseModel>(user.data);
        console.log(user.data);
        this.dataSource.paginator = this.paginator;
        this.toastr.info(user.message);
      },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.blockUI.stop();
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
          this.blockUI.start('Loading'); // Start blocking
          this.userService.action(id, data).subscribe((response) => {
            this.toastr.info(response.message);
          },
            err => {
              this.blockUI.stop();
            },
            () => {
              this.userService.fetchAll().subscribe(
                user => {
                  this.dataSource = new MatTableDataSource<BaseModel>(user.data);
                  console.log(user.data);
                  this.dataSource.paginator = this.paginator;

                },
                err => {
                  this.blockUI.stop();
                },
                () => {
                  // this.blockUI.stop();
                }
              );
              this.blockUI.stop();
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
}
