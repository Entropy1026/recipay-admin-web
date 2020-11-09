import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../../../../services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { MatTableDataSource, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { BaseModel } from '../../../../../../app/core/_base/crud';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { CreateCategoryDialogComponent } from '../../components/create-category-dialog/create-category-dialog.component';

@Component({
	selector: 'kt-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
	displayedColumns: any = ['name', 'image','action'];
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator , {static:true}) paginator: MatPaginator;
	constructor(private menuService: MenuService, private modalService: NgbModal,private ngxService:NgxUiLoaderService ,
	  private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
	  private deviceService: DeviceDetectorService,private fb: FormBuilder,private afStorage: AngularFireStorage, private dialog: MatDialog){
  
	}
	ngOnInit() {
	  this.getCategory();
	}
	getCategory(){
	  this.ngxService.startLoader('category-list');
	  this.menuService.fetchALlCategory().subscribe(
		category => {
		  this.dataSource = new MatTableDataSource<any>(category);
		  this.dataSource.paginator = this.paginator;
		  console.log(category);
		},
		err => {
			 this.ngxService.stopLoader('category-list');
		},
		() => {
		  this.ngxService.stopLoader('category-list');
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
  
	const dialogRef = this.dialog.open(CreateCategoryDialogComponent, dialogConfig);
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
			this.menuService.deleteCategory(id).subscribe(
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
