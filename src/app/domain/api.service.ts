import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToastrService, Toast } from 'ngx-toastr';

//import {ApiConfig} from '../infrastructure/api.config';

import { environment } from '../../environments/environment';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class ApiService {

    private root: string;

    constructor(private http: HttpClient, private toastr: ToastrService) {
        this.root = `${environment.apiUrl}`;
    }

    get(endpoint: string): Observable<any> {
        return this.http.get(`${this.root}/${endpoint}`, this.headers);
    }

    post(endpoint: string, params: Object): Observable<any> {
        return this.http.post(`${this.root}/${endpoint}`, params, this.headers);
    }

    get headers() {
        // let btToken = localStorage.getItem('btToken');

        return {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Access-Control-Allow-Origin' : "*"
                // 'Authorization': `Bearer ${btToken}`
            })
        };
    }

    public handleError(error: any) {
        let errorMsg = '';
        // console.log(error);
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMsg = `An error occurred: ${error.error.message}`;
            console.log({ errorMsg });
            // this.toastr.error("An Error Occured Please Contact Your Administrator");


        } else if (error instanceof HttpErrorResponse) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMsg = `An error occurred: ${error.message}`;
            console.log({ errorMsg });
            this.toastr.error("Error: Something Went Wrong");
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            Object.getOwnPropertyNames(error).forEach((prop) => {
                errorMsg = `[${prop}]: ${error[prop]}`;
                console.log({ errorMsg });

            });

            if (error &&
                error.error &&
                error.error.status &&
                error.error.code &&
                error.error.message) {

                errorMsg = error.error.message;
                console.log({ errorMsg });
            }
        }
        // return an ErrorObservable with a user-facing error message
        if (errorMsg) {
            // return throwError(errorMsg);
            return "";
        } else {
            // return throwError('Error: Unexpected error encountered.');
            this.toastr.error("Error: Unexpected error encountered.");
            return "";
            
        }
    }
}
