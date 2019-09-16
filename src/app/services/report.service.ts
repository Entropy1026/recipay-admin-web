import { BaseModel } from '../model/base-model';
import { map } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../domain/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReportService {

    constructor(private _api: ApiService) { }

    public fetchAll(): Observable<BaseModel> {
        return this._api.get('open/order/orderSales')
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