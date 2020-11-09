import { Injectable } from '@angular/core';
import { ApiService } from '../domain/api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseModel } from '../model/base-model';

@Injectable()
export class MenuService {

    constructor(private _api: ApiService) { }

    public fetchAll(): Observable<any> {
        return this._api.get('admin/product/category/menulist')
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public addupdate(params) {

        return this._api.post('admin/product/category/createmenu', params)
            .pipe(catchError((err) => this._api.handleError(err)));
	}
    public delete(id:any) {
        let params = {
            id: id,
        };
        return this._api.post('admin/product/category/deletemenu', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public addupdateCategory(params){
        return this._api.post('admin/product/category/createcategory', params)
            .pipe(catchError((err) => this._api.handleError(err)));
	}
	public deleteCategory(id) {
        let params = {
            id: id,
        };
        return this._api.post('admin/product/category/deletecategory', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }

    public fetchALlCategory(): Observable<any> {
        return this._api.get('admin/product/category/categorylist')
        .pipe(catchError((err) => this._api.handleError(err)));
    }
}
