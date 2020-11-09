import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from 'angularfire2/storage';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BaseModel } from '../../../../../model/base-model';
import { IngredientsService } from '../../../../../services/ingredients.service';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { CreateIngredientDialogComponent } from '../../components/create-ingredient-dialog/create-ingredient-dialog.component';

@Component({
  selector: 'kt-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss'],
})
export class IngredientsListComponent implements OnInit {
  displayedColumns: any = ['name', 'description', 'image', 'date' , 'shelf','quantity','available','unit', 'action'];
  dataSource: MatTableDataSource<BaseModel>;
  @ViewChild(MatPaginator , {static:true}) paginator: MatPaginator;

  constructor(private ingredientsService: IngredientsService, private modalService: NgbModal,private ngxService:NgxUiLoaderService ,
    private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
    private deviceService: DeviceDetectorService,private fb: FormBuilder,private afStorage: AngularFireStorage, private dialog: MatDialog) { }

  ngOnInit() {
    this.getIngredients();
  }
  public getIngredients(){
    this.ngxService.startLoader('ingredients-list');
    this.ingredientsService.fetchAll().subscribe(
      cuisine => {
        this.dataSource = new MatTableDataSource<BaseModel>(cuisine);
        this.dataSource.paginator = this.paginator;
      },
      err => {
	   	this.ngxService.stopLoader('ingredients-list');
      },
      () => {
		this.ngxService.stopLoader('ingredients-list');
      }
    );
  
 
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


 create(data:any){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '700px';
  dialogConfig.disableClose = true;
  dialogConfig.data = {data:data};

  const dialogRef = this.dialog.open(CreateIngredientDialogComponent, dialogConfig);
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
//  delete(id:any){
//   // ConfirmationDialogComponent
//   const dialogConfig = new MatDialogConfig();
//   dialogConfig.width = '500px';
//   dialogConfig.disableClose = true;

//   const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
//   dialogRef.afterClosed()
//       .subscribe(res => {
//         console.log(res);
//         if(res && res.confirm){
//           this.ngxService.startLoader('cuisine-list');
//           this.cuisineService.delete({id:id}).subscribe(
//             cuisine => {
//               this.dataSource = new MatTableDataSource<BaseModel>(cuisine);
//               this.dataSource.paginator = this.paginator;
//             },
//             err => {
//              this.ngxService.stopLoader('cuisine-list');
//             },
//             () => {
//           this.ngxService.stopLoader('cuisine-list');
//             }
//           );
        
//         }
//       });
}

