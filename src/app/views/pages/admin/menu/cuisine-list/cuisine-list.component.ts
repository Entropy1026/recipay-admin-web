import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from 'angularfire2/storage';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { BaseModel } from '../../../../../model/base-model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CuisineService } from '../../../../../services/cuisine.service';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { CreateCuisineDialogComponent } from '../../components/create-cuisine-dialog/create-cuisine-dialog.component';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'kt-cuisine-list',
  templateUrl: './cuisine-list.component.html',
  styleUrls: ['./cuisine-list.component.scss'],
  providers:[CuisineService]
})
export class CuisineListComponent implements OnInit {
  displayedColumns: any = ['name', 'description', 'image','action'];
  dataSource: MatTableDataSource<BaseModel>;
  @ViewChild(MatPaginator , {static:true}) paginator: MatPaginator;

  constructor(private cuisineService: CuisineService, private modalService: NgbModal,private ngxService:NgxUiLoaderService ,
    private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
    private deviceService: DeviceDetectorService,private fb: FormBuilder,private afStorage: AngularFireStorage, private dialog: MatDialog) { }

  ngOnInit() {
    this.getCuisine();
  }
  public getCuisine(){
    this.ngxService.startLoader('cuisine-list');
    this.cuisineService.fetchAll().subscribe(
      cuisine => {
        this.dataSource = new MatTableDataSource<BaseModel>(cuisine);
        this.dataSource.paginator = this.paginator;
      },
      err => {
	   	this.ngxService.stopLoader('cuisine-list');
      },
      () => {
		this.ngxService.stopLoader('cuisine-list');
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

  const dialogRef = this.dialog.open(CreateCuisineDialogComponent, dialogConfig);
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
          this.ngxService.startLoader('cuisine-list');
          this.cuisineService.delete({id:id}).subscribe(
            cuisine => {
              this.dataSource = new MatTableDataSource<BaseModel>(cuisine);
              this.dataSource.paginator = this.paginator;
            },
            err => {
             this.ngxService.stopLoader('cuisine-list');
            },
            () => {
          this.ngxService.stopLoader('cuisine-list');
            }
          );
        
        }
      });
}

}
