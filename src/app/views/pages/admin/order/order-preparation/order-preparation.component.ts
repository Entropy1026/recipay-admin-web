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
  selector: 'kt-order-preparation',
  templateUrl: './order-preparation.component.html',
  styleUrls: ['./order-preparation.component.scss']
})
export class OrderPreparationComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  displayedColumns: any = ['id','user','date', 'billingInfo', 'paymentType', 'amount','deliveryDatetime', 'status', 'action'];
  dataSource: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  dataItem = [];
  deliveryGroup : FormGroup;
  assignCarrier = false;
  pages:any;
  id = 0;
  items = "";
  carrier = [];
  isMobile:boolean = this.deviceService.isMobile();
  constructor(private fb : FormBuilder , private detectRef:ChangeDetectorRef, private orderService: OrderService, private modalService: NgbModal, private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,private deviceService: DeviceDetectorService) {
  }

  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  
  refresh(){
   this.fetchall();
  }
  getCarrier(){
    this.carrier = [];
    this.blockUI.start('Loading'); // Start blocking
    this.orderService.getcarriers().subscribe(carriers => {
        carriers.data.map((carrier) => {
          let data = { value: carrier.id, viewValue: carrier.name }
          console.log
          this.carrier.push(data);
        });
      },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.blockUI.stop();
      }
    );
  }
  ngOnInit() {
    this.deliveryGroup = this.fb.group({
      carrier_name: ['', Validators.compose([
				Validators.required
			])
			]
    });
    this.fetchall();
    if(this.isMobile){
      this.pages=5;
    }
    else{
      this.pages=10;
    }
  }
  open(data:any){
    window.location.hash = '#topElement';
    this.assignCarrier=true;
    this.id = data.id;
    this.items = "";
    // data1 = data;
    // this.dataItem = data.item;
    data.items.forEach(element => {
      this.items =this.items.concat(element.qty + " PAX " + element.name+" PHP: " +element.price +"\n");
    });
    console.log(this.dataItem);  
    this.detectRef.detectChanges();
  }
  close(){
    this.assignCarrier=false;
  }
  update(id:any){
    this.blockUI.start('Loading'); // Start blocking
    this.orderService.updatetoprepair(id).subscribe(
      order => {
        this.toastr.info(order.message);
      },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.orderService.fetchAll2().subscribe(
          order => {
            this.dataSource = new MatTableDataSource<BaseModel>(order.data);
            // console.log(dispute.data);
            this.dataSource.paginator = this.paginator;
            // this.toastr.info(dispute.message);
          },
          err => {
            this.blockUI.stop();
          },
          () => {
            this.blockUI.stop();
          }
        );
      }
    );
 }
  fetchall(){
    this.blockUI.start('Loading'); // Start blocking
    this.orderService.fetchAll2().subscribe(
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
        this.getCarrier();
      }
    );
  }
  assign(){

    const controls = this.deliveryGroup.controls;
    this.toastr.info(""+this.id+controls.carrier_name.value);
    // check form
    if (this.deliveryGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.blockUI.start('Loading'); // Start blocking
    this.orderService.setcarriers(this.id,controls.carrier_name.value).subscribe((response) => {
    this.toastr.info(response.message);
    },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.orderService.fetchAll2().subscribe(
          ads => {
            this.dataSource = new MatTableDataSource<BaseModel>(ads.data);
            console.log(ads.data);
            this.dataSource.paginator = this.paginator;
  
          },
          err => {
            this.blockUI.stop();
          },
          () => {
            // this.blockUI.stop();
          }
        );
        this.blockUI.stop();
        this.id = 0;
      }
    );
  }

}
