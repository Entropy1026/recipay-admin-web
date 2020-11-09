import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CuisineService } from '../../../../../services/cuisine.service';
import { MenuService } from '../../../../../services/menu.service';
import { CuisineListComponent } from '../../menu/cuisine-list/cuisine-list.component';
import { MenulistComponent } from '../../menu/menulist/menulist.component';

@Component({
  selector: 'kt-create-menu-dialog',
  templateUrl: './create-menu-dialog.component.html',
  styleUrls: ['./create-menu-dialog.component.scss'],
  providers:[CuisineService]
})
export class CreateMenuDialogComponent implements OnInit {
  public cuisineForm:FormGroup;

  public image:any;
  public ref: AngularFireStorageReference;
  public task: AngularFireUploadTask;
  public message:any; 
  public imagePath: any;
  public imgURL: any;
  public imageurl: any;
  public cuisineData:any;
  public cuisines = null;
  public hasChanges = false;
  public cuisineList = [];
  constructor(
    private menuService:MenuService,
    private cuisineService:CuisineService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<MenulistComponent>,
    private ngxService:NgxUiLoaderService ,private fb:FormBuilder,private afStorage: AngularFireStorage , @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.cuisineData = data;
        console.log(data);
    }

  ngOnInit() {
    this.cuisineForm = this.fb.group({
    id:[],
    name:[null , Validators.required],
    description:[null , Validators.required],
    image:[null , Validators.required],
    cuisine:[null , Validators.required],
    });
    if(this.cuisineData.data){
      this.cuisineForm.controls.id.setValue(this.cuisineData.data.id);
      this.cuisineForm.controls.name.setValue(this.cuisineData.data.name);
      this.cuisineForm.controls.description.setValue(this.cuisineData.data.description);
      this.cuisineForm.controls.image.setValue(this.cuisineData.data.img);
      this.imgURL = this.cuisineData.data.img;
    }
    this.getCuisineList();
  }
  close(){
    this.dialogRef.close({refresh:this.hasChanges,data:this.cuisines});
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
    this.cuisineForm.controls.image.setValue(this.imageurl);
  }
  create(){
    let filter = this.cuisineForm.getRawValue();
    this.ngxService.startLoader('create-menu');
    this.menuService.addupdate({
     id:filter.id,
     name:filter.name,
     cuisine_id:filter.cuisine.id,
     desc:filter.description,
     fileurl:filter.image
     }).subscribe(
      cuisine => {
        this.cuisines = cuisine;
        this.hasChanges = true;
        if(filter.id){
          this.toastr.info("Updated Sucessfully");
        }
        else{
          this.toastr.info("Created Sucessfully");
        }
      },
      err => {
	   	this.ngxService.stopLoader('create-menu');
      },
      () => {
		 this.ngxService.stopLoader('create-menu');
      }
    );
  
 
  }
  public getCuisineList(){
    this.ngxService.startLoader('create-menu');
    this.cuisineService.fetchAll().subscribe(
      cuisine => {
      this.cuisineList = cuisine
      if(!this.cuisineData.data && cuisine.length > 0){
        this.cuisineForm.controls.cuisine.setValue(cuisine[0]);
      }
      if(this.cuisineData.data && cuisine.length > 0){
        console.log(this.cuisineList[this.cuisineList.findIndex(c=>c.id === this.cuisineData.data.cuisine.id)]);
        this.cuisineForm.controls.cuisine.setValue(this.cuisineList[this.cuisineList.findIndex(c=>c.id === this.cuisineData.data.cuisine.id)]);
      }
      },
      err => {
	   	this.ngxService.stopLoader('create-menu');
      },
      () => {
		this.ngxService.stopLoader('create-menu');
      }
    );
  }
}
