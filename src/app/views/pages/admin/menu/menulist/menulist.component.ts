import { Component, OnInit, ViewChild } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { BaseModel } from '../../../../../model/base-model';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from '../../../../../services/menu.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { CreateMenuDialogComponent } from '../../components/create-menu-dialog/create-menu-dialog.component';
// import { isLoggedIn } from 'src/app/core/auth';

@Component({
  selector: 'kt-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.scss']
})
export class MenulistComponent implements OnInit {
  displayedColumns: any = ['name', 'description', 'cuisine','image','action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator , {static:true}) paginator: MatPaginator;
  constructor(private menuService: MenuService, private modalService: NgbModal,private ngxService:NgxUiLoaderService ,
    private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
    private deviceService: DeviceDetectorService,private fb: FormBuilder,private afStorage: AngularFireStorage, private dialog: MatDialog){

  }
  ngOnInit() {
    this.getMenu();
  }
  getMenu(){
    this.ngxService.startLoader('menu-list');
    this.menuService.fetchAll().subscribe(
      menu => {
        this.dataSource = new MatTableDataSource<any>(menu);
        this.dataSource.paginator = this.paginator;
        console.log(menu);
      },
      err => {
	   	this.ngxService.stopLoader('menu-list');
      },
      () => {
		this.ngxService.stopLoader('menu-list');
      }
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


 create(data:any){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '500px';
  dialogConfig.disableClose = true;
  dialogConfig.data = {data:data};

  const dialogRef = this.dialog.open(CreateMenuDialogComponent, dialogConfig);
  dialogRef.afterClosed()
      .subscribe(res => {
        console.log(res);
        if(res && res.refresh){
          console.log(res);
          this.dataSource = new MatTableDataSource<BaseModel>(res.data);
          this.dataSource.paginator = this.paginator;
        }
      });
 }
 delete(id:any){
  // ConfirmationDialogComponent
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '500px';
  dialogConfig.disableClose = true;

  const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
  dialogRef.afterClosed()
      .subscribe(res => {
        console.log(res);
        if(res && res.confirm){
          this.ngxService.startLoader('menu-list');
          this.menuService.delete(id).subscribe(
            cuisine => {
              this.dataSource = new MatTableDataSource<BaseModel>(cuisine);
              this.dataSource.paginator = this.paginator;
            },
            err => {
             this.ngxService.stopLoader('menu-list');
            },
            () => {
          this.ngxService.stopLoader('menu-list');
            }
          );
        
        }
      });
}
}
