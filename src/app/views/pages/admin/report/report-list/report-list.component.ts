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
  displayedColumns: any = ['id', 'name', 'price', 'date', 'billing', 'payment', 'action'];
  dataSource: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  addMenu = false;
  menuGroup: FormGroup;
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
  fetchdata() {
    this.blockUI.start('Loading'); // Start blocking
    this.reportService.fetchAll().subscribe(
      menu => {
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
