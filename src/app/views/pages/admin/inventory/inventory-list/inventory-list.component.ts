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
  pages: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private inventoryService: InventoryService, private modalService: NgbModal,
    private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
    private deviceService: DeviceDetectorService,private fb: FormBuilder) {

  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
