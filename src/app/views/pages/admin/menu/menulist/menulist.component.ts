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
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
  message: string;
  public menus = [];

  image:any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  imagePath: any;
  imgURL: any;
  imageurl: any;

  @ViewChild(MatPaginator , {static:true}) paginator: MatPaginator;
  constructor(private menuService: MenuService, private modalService: NgbModal,private ngxService:NgxUiLoaderService ,
    private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
    private deviceService: DeviceDetectorService,private fb: FormBuilder,private afStorage: AngularFireStorage) {

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
	  ],
	  image: [null, Validators.compose([
		Validators.required
	])
],
    });
	this.fetchdata();
	this.getMenuList();
  }
  close(){
	this.addMenu = false;
	this.imgURL = null;
	this.id = null;
  }
  add(){
   this.addMenu=true;
   const controls = this.menuGroup.controls;
   controls['type'].setValue(null);
   controls['name'].setValue(" ");
   controls['description'].setValue(" ");
   controls['image'].setValue(" ");
   this.imgURL = null;
  }
  edit(id:any,data:any){
   this.addMenu=true;
   this.id = id;
   const controls = this.menuGroup.controls;
   controls['type'].setValue(data.type);
   controls['name'].setValue(data.name);
   controls['description'].setValue(data.description);
   controls['image'].setValue(data.image);
   this.imgURL = data.image;
  }
  delete(id:any){
    this.ngxService.startLoader('category-fetch-2');
    this.menuService.delete(id).subscribe(
      dispute => {
        this.toastr.info(dispute.message);
      },
      err => {

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
            this.ngxService.stopLoader('category-fetch-2');
          },
          () => {
            this.ngxService.stopLoader('category-fetch-2');
          }
        );
      }
    );
 }
  fetchdata() {
    this.ngxService.startLoader('category-fetch-2');
    this.menuService.fetchAll().subscribe(
      menu => {
        this.dataSource = new MatTableDataSource<BaseModel>(menu.data);
        console.log(menu.data);
        this.dataSource.paginator = this.paginator;
        this.toastr.info(menu.message);
      },
      err => {
		this.ngxService.stopLoader('category-fetch-2');
      },
      () => {
		this.ngxService.stopLoader('category-fetch-2');
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
    this.ngxService.startLoader('category-fetch'); // Start blocking
    this.menuService.addupdate(this.id,controls).subscribe((response) => {
    this.toastr.info(response.message);
    },
      err => {
		this.ngxService.stopLoader('category-fetch');
      },
      () => {
		this.ngxService.stopLoader('category-fetch');
		this.ngxService.startLoader('category-fetch-2');
        this.menuService.fetchAll().subscribe(
          menu => {
            this.dataSource = new MatTableDataSource<BaseModel>(menu.data);
            console.log(menu.data);
            this.dataSource.paginator = this.paginator;

          },
          err => {
			this.ngxService.stopLoader('category-fetch-2');
          },
          () => {
			this.ngxService.stopLoader('category-fetch-2');
          }
        );
        this.id = null;
        this.addMenu = false;
      }
    );
  }
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
    this.menuGroup.controls.image.setValue(this.imageurl);
  }
}
