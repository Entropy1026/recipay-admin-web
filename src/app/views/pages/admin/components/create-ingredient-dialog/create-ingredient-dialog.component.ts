import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IngredientsService } from '../../../../../services/ingredients.service';
import { IngredientsListComponent } from '../../menu/ingredients-list/ingredients-list.component';

@Component({
  selector: 'kt-create-ingredient-dialog',
  templateUrl: './create-ingredient-dialog.component.html',
  styleUrls: ['./create-ingredient-dialog.component.scss']
})
export class CreateIngredientDialogComponent implements OnInit {
  public createForm:FormGroup;

  public image:any;
  public ref: AngularFireStorageReference;
  public task: AngularFireUploadTask;
  public message:any; 
  public imagePath: any;
  public imgURL: any;
  public imageurl: any;
  public dialogData:any;
  public cuisines = null;
  public hasChanges = false;
  constructor(
    private ingredientsService:IngredientsService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<IngredientsListComponent>,
    private ngxService:NgxUiLoaderService ,private fb:FormBuilder,private afStorage: AngularFireStorage , @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.dialogData = data;
        console.log(data);
    }

  ngOnInit() {
    this.createForm = this.fb.group({
    id:[],
    name:[null , Validators.required],
    description:[null , Validators.required],
    image:[null , Validators.required],
    life:[null , Validators.required],
    quantity:[null , Validators.required],
    available:[null , Validators.required],
    unit:[null , Validators.required],
    });
    if(this.dialogData.data){
      this.createForm.controls.id.setValue(this.dialogData.data.id);
      this.createForm.controls.name.setValue(this.dialogData.data.name);
      this.createForm.controls.description.setValue(this.dialogData.data.description);
      this.createForm.controls.image.setValue(this.dialogData.data.image);
      this.createForm.controls.life.setValue(this.dialogData.data.life);
      this.createForm.controls.quantity.setValue(this.dialogData.data.quantity);
      this.createForm.controls.available.setValue(this.dialogData.data.available);
      this.createForm.controls.unit.setValue(this.dialogData.data.unit);
      this.imgURL = this.dialogData.data.image;
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
    this.createForm.controls.image.setValue(this.imageurl);
  }
  create(){
    let filter = this.createForm.getRawValue();
    this.ngxService.startLoader('create-cuisine');
    this.ingredientsService.addupdate({
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
