import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CuisineService } from '../../../../../services/cuisine.service';
import { CuisineListComponent } from '../../menu/cuisine-list/cuisine-list.component';

@Component({
  selector: 'kt-create-cuisine-dialog',
  templateUrl: './create-cuisine-dialog.component.html',
  styleUrls: ['./create-cuisine-dialog.component.scss'],
  providers:[CuisineService]
})
export class CreateCuisineDialogComponent implements OnInit {
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
  constructor(
    private cuisineService:CuisineService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<CuisineListComponent>,
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
    });
    if(this.cuisineData.data){
      this.cuisineForm.controls.id.setValue(this.cuisineData.data.id);
      this.cuisineForm.controls.name.setValue(this.cuisineData.data.name);
      this.cuisineForm.controls.description.setValue(this.cuisineData.data.description);
      this.cuisineForm.controls.image.setValue(this.cuisineData.data.image);
      this.imgURL = this.cuisineData.data.image;
    }
  }
  // this.dialogRef.close(); 

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
    this.ngxService.startLoader('create-cuisine');
    this.cuisineService.addupdate({
     id:filter.id,
     name:filter.name,
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
	   	this.ngxService.stopLoader('create-cuisine');
      },
      () => {
		this.ngxService.stopLoader('create-cuisine');
      }
    );
  
 
  }
}
