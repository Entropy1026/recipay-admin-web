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
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'kt-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  
  @BlockUI() blockUI: NgBlockUI;
  displayedColumns: any = ['id','name','pax','price','sold','totalamount','available','replenish','restock','action'];
  displayedColumns2: any = ['name','qty','unit','action'];
  dataSource: MatTableDataSource<BaseModel>;
  dataSource2: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  invGroup: FormGroup;
  addrecipe:boolean = false;
  viewIngredients:boolean = false;
  pages: any;
  Unit = [
    {value: ' ', viewValue: 'none'},
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
  imagePath:any;
  imgURL: any;
  message: string;
  Quantity = [
    {value: '0.00', viewValue: '0'},
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
  category = [];
  image:any;
  invid = null;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  inv2Group: FormGroup;
  imageurl: string;
  constructor(
    private ngxService: NgxUiLoaderService,
    private inventoryService: InventoryService, private modalService: NgbModal,
    private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
    private deviceService: DeviceDetectorService,private fb: FormBuilder,
    private afStorage: AngularFireStorage) {

  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // upload(event) {
  //   // const id = Math.random().toString(36).substring(2);
  //   // this.ref = this.afStorage.ref(id);
  //   // this.task = this.ref.put(event.target.files[0]);
  //   var reader = new FileReader();
  //   // this.image = event.files;
  //   reader.readAsDataURL(event.target.files[0]); 
  //   reader.onload = (_event) => { 
  //     this.image = reader.result; 
  //   }
  // }
  upload(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(files[0]);
    this.imageurl = "https://firebasestorage.googleapis.com/v0/b/recipaymobile.appspot.com/o/"+id+"?alt=media";
    console.log(this.imageurl);
  }
   openRecipe(){
   this.addrecipe = true;
   const controls = this.invGroup.controls;
   controls.name.setValue("");
   controls.quantity.setValue(null);
   controls.unit.setValue(null);
  }
  close2(){
    this.addrecipe = false;
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
      this.inv2Group = this.fb.group({
        name: ['', Validators.compose([
          Validators.required
        ])],
        Insctruction: ['', Validators.compose([
          Validators.required
        ])]
        ,
        video: ['', Validators.compose([
          Validators.required
        ])],
        category: [null, Validators.compose([
          Validators.required
        ])],
        price: ['', Validators.compose([
          Validators.required
        ])]
        ,
        pax: ['', Validators.compose([
          Validators.required
        ])]
        ,
        type: ['', Validators.compose([
          Validators.required
        ])]
        ,
        stock: ['', Validators.compose([
          Validators.required
        ])]
        ,
        restock: ['', Validators.compose([
          Validators.required
        ])]
        ,
        replenish: ['', Validators.compose([
          Validators.required
        ])]
      });
    this.fetchdata();
    this.fetchcategory();
  }
  fetchcategory(){
    // fetch category
    this.category = [];
    this.inventoryService.getcategory().subscribe(categories => {
      categories.data.map((categor) => {
          let data = { value: categor.name, viewValue: categor.name }
          console.log
          this.category.push(data);
        });
      },
      err => {
      },
      () => {
      }
    );
  }
  ingredientopen(id:any){
    //get ingredients
    this.addrecipe=null;
    this.id = null;
    this.id = id;
    this.viewIngredients = true;
    this.ngxService.startLoader('inventory-fetch-ing');
    this.inventoryService.ingredients(id).subscribe(
      inv => {
        this.dataSource2 = new MatTableDataSource<BaseModel>(inv.data);
        console.log(inv.data);
        this.dataSource2.paginator = this.paginator;
        // this.toastr.info(inv.message);
      },
      err => {
        this.ngxService.stopLoader('inventory-fetch-ing');
      },
      () => {
        this.ngxService.stopLoader('inventory-fetch-ing');
      }
    );
  }
  submiting() {
    //add ingredients
    const controls = this.invGroup.controls;
    // check form
    if (this.invGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.ngxService.startLoader('inventory-fetch-ing');
    this.inventoryService.add(this.id,this.recipe,controls).subscribe((response) => {
    this.toastr.info(response.message);
    },
      err => {
      },
      () => {
        this.inventoryService.ingredients(this.id).subscribe(
          ads => {
            this.dataSource2 = new MatTableDataSource<BaseModel>(ads.data);
            console.log(ads.data);
            this.dataSource2.paginator = this.paginator;
  
          },
          err => {
            this.ngxService.stopLoader('inventory-fetch-ing');
          },
          () => {
            this.ngxService.stopLoader('inventory-fetch-ing');
          }
        );
        this.recipe = null;
      }
    );
  }
  updateinfo(data:any){
    this.invid = data.id;
    const controls = this.inv2Group.controls;
    this.addrecipe = true;
    controls['name'].setValue(data.name);
    controls['Insctruction'].setValue(data.text_instruction);
    controls['video'].setValue(data.video);
    controls['category'].setValue(data.category);
    controls['pax'].setValue(data.pax);
    controls['type'].setValue(data.type);
    controls['stock'].setValue(data.available);
    controls['restock'].setValue(data.restock);
    controls['replenish'].setValue(data.replinesh);
    controls['price'].setValue(data.price);
    this.imgURL =data.image;
    this.imageurl = data.image;

 }
  submit2() {
    const controls = this.inv2Group.controls;
    // check form
    //Add Product
    if (this.inv2Group.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.ngxService.startLoader('inventory-fetch');
    this.inventoryService.addRecipe(this.invid,this.imageurl,controls).subscribe((response) => {
    this.toastr.info(response.message);
    },
      err => {
        this.ngxService.stopLoader('inventory-fetch');
      },
      () => {
       this.fetchdata();
       this.ngxService.stopLoader('inventory-fetch');
       this.invid = null;
       this.addrecipe = null;
      }
    );
  }
  deleteing(id:any){
    // delete ingredients
    this.ngxService.startLoader('inventory-fetch-ing');
    this.inventoryService.deleteing(id).subscribe(
      inv => {
        this.toastr.info(inv.message);
      },
      err => {
      },
      () => {
          this.inventoryService.ingredients(this.recipe).subscribe(
          inv => {
            this.dataSource2 = new MatTableDataSource<BaseModel>(inv.data);
            console.log(inv.data);
            this.dataSource2.paginator = this.paginator;
            // this.toastr.info(inv.message);
            this.inventoryService.ingredients(this.id).subscribe(
              ads => {
                this.dataSource2 = new MatTableDataSource<BaseModel>(ads.data);
                console.log(ads.data);
                this.dataSource2.paginator = this.paginator;
      
              },
              err => {
                this.ngxService.stopLoader('inventory-fetch-ing');
              },
              () => {
                this.ngxService.stopLoader('inventory-fetch-ing');
              }
            );
          },
          err => {
            this.ngxService.stopLoader('inventory-fetch-ing');
          },
          () => {
            this.ngxService.stopLoader('inventory-fetch-ing');
          }
        );
      }
    );
  }
  delete(id:any){
    //delete inventory
    this.ngxService.startLoader('inventory-fetch');
    this.inventoryService.delete(id).subscribe(
      inv => {
        this.toastr.info(inv.message);
      },
      err => {
      },
      () => {
        this.inventoryService.fetchAll().subscribe(
          inv => {
            this.dataSource = new MatTableDataSource<BaseModel>(inv.data);
            console.log(inv.data);
            this.dataSource.paginator = this.paginator;
            // this.toastr.info(inv.message);
          },
          err => {
            this.ngxService.stopLoader('inventory-fetch');
          },
          () => {
            this.ngxService.stopLoader('inventory-fetch');
          }
        );
      }
    );
  }
  fetchdata() {
    this.ngxService.startLoader('inventory-fetch');
    this.inventoryService.fetchAll().subscribe(
      inv => {
        this.dataSource = new MatTableDataSource<BaseModel>(inv.data);
        console.log(inv.data);
        this.dataSource.paginator = this.paginator;
        this.toastr.info(inv.message);
      },
      err => {
        this.ngxService.stopLoader('inventory-fetch');
      },
      () => {
        this.ngxService.stopLoader('inventory-fetch');
      }
    );
  }
  replenish(id:any){
    this.ngxService.startLoader('inventory-fetch');
    this.inventoryService.replenish(id).subscribe(
      inv => {
        this.toastr.info(inv.message);
      },
      err => {
        this.ngxService.stopLoader('inventory-fetch');
      },
      () => {
        this.fetchdata();
        this.ngxService.stopLoader('inventory-fetch');
      }
    );
  }
}
