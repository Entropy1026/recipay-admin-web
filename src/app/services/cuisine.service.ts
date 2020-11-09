import { Injectable } from '@angular/core';
import { ApiService } from '../domain/api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseModel } from '../model/base-model';

@Injectable()
export class CuisineService {

    constructor(private _api: ApiService) { }

    public fetchAll(): Observable<any> {
        return this._api.get('admin/cuisine/cuisineTypes')
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public addupdate(params:any) {
        return this._api.post('admin/cuisine/create', params)
            .pipe(catchError((err) => this._api.handleError(err)));
	}
    public delete(params:any) {

        return this._api.post('admin/cuisine/delete', params)
            .pipe(catchError((err) => this._api.handleError(err)));
	}
}
