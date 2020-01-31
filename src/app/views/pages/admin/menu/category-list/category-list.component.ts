import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../../../../services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BaseModel } from 'src/app/core/_base/crud';

@Component({
	selector: 'kt-category-list',
	templateUrl: './category-list.component.html',
	styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
	message: string;
	isOpen: boolean = false;
	id: any = null;
	dataSource: MatTableDataSource<BaseModel>;
	displayedColumns: any = ['id', 'name', 'action'];

	image: any;
	ref: AngularFireStorageReference;
	task: AngularFireUploadTask;
	menuGroup: FormGroup;
	imagePath: any;
	imgURL: any;
	imageurl: any;
	pages = 5;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	constructor(private menuService: MenuService, private modalService: NgbModal, private ngxService: NgxUiLoaderService,
		private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
		private deviceService: DeviceDetectorService, private fb: FormBuilder, private afStorage: AngularFireStorage) { }

	ngOnInit() {
		this.menuGroup = this.fb.group({
			id: [null],
			name: [null, Validators.required],
			image: [null, Validators.required],
		});
		this.fetchAll();
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
	submit() {
		const controls = this.menuGroup.controls;

		// check form
		if (this.menuGroup.invalid) {
			Object.keys(controls).forEach(controlName => {
				controls[controlName].markAsTouched();
			}
			);
			return;
		}
		this.ngxService.startLoader('menu-fetch');
		this.menuService.addupdateMenu(this.id, controls).subscribe(
			res => {
				this.toastr.info(res.message);
				this.fetchAll();
			},
			err => {
				this.ngxService.stopLoader('menu-fetch');
			},
			() => {
				this.ngxService.stopLoader('menu-fetch');
				this.close();
			}

		);

	}
	add() {
		this.id = null;
		this.isOpen = true;
	}
	close() {
		this.imgURL = null;
		this.menuGroup.controls.name.setValue('');
		this.menuGroup.controls.id.setValue(null);
		this.isOpen = false;
	}
	edit(id: any, data){
	 this.isOpen = true;
	 this.id = id;
	 this.imgURL = data.image;
	 this.menuGroup.controls.name.setValue(data.name);
	 this.menuGroup.controls.image.setValue(data.image);
	}
	delete(id: any) {
		this.ngxService.startLoader('menu-fetch-2');
		this.menuService.deleteMenu(id).subscribe(
			res => {
				this.toastr.info(res.message);
				this.fetchAll();
			},
			err => {
				this.ngxService.stopLoader('menu-fetch-2');
			},
			() => {
				this.ngxService.stopLoader('menu-fetch-2');
			}

		);
	}

	fetchAll() {
		this.ngxService.startLoader('menu-fetch-2');
		this.menuService.getAllMenu().subscribe(
			res => {
				this.toastr.info(res.message);
				this.dataSource = new MatTableDataSource<BaseModel>(res.data);
				// console.log(dispute.data);
				this.dataSource.paginator = this.paginator;
			},
			err => {
				this.ngxService.stopLoader('menu-fetch-2');
			},
			() => {
				this.ngxService.stopLoader('menu-fetch-2');
			}

		);
	}
	upload(files) {
		if (files.length === 0)
			return;

		var mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			this.message = "Only images are supported.";
			return;
		}

		var reader = new FileReader();
		this.imagePath = files;
		reader.readAsDataURL(files[0]);
		reader.onload = (_event) => {
			this.imgURL = reader.result;
		}
		const id = Math.random().toString(36).substring(2);
		this.ref = this.afStorage.ref(id);
		this.task = this.ref.put(files[0]);
		this.imageurl = "https://firebasestorage.googleapis.com/v0/b/recipaymobile.appspot.com/o/" + id + "?alt=media";
		this.menuGroup.controls.image.setValue(this.imageurl);
	}
}
