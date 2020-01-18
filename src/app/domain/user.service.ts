import { Injectable } from '@angular/core';



@Injectable()
export class UserLogService {
public firstname:any;
public lastname:any;
public middlename:any;
public username:any;
public email:any;
public image:any;
public mobile:any;


public setUser(data:any){
console.log(data);
this.firstname = data.firstname;
this.lastname = data.lastname;
this.middlename = data.middlename ;
this.username = data.username;
this.email =data.email;
this.mobile = data.mobile;
this.image= data.image;
}
public getUser(){
console.log(this.firstname);
return this.firstname;
}

}

