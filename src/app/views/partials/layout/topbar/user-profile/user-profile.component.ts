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
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ChangeDetailsComponent } from './change-details/change-details.component';

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
	id:any;
	password:any;
	username:any;
	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private store: Store<AppState>,private userLogService: UserLogService , private dialog:MatDialog)  {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.user$ = this.store.pipe(select(currentUser));
		this.id = localStorage.getItem("id");
		this.firstname  = localStorage.getItem("firstname");
		this.lastname  = localStorage.getItem("lastname");
		this.middlename  = localStorage.getItem("middlename");
		this.email  = localStorage.getItem("email");
		this.image  = localStorage.getItem("image");
		this.mobile  = localStorage.getItem("mobile");
		this.password  = localStorage.getItem("password");
		this.username  = localStorage.getItem("username");
		this.user_type  = localStorage.getItem("usertype");
		console.log(this.firstname);
	}

	/**
	 * Log out
	 */
	editProfile(action: any) {
	let dialogConfig = new MatDialogConfig();
	dialogConfig.width = '400px';
	dialogConfig.disableClose = true;
	dialogConfig.data = [{data: {name: this.firstname ,lastname: this.lastname , middlename: this.middlename , image: this.image ,
		                  mobile: this.mobile , email: this.email ,password: this.password , id: this.id , username:this.username},action: action}];

	const dialogRef = this.dialog.open(ChangeDetailsComponent,dialogConfig);
	dialogRef.afterClosed().subscribe(res => {
		this.firstname  = localStorage.getItem("firstname");
		this.lastname  = localStorage.getItem("lastname");
		this.middlename  = localStorage.getItem("middlename");
		// this.email  = localStorage.getItem("email");
		// this.image  = localStorage.getItem("image");
		this.mobile  = localStorage.getItem("mobile");
		// this.password  = localStorage.getItem("password");
		this.username  = localStorage.getItem("username");
		// this.user_type  = localStorage.getItem("usertype");

	});


	}
	logout() {
		this.store.dispatch(new Logout());
	}
}
