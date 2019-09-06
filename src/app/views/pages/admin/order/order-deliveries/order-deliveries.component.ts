import { Component, OnInit , ViewChild, ChangeDetectorRef} from '@angular/core';
import { OrderService } from '../../../../../services/order.service';
import { BaseModel } from '../../../../../model/base-model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { from } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'kt-order-deliveries',
  templateUrl: './order-deliveries.component.html',
  styleUrls: ['./order-deliveries.component.scss']
})
export class OrderDeliveriesComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  displayedColumns: any = ['id','user','date', 'billingInfo', 'paymentType', 'amount','deliveryDatetime','carrier', 'status'];
  dataSource: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  pages:any;
  
  isMobile:boolean = this.deviceService.isMobile();
  constructor(private fb : FormBuilder , private detectRef:ChangeDetectorRef, private orderService: OrderService, private modalService: NgbModal, private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,private deviceService: DeviceDetectorService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  refresh(){
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
  
  fetchall(){
    this.blockUI.start('Loading'); // Start blocking
    this.orderService.fetchAll3().subscribe(
      order => {
        this.dataSource = new MatTableDataSource<BaseModel>(order.data);
        console.log(order.data);
        this.dataSource.paginator = this.paginator;
        this.toastr.info(order.message);
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
