// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Login } from '../../../../core/auth';
import { HttpHeaders } from '@angular/common/http';
import { UserLogService } from '../../../../domain/user.service';
import { UserService } from '../../../../services/user.service';
import { environment } from '../../../../../environments/environment';



@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None,
	providers: [UserLogService, UserService]
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
	constructor(
		private userLogService: UserLogService,
		private userService: UserService,
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initLoginForm();
		localStorage.removeItem("firstname");
		localStorage.removeItem("lastname");
		localStorage.removeItem("middlename");
		localStorage.removeItem("usertype");
		localStorage.removeItem("email");
		localStorage.removeItem("mobile");
		localStorage.removeItem("image");

		localStorage.removeItem("id");
		localStorage.removeItem("password");
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	initLoginForm() {
		this.loginForm = this.fb.group({
			username: [null, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			],
			password: [null, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;
		const authData = {
			email: controls['username'].value,
			password: controls['password'].value
		};
		this.userService.login(authData.email, authData.password)
			.subscribe(
				res => {
					if (res.error === true) {
						this.authNoticeService.setNotice(res.message, 'danger');
					}
					else if (res.error === false) {
						console.log(res);
						this.userLogService.setUser(res.data);
						this.store.dispatch(new Login({ authToken: environment.authTokenKey }));
						localStorage.setItem("firstname", res.data.firstname);
						localStorage.setItem("lastname", res.data.lastname);
						localStorage.setItem("middlename", res.data.middlename);
						localStorage.setItem("usertype", res.data.user_type);
						localStorage.setItem("email", res.data.email);
						localStorage.setItem("mobile", res.data.mobile);
						localStorage.setItem("image", res.data.image);
						localStorage.setItem("id", res.data.id);
						localStorage.setItem("password", res.data.password);
						localStorage.setItem("username", res.data.username);
						this.router.navigateByUrl('/'); // Main page
					}
				},
				err => {
					this.authNoticeService.setNotice('Something Went Wrong', 'danger');
				},
				() => {
					this.loading = false;
					this.cdr.detectChanges();
				}
			);
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
