import { Component, OnInit , ViewChild} from '@angular/core';
import { OrderService } from '../../../../../services/order.service';
import { BaseModel } from '../../../../../model/base-model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
// import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'kt-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  displayedColumns: any = ['id','user','date', 'billingInfo', 'paymentType', 'amount','deliveryDatetime', 'status', 'action'];
  dataSource: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  pages:any;
  isMobile:boolean = this.deviceService.isMobile();
  constructor(private orderService: OrderService,private ngxService: NgxUiLoaderService, private modalService: NgbModal, private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,private deviceService: DeviceDetectorService) {
  }

  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  
  refresh(){
  this.ngxService.startLoader('order');
   this.fetchall();
  }
  ngOnInit() {
    this.fetchall();
    if(this.isMobile){
      this.pages=5;
    }
    else{
      this.pages=10;
    }
  }
  update(id:any){
    this.ngxService.startLoader('order'); // Start blocking
    this.orderService.updatetoprepair(id).subscribe(
      order => {
        this.toastr.info(order.message);
      },
      err => {

      },
      () => {
        this.fetchall();
      }
    );
 }

 cancel(id:any){
  this.ngxService.startLoader('order'); 
  this.orderService.cancelorder(id).subscribe(
    order => {
      this.toastr.info(order.message);
    },
    err => {
    },
    () => {
     this.fetchall();
    }
  );
}
  fetchall(){
     // Start blocking
    this.orderService.fetchAll().subscribe(
      order => {
        this.dataSource = new MatTableDataSource<BaseModel>(order.data);
        console.log(order.data);
        this.dataSource.paginator = this.paginator;
        this.toastr.info(order.message);
      },
      err => {
        this.ngxService.stopLoader('order');
      },
      () => {
        this.ngxService.stopLoader('order');
      }
    );
  }


}
