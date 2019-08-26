import { Injectable } from '@angular/core';
import { ApiService } from '../domain/api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseModel } from '../model/base-model';

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

}