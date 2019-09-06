
import { BaseModel } from '../model/base-model';
import { map } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../domain/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {

    constructor(private _api: ApiService) { }

    public fetchAll(): Observable<BaseModel> {
        return this._api.get('open/order/adminfetchOrder')
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public getcarriers(): Observable<BaseModel> {
        return this._api.get('open/users/getAvailCarrier')
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public fetchAll2(): Observable<BaseModel> {
        return this._api.get('open/order/preparationOrder')
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public fetchAll3(): Observable<BaseModel> {
        return this._api.get('open/order/workOrders')
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
    public setcarriers(id:any,controls:any) {
        let params = {
            id: id,
            carrier:controls
        };
        return this._api.post('open/order/AssignCarrier', params)
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