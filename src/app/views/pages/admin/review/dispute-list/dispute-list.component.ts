import { Component, OnInit, ViewChild } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BaseModel } from '../../../../../model/base-model';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  DisputeService } from '../../../../../services/dispute.service';

@Component({
  selector: 'kt-dispute-list',
  templateUrl: './dispute-list.component.html',
  styleUrls: ['./dispute-list.component.scss']
})
export class DisputeListComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    displayedColumns: any = ['id','from','message','date','action'];
    dataSource: MatTableDataSource<BaseModel>;
    deviceInfo = null;
    pages: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(private disService: DisputeService, private modalService: NgbModal,
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
      this.disService.fetchAll().subscribe(
        dispute => {
          this.dataSource = new MatTableDataSource<BaseModel>(dispute.data);
          console.log(dispute.data);
          this.dataSource.paginator = this.paginator;
          this.toastr.info(dispute.message);
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
  



















