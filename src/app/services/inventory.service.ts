import { Injectable } from '@angular/core';
import { ApiService } from '../domain/api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseModel } from '../model/base-model';

@Injectable()
export class InventoryService {

    constructor(private _api: ApiService) { }

    public fetchAll(): Observable<BaseModel> {
        return this._api.get('admin/products/findall')
            .pipe(catchError((err) => this._api.handleError(err)));
    }

    throwUp(value: boolean): Observable<boolean> {
        return throwError(new Error('COULD NOT UPDATE FAM!'));
    }

    public delete(id:any) {
        let params = {
            id: id,
        };
        return this._api.post('admin/products/delete', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public replenish(id:any) {
        let params = {
            id: id,
        };
        return this._api.post('admin/products/replenishProduct', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public deleteing(id:any) {
        let params = {
            id: id,
        };
        return this._api.post('admin/products/deleteIng', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public add(recipe:any,id:any,controls:any) {
        let params = {
            id: id,
            recipe:recipe,
            name: controls.name.value,
            qty: controls.quantity.value,
            unit: controls.unit.value,
        };
        return this._api.post('admin/products/addingredients', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public ingredients(id:any) {
        let params = {
            id: id,
        };
        return this._api.post('admin/products/getingredients', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }


}