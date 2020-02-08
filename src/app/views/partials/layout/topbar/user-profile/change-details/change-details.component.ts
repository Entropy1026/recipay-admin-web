import { Component, OnInit, Inject } from '@angular/core';
import {UserProfileComponent} from '../user-profile.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { UserService } from '../../../../../../../../src/app/services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
// import { UserService } from '../../../../../pages/admin/';

@Component({
  selector: 'kt-change-details',
  templateUrl: './change-details.component.html',
  styleUrls: ['./change-details.component.scss'],
  providers: [UserService]
})
export class ChangeDetailsComponent implements OnInit {
  message;
  dialogData;
  imgURL:any;
  image:any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  root:any;
  personalGroup: FormGroup;

  imagePath: any;
  imageurl: any;
  constructor(private dialogRef: MatDialogRef<UserProfileComponent>,
	private ngxService: NgxUiLoaderService ,
	private userService: UserService,
	private toastr: ToastrService,
	private http: HttpClient,
    private fb: FormBuilder,private afStorage: AngularFireStorage,
	@Inject(MAT_DIALOG_DATA) data: any
	) {
	 this.dialogData = data;
	 this.imgURL = this.dialogData[0].data.image;
	 console.log(data);
	 this.root = `${environment.apiUrl}`;
	}

  ngOnInit() {
	this.personalGroup = this.fb.group({
	name:[null , Validators.required],
	lastname:[null , Validators.required],
	middlename:[null , Validators.required],
	mobile:[null , Validators.required],
	username:[null , Validators.required]
	});
	if(this.dialogData[0].action === 'personal') {
	  this.personalGroup.controls.name.setValue(this.dialogData[0].data.name);
	  this.personalGroup.controls.lastname.setValue(this.dialogData[0].data.lastname);
	  this.personalGroup.controls.middlename.setValue(this.dialogData[0].data.middlename);
	  this.personalGroup.controls.mobile.setValue(this.dialogData[0].data.mobile);
	  this.personalGroup.controls.username.setValue(this.dialogData[0].data.username);
	}
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
    // this.menuGroup.controls.image.setValue(this.imageurl);
  }
  close() {
  this.dialogRef.close();
  }
  submiPicture() {
   if(this.imgURL === null ){
	  this.toastr.error("Please select an image");
   }
   else if(this.imgURL === this.dialogData[0].data.image){
	this.toastr.error("Cannot apply changes because youre already using this pricture");
   }
   const headers = {
	headers : new HttpHeaders({
	 'Accept': 'application/json',
	 'Content-Type': 'application/json',
	 'Access-Control-Allow-Origin' : "*"
	})
	};
   this.http.post(this.root + '/open/users/updateImageInfo' , {id: this.dialogData[0].data.id,image:this.imgURL} , headers ).subscribe(
   (res: any) => {
   this.toastr.info(res.message);
   localStorage.setItem('image',this.imgURL);
   },
   err => {

   },
   () => {

   });
  }
  submitPersonal() {
	const controls = this.personalGroup.controls;

    // check form
    if (this.personalGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
	}
	const headers = {
	 headers : new HttpHeaders({
	  'Accept': 'application/json',
	  'Content-Type': 'application/json',
	  'Access-Control-Allow-Origin' : "*"
	 })
	 };
	let params = {
	id:this.dialogData[0].data.id,
	fname:controls.name.value,
	lname:controls.lastname.value,
	mname:controls.middlename.value,
	mobile:controls.mobile.value,
	username:controls.username.value
	};
	this.http.post(this.root + '/open/users/updatePersonalInfo' , params , headers ).subscribe(
	(res: any) => {
	this.toastr.info(res.message);
	localStorage.setItem('firstname',controls.name.value);
	localStorage.setItem('lastname',controls.lastname.value);
	localStorage.setItem('middlename',controls.middlename.value);
	localStorage.setItem('username',controls.username.value);
	localStorage.setItem('mobile',controls.mobile.value);
	},
	err => {

	},
	() => {

	});
   }
}
