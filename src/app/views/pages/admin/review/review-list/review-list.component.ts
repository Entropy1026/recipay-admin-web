import { Component, OnInit, ViewChild } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BaseModel } from '../../../../../model/base-model';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReviewService } from '../../../../../services/review.service';

@Component({
  selector: 'kt-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  displayedColumns: any = ['id','user','product','rating','comment','date','action'];
  dataSource: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  pages: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private reviewService: ReviewService, private modalService: NgbModal,
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
    this.reviewService.fetchAll().subscribe(
      reviews => {
        this.dataSource = new MatTableDataSource<BaseModel>(reviews.data);
        console.log(reviews.data);
        this.dataSource.paginator = this.paginator;
        this.toastr.info(reviews.message);
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
