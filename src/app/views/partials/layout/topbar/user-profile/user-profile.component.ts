// Angular
import { Component, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../../core/auth';
import { UserLogService} from '../../../../../domain/user.service'

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
	providers:[UserLogService]
})
export class UserProfileComponent implements OnInit {
	// Public properties
	user$: Observable<User>;
	firstname:any;
	lastname:any;
	middlename:any;
	user_type:any;
	mobile:any;
	email:any;
	image:any;
	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private store: Store<AppState>,private userLogService:UserLogService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.user$ = this.store.pipe(select(currentUser));
		this.firstname  = localStorage.getItem("firstname");
		this.lastname  = localStorage.getItem("lastname");
		this.middlename  = localStorage.getItem("middlename");
		this.email  = localStorage.getItem("email");
		this.image  = localStorage.getItem("image");
		this.mobile  = localStorage.getItem("mobile");
		this.user_type  = localStorage.getItem("usertype");
		console.log(this.firstname);
	}

	/**
	 * Log out
	 */
	logout() {
		this.store.dispatch(new Logout());
	}
}
