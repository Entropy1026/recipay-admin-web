import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {

        let tkn = localStorage.getItem('btToken');
        if (tkn && tkn !== "undefined") {
            return true;
        } else {
            localStorage.removeItem('btToken');
            let url = `${environment.loginUrl}?rd=${environment.baseUrl}`;
            window.open(url, "_self");
        }

    }
}