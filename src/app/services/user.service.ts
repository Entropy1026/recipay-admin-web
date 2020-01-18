import { Injectable } from '@angular/core';
import { ApiService } from '../domain/api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseModel } from '../model/base-model';
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class UserService {

    constructor(private _api: ApiService) { }

    public fetchAll(): Observable<BaseModel> {
        return this._api.get('open/users/fetchAll')
            .pipe(catchError((err) => this._api.handleError(err)));
    }

    throwUp(value: boolean): Observable<boolean> {
        return throwError(new Error('COULD NOT UPDATE FAM!'));
    }

    public action(id:any,data:string) {
        let params = {
            id: id,
            action: data
        };
        return this._api.post('open/users/adminUpdateStatus', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    
    public addUser(data:any,username:string) {
        
        let params = {
            username: username,
            firstname: data.firstname.value ,
            middlename: data.middlename.value ,
            lastname: data.lastname.value ,
            mobile: data.mobile.value ,
            email: data.email.value ,
            user_status: data.user_status.value ,
            user_type: data.user_type.value ,
        };
        return this._api.post('open/users/addforAdmin', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public login(username:string,password:string) {
        let params = {
            username: username,
            password: password ,
        
        };
        return this._api.post('open/users/login', params)
        .pipe(catchError((err) => this._api.handleError(err)));
    }

}