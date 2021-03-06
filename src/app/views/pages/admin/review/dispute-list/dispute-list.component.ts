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
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
    respond = false;
    id = 0;
    user ="";
    selected = 'all';
    disGroup: FormGroup;
    pages: any;
    @ViewChild(MatPaginator , {static:true}) paginator: MatPaginator;
    constructor(private disService: DisputeService, private modalService: NgbModal,
      private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
      private deviceService: DeviceDetectorService,private fb: FormBuilder , private ngxService:NgxUiLoaderService) {
  
    }
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    ngOnInit() {
      this.disGroup = this.fb.group({
        message: ['Thankyou for your dispute report we will review this report and come back to you asap.', Validators.compose([
          Validators.required
        ])
        ]
      });
      this.fetchdata();
    }
    changeselect(choice:any){
      if(choice=="all"){
        this.fetchdata();
      }
      else{
      this.fetchselected(choice);
      }
    }
    fetchdata() {
      this.ngxService.startLoader("dispute"); // Start blocking
      this.disService.fetchAll().subscribe(
        dispute => {
          this.dataSource = new MatTableDataSource<BaseModel>(dispute.data);
          console.log(dispute.data);
          this.dataSource.paginator = this.paginator;
          this.toastr.info(dispute.message);
        },
        err => {
          this.ngxService.stopLoader("dispute");
        },
        () => {
          this.ngxService.stopLoader("dispute");
        }
      );
    }
    fetchselected(choice:any) {
      this.ngxService.startLoader("dispute");// Start blocking
      this.disService.fetchselected(choice).subscribe(
        dispute => {
          this.dataSource = new MatTableDataSource<BaseModel>(dispute.data);
          console.log(dispute.data);
          this.dataSource.paginator = this.paginator;
          this.toastr.info(dispute.message);
        },
        err => {
          this.ngxService.stopLoader("dispute");
        },
        () => {
          this.ngxService.stopLoader("dispute");
        }
      );
    }
  reply(id:any , user:any){
  this.respond=true;
  this.id = id;
  this.user = user;
  // this.toastr.info(id);
  
  }
   delete(id:any){
      this.ngxService.startLoader("dispute");
      this.disService.delete(id).subscribe(
        dispute => {
          this.toastr.info(dispute.message);
        },
        err => {
          
        },
        () => {
          this.disService.fetchAll().subscribe(
            dispute => {
              this.dataSource = new MatTableDataSource<BaseModel>(dispute.data);
              // console.log(dispute.data);
              this.dataSource.paginator = this.paginator;
              // this.toastr.info(dispute.message);
            },
            err => {
              this.ngxService.stopLoader("dispute");
            },
            () => {
              this.ngxService.stopLoader("dispute");
            }
          );
        }
      );
   }
   submit(){
    const controls = this.disGroup.controls;

    // check form
    if (this.disGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.ngxService.startLoader("dispute-proc");
    this.disService.sendresponse(this.id,this.user,controls).subscribe((response) => {
    this.toastr.info(response.message);
    },
      err => {
      },
      () => {
        this.ngxService.stopLoader("dispute-proc");
        this.ngxService.startLoader("dispute");
        this.disService.fetchAll().subscribe(
          ads => {
            this.dataSource = new MatTableDataSource<BaseModel>(ads.data);
            console.log(ads.data);
            this.dataSource.paginator = this.paginator;
  
          },
          err => {
            this.ngxService.stopLoader("dispute");
          },
          () => {
            this.ngxService.stopLoader("dispute");
          }
        );
        this.id = null;
        this.user = null;
        this.respond = false;
      }
    );
   }
  }
  



















