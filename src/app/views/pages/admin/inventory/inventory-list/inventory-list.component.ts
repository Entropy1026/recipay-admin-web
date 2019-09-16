import { Component, OnInit, ViewChild } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BaseModel } from '../../../../../model/base-model';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from '../../../../../services/inventory.service';
// import { isLoggedIn } from 'src/app/core/auth';
declare var $: any;
declare var jQuery: any;
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
@Component({
  selector: 'kt-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  
  @BlockUI() blockUI: NgBlockUI;
  displayedColumns: any = ['id','name','pax','price','sold','totalamount','type','action'];
  displayedColumns2: any = ['name','qty','unit','action'];
  dataSource: MatTableDataSource<BaseModel>;
  dataSource2: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  invGroup: FormGroup;
  addrecipe:boolean = false;
  viewIngredients:boolean = false;
  pages: any;
  Unit = [
    {value: 'piece', viewValue: 'piece'},
    {value: 'pieces', viewValue: 'pieces'},
    {value: 'lbs', viewValue: 'lbs'},
    {value: 'spoon', viewValue: 'spoon'},
    {value: 'tablespoon', viewValue: 'tablespoon'},
    {value: 'oz', viewValue: 'oz'},
    {value: 'cup', viewValue: 'cup'},
    {value: 'lt', viewValue: 'lt'},
    {value: 'cloves', viewValue: 'gloves'},
    {value: 'small-cubed', viewValue: 'cubed'},
    
  ];
  id=null;
  recipe=null;
  Quantity = [
    {value: '1.00', viewValue: '1'},
    {value: '2.00', viewValue: '2'},
    {value: '3.00', viewValue: '3'},
    {value: '4.00', viewValue: '4'},
    {value: '5.00', viewValue: '5'},
    {value: '6.00', viewValue: '6'},
    {value: '7.00', viewValue: '7'},
    {value: '8.00', viewValue: '8'},
    {value: '9.00', viewValue: '9'},
    {value: '10.00', viewValue: '10'},
    {value: '11.00', viewValue: '11'},
    {value: '12.00', viewValue: '12'},
    {value: '13.00', viewValue: '13'},
    {value: '14.00', viewValue: '14'},
    {value: '15.00', viewValue: '15'},
    {value: '16.00', viewValue: '16'},
    {value: '17.00', viewValue: '17'},
    {value: '18.00', viewValue: '18'},
    {value: '19.00', viewValue: '19'},
    {value: '20.00', viewValue: '20'}
  ];
  image= "";
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private inventoryService: InventoryService, private modalService: NgbModal,
    private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
    private deviceService: DeviceDetectorService,private fb: FormBuilder,
    private afStorage: AngularFireStorage) {

  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  upload(event) {
    // const id = Math.random().toString(36).substring(2);
    // this.ref = this.afStorage.ref(id);
    // this.task = this.ref.put(event.target.files[0]);
    var reader = new FileReader();

    reader.onload = function (e) {
        $('#product')
            .attr('src', event.target.result)
            .width(150)
            .height(200);
    };

    reader.readAsDataURL(event.target.files[0]);
  }
   openRecipe(){
   this.addrecipe = true;
   const controls = this.invGroup.controls;
   controls.name.setValue("");
   controls.quantity.setValue(null);
   controls.unit.setValue(null);
  }
  closeing(){
    this.viewIngredients=false;
    const controls = this.invGroup.controls;
    controls.name.setValue("");
    controls.quantity.setValue(null);
    controls.unit.setValue(null);
  }
  updateing(data:any){
    this.recipe = data.id;
    const controls = this.invGroup.controls;
    controls.name.setValue(data.name);
    controls.quantity.setValue(data.quantity);
    controls.unit.setValue(data.unit);
  }
  ngOnInit() {
    this.invGroup = this.fb.group({
      name: ['', Validators.compose([
				Validators.required
			])
			],
      quantity: [null, Validators.compose([
				Validators.required
			])
      ],
      unit: [null]
    });
    this.fetchdata();
  }
  ingredientopen(id:any){
    this.id = null;
    this.id = id;
    this.viewIngredients = true;
    this.blockUI.start('Loading Ingredients'); // Start blocking
    this.inventoryService.ingredients(id).subscribe(
      inv => {
        this.dataSource2 = new MatTableDataSource<BaseModel>(inv.data);
        console.log(inv.data);
        this.dataSource2.paginator = this.paginator;
        // this.toastr.info(inv.message);
      },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.blockUI.stop();
      }
    );
  }
  submiting() {
    const controls = this.invGroup.controls;
    // check form
    if (this.invGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.blockUI.start('Loading'); // Start blocking
    this.inventoryService.add(this.id,this.recipe,controls).subscribe((response) => {
    this.toastr.info(response.message);
    },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.inventoryService.ingredients(this.id).subscribe(
          ads => {
            this.dataSource2 = new MatTableDataSource<BaseModel>(ads.data);
            console.log(ads.data);
            this.dataSource2.paginator = this.paginator;
  
          },
          err => {
            this.blockUI.stop();
          },
          () => {
            // this.blockUI.stop();
          }
        );
        this.blockUI.stop();
        this.recipe = null;
      }
    );
  }
  deleteing(id:any){
    this.blockUI.start('Loading'); // Start blocking
    this.inventoryService.deleteing(id).subscribe(
      inv => {
        this.toastr.info(inv.message);
      },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.blockUI.start('Loading'); // Start blocking
    this.inventoryService.ingredients(this.recipe).subscribe(
          inv => {
            this.dataSource2 = new MatTableDataSource<BaseModel>(inv.data);
            console.log(inv.data);
            this.dataSource2.paginator = this.paginator;
            // this.toastr.info(inv.message);
          },
          err => {
            this.blockUI.stop();
          },
          () => {
            this.blockUI.stop();
          }
        );
        this.blockUI.stop();
      }
    );
  }
  delete(id:any){
    this.blockUI.start('Loading'); // Start blocking
    this.inventoryService.delete(id).subscribe(
      inv => {
        this.toastr.info(inv.message);
      },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.blockUI.start('Loading'); // Start blocking
        this.inventoryService.fetchAll().subscribe(
          inv => {
            this.dataSource = new MatTableDataSource<BaseModel>(inv.data);
            console.log(inv.data);
            this.dataSource.paginator = this.paginator;
            // this.toastr.info(inv.message);
          },
          err => {
            this.blockUI.stop();
          },
          () => {
            this.blockUI.stop();
          }
        );
        this.blockUI.stop();
      }
    );
  }
  fetchdata() {
    this.blockUI.start('Loading'); // Start blocking
    this.inventoryService.fetchAll().subscribe(
      inv => {
        this.dataSource = new MatTableDataSource<BaseModel>(inv.data);
        console.log(inv.data);
        this.dataSource.paginator = this.paginator;
        this.toastr.info(inv.message);
      },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.blockUI.stop();
      }
    );
  }
}
