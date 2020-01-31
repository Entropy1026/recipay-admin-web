import { Injectable } from '@angular/core';
import { ApiService } from '../domain/api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseModel } from '../model/base-model';

@Injectable()
export class MenuService {

    constructor(private _api: ApiService) { }

    public fetchAll(): Observable<BaseModel> {
        return this._api.get('admin/product/category/list')
            .pipe(catchError((err) => this._api.handleError(err)));
    }

    throwUp(value: boolean): Observable<boolean> {
        return throwError(new Error('COULD NOT UPDATE FAM!'));
    }
    public addupdate(id:any,controls:any) {
        let params = {
            id: id,
            name:controls.name.value ,
			desc:controls.description.value,
			image:controls.image.value ,
			type:controls.type.value
        };
        return this._api.post('admin/product/category/addCategory', params)
            .pipe(catchError((err) => this._api.handleError(err)));
	}
	public addupdateMenu(id:any,controls:any){
		let params = {
            id: id,
            name:controls.name.value ,
			image:controls.image.value ,
        };
        return this._api.post('admin/product/category/addMenu', params)
            .pipe(catchError((err) => this._api.handleError(err)));
	}
    public delete(id:any) {
        let params = {
            id: id,
        };
        return this._api.post('admin/product/category/deleteCategory', params)
            .pipe(catchError((err) => this._api.handleError(err)));
	}
	public deleteMenu(id: any) {
        let params = {
            id: id,
        };
        return this._api.post('admin/product/category/deleteMenu', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }

    public getAllMenu(): Observable<any> {
        return this._api.get('admin/product/category/menuList')
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
