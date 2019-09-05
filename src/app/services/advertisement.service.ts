import { Injectable } from '@angular/core';
import { ApiService } from '../domain/api.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseModel } from '../model/base-model';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable()
export class AdvertisementService {

    constructor(private _api: ApiService) { }

    public fetchAll(): Observable<BaseModel> {
        return this._api.get('admin/ads/fetchAA')
            .pipe(catchError((err) => this._api.handleError(err)));
    }

    throwUp(value: boolean): Observable<boolean> {
        return throwError(new Error('COULD NOT UPDATE FAM!'));
    }
    public status(id:any,status:any) {
        let params = {
            id :id,
            status: status,
        };
        return this._api.post('admin/ads/updateAdstatus', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public delete(id:any) {
        let params = {
            id: id,
        };
        return this._api.post('admin/ads/deleteAds', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }
    public addAdvertisement(id,controls:any) {
        let params = {
            id:id,
            name: controls.name.value,
            desc: controls.description.value,
            fileurl: controls.fileurl.value
        };
        return this._api.post('admin/ads/createAds', params)
            .pipe(catchError((err) => this._api.handleError(err)));
    }

}