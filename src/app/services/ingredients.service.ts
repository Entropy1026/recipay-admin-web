import { Injectable } from '@angular/core';
import { ApiService } from '../domain/api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseModel } from '../model/base-model';

@Injectable()
export class IngredientsService {

    constructor(private _api: ApiService) { }

    public fetchAll(): Observable<any> {
        return this._api.get('admin/ingredients/item/items')
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public addupdate(params:any) {
        return this._api.post('admin/ingredients/create', params)
            .pipe(catchError((err) => this._api.handleError(err)));
	}
    public delete(params:any) {

        return this._api.post('admin/ingredients/delete', params)
            .pipe(catchError((err) => this._api.handleError(err)));
	}
}
