import { Component, OnInit, ViewChild } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BaseModel } from '../../../../../model/base-model';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from '../../../../../services/inventory.service';
// import { isLoggedIn } from 'src/app/core/auth';
declare var $: any;
declare var jQuery: any;
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
@Component({
  selector: 'kt-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  
  @BlockUI() blockUI: NgBlockUI;
  displayedColumns: any = ['id','name','pax','price','sold','totalamount','type','action'];
  dataSource: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  addrecipe:boolean = false;
  pages: any;
  image= "";
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private inventoryService: InventoryService, private modalService: NgbModal,
    private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
    private deviceService: DeviceDetectorService,private fb: FormBuilder,
    private afStorage: AngularFireStorage) {

  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  upload(event) {
    // const id = Math.random().toString(36).substring(2);
    // this.ref = this.afStorage.ref(id);
    // this.task = this.ref.put(event.target.files[0]);
    var reader = new FileReader();

    reader.onload = function (e) {
        $('#product')
            .attr('src', event.target.result)
            .width(150)
            .height(200);
    };

    reader.readAsDataURL(event.target.files[0]);
  }
   openRecipe(){
   this.addrecipe = true;
  }
  ngOnInit() {
    this.fetchdata();
  }
  fetchdata() {
    this.blockUI.start('Loading'); // Start blocking
    this.inventoryService.fetchAll().subscribe(
      inv => {
        this.dataSource = new MatTableDataSource<BaseModel>(inv.data);
        console.log(inv.data);
        this.dataSource.paginator = this.paginator;
        this.toastr.info(inv.message);
      },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.blockUI.stop();
      }
    );
  }
}
