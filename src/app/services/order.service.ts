import { Injectable } from '@angular/core';
import { ApiService } from '../domain/api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseModel } from '../model/base-model';

@Injectable()
export class OrderService {

    constructor(private _api: ApiService) { }

    public fetchAll(): Observable<BaseModel> {
        return this._api.get('open/order/adminfetchOrder')
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public fetchAll2(): Observable<BaseModel> {
        return this._api.get('open/order/preparationOrder')
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    throwUp(value: boolean): Observable<boolean> {
        return throwError(new Error('COULD NOT UPDATE FAM!'));
    }
    
    public updatetoprepair(id:any) {
        let params = {
            id: id,
        };
        return this._api.post('open/order/updatetoPrepair', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public cancelorder(id:any) {
        let params = {
            id: id,
        };
        return this._api.post('open/order/cancelOrder', params)
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