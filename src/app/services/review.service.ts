import { Injectable } from '@angular/core';
import { ApiService } from '../domain/api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseModel } from '../model/base-model';

@Injectable()
export class ReviewService {

    constructor(private _api: ApiService) { }

    public fetchAll(): Observable<BaseModel> {
        return this._api.get('admin/products/fetchallRating')
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public fetchselected(choice:any) {
        let params = {
            status: choice
        };
        return this._api.post('admin/products/selectedRating', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    throwUp(value: boolean): Observable<boolean> {
        return throwError(new Error('COULD NOT UPDATE FAM!'));
    }
    public delete(id:any) {
        let params = {
            id: id,
        };
        return this._api.post('admin/products/deleteRating', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public sendresponse(id:any,user:any,controls:any) {
        let params = {
            id: id,
            username:user ,
            message:controls.message.value
        };
        return this._api.post('admin/dispute/sendResponseReview', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public updateComment(id:any,controls:any) {
        let params = {
            id: id,
            comment:controls.comment.value
        };
        return this._api.post('admin/products/updateRating', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    // public toggleBooking(companyid: string, status: boolean, field: string) {
    //     let params = {
    //         companyId: companyid,
    //         status: status,
    //         field: field
    //     };
    //     return this._api.post('admin/company/updateBarkotaFlags', params)
    //         .pipe(catchError((err) => this._api.handleError(err)));
    // }

}