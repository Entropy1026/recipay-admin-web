import { Component, OnInit, ViewChild } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BaseModel } from '../../../../../model/base-model';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from '../../../../../services/menu.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { isLoggedIn } from 'src/app/core/auth';

@Component({
  selector: 'kt-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.scss']
})
export class MenulistComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  displayedColumns: any = ['id', 'name', 'description', 'types','action'];
  dataSource: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  addMenu = false;
  menuGroup : FormGroup;
  id = null;
  pages: any;
  public menus = [];
  @ViewChild(MatPaginator , {static:true}) paginator: MatPaginator;
  constructor(private menuService: MenuService, private modalService: NgbModal,
    private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
    private deviceService: DeviceDetectorService,private fb: FormBuilder) {

  }
  
  
  // addClick(){
  //   this.router.navigateByUrl('default/menu/list/action');
  // }    
  ngOnInit() {
    this.menuGroup = this.fb.group({
      name: ['', Validators.compose([
				Validators.required
      ])
      
      ],
      type: [null, Validators.compose([
				Validators.required
      ])
      
			],
      description: ['', Validators.compose([
				Validators.required
			])
      ]
    });
    this.fetchdata();
  }
  close(){
    this.addMenu = false;
  }
  add(){
   this.addMenu=true;
   const controls = this.menuGroup.controls;
   controls['type'].setValue(null);
   controls['name'].setValue(" ");
   controls['description'].setValue(" ");
  }
  edit(id:any,data:any){
   this.addMenu=true;
   this.id = id;
   const controls = this.menuGroup.controls;
   controls['type'].setValue(data.type);
   controls['name'].setValue(data.name);
   controls['description'].setValue(data.description);
  }
  delete(id:any){
    this.blockUI.start('Loading'); // Start blocking
    this.menuService.delete(id).subscribe(
      dispute => {
        this.toastr.info(dispute.message);
      },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.menuService.fetchAll().subscribe(
          dispute => {
            this.dataSource = new MatTableDataSource<BaseModel>(dispute.data);
            // console.log(dispute.data);
            this.dataSource.paginator = this.paginator;
            // this.toastr.info(dispute.message);
          },
          err => {
            this.blockUI.stop();
          },
          () => {
            this.blockUI.stop();
          }
        );
      }
    );
 }
  fetchdata() {
    this.blockUI.start('Loading'); // Start blocking
    this.menuService.fetchAll().subscribe(
      menu => {
        this.dataSource = new MatTableDataSource<BaseModel>(menu.data);
        console.log(menu.data);
        this.dataSource.paginator = this.paginator;
        this.toastr.info(menu.message);
      },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.blockUI.stop();
      }
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getMenuList(){
    this.menuService.getAllMenu().subscribe(
       res=>{
           this.menus = res.data;
           console.log(res);
       }
      ,err => {}
      , ()=>
     {});
  }
  submit() {
    const controls = this.menuGroup.controls;
  
    // check form
    if (this.menuGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.blockUI.start('Loading'); // Start blocking
    this.menuService.addupdate(this.id,controls).subscribe((response) => {
    this.toastr.info(response.message);
    },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.menuService.fetchAll().subscribe(
          menu => {
            this.dataSource = new MatTableDataSource<BaseModel>(menu.data);
            console.log(menu.data);
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
        this.id = null;
        this.addMenu = false;
      }
    );
  }
}