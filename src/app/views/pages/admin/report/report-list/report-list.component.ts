import { Component, OnInit, ViewChild } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BaseModel } from '../../../../../model/base-model';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../../../services/report.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'kt-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  displayedColumns: any = ['id', 'name', 'price', 'requested', 'delivered', 'action'];
  dataSource: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  addMenu = false;
  openinfo=false;
  menuGroup: FormGroup;
  amount = 0;
  dataItem = [];
  method="";
  billing="";
  items="";
  carrier="";
  delivered="";
  sales_count=0.00;
  total_sales = 0.00 ;
  monthly_sales= 0.00;
  id = null;
  pages: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private reportService: ReportService, private modalService: NgbModal,
    private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
    private deviceService: DeviceDetectorService, private fb: FormBuilder) {

  }
  // addClick(){
  //   this.router.navigateByUrl('default/menu/list/action');
  // }    
  ngOnInit() {
    this.fetchdata();
  }
  showdata(data:any){
    window.location.hash = '#topElement';
    this.openinfo=true;
    this.id = data.id;
    this.items = "";
    this.amount = 0;
    this.method="";
    this.billing="";
    this.carrier='';
    this.delivered="";
    // data1 = data;
    // this.dataItem = data.item;
    data.items.forEach(element => {
      this.items =this.items.concat(element.qty + " PAX " + element.name+" PHP: " +element.price +"\n");
    });
    // this.delivered= data.delivered.date;
    this.carrier=data.carrier;
    this.method = data.payment.method;
    this.billing = data.billinginfo.Address + " " + data.billinginfo.City;
    // this.detectRef.detectChanges();
  }
  close(){
    this.openinfo=false;
  }
  
  fetchdata() {
    this.blockUI.start('Loading'); // Start blocking
    const d = new Date();
    this.reportService.fetchAll().subscribe(
      menu => {
        menu.data.map((menus) => {
        const d1 = new Date(menus.date.date);
        this.total_sales +=menus.payment.amount;
        if(d1.getMonth() == d.getMonth() && d1.getFullYear() == d.getFullYear()){
        this.monthly_sales +=menus.payment.amount;
        }

        });
        this.sales_count = menu.data.length;
        this.dataSource = new MatTableDataSource<BaseModel>(menu.data);
        console.log(menu.data);
        this.dataSource.paginator = this.paginator;
        this.toastr.info(menu.message);
        
      },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.blockUI.stop();
      }
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
