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
  displayedColumns: any = ['id', 'user', 'product', 'rating', 'comment', 'date', 'action'];
  selected = 'all';
  dataSource: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  pages: any;
  respond = false;
  id = 0;
  user = "";
  comments = false;
  reviewGroup: FormGroup;
  review1Group: FormGroup;
  @ViewChild(MatPaginator , {static:true}) paginator: MatPaginator;
  constructor(private reviewService: ReviewService, private modalService: NgbModal,
    private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,
    private deviceService: DeviceDetectorService, private fb: FormBuilder) {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 changeselect(choice:any){
   if(choice=="all"){
     this.fetchdata();
   }
   else{
   this.fetchselected(choice);
   }
 }
  ngOnInit() {
    this.reviewGroup = this.fb.group({
      message: ['Thankyou for making reviews on your purchased.', Validators.compose([
        Validators.required
      ])
      ]
    });
    this.review1Group = this.fb.group({
      comment: ['this comment is modified because it contains bad words.', Validators.compose([
        Validators.required
      ])
      ]
    });
    // this.review1Group = this.fb.group({
    //   comment: ['this comment contains bad words -modified- .', Validators.compose([
    //     Validators.required
    //   ])
    //   ]
    // });
    this.fetchdata();
  }
  close() {
    this.comments = false;
    this.respond = false;
  }
  reply(id: any, user: any) {
    this.respond = true;
    this.id = id;
    this.user = user;
    this.comments = false;
  }
  edit(id: any) {
    this.toastr.info(id);
    this.comments = true;
    this.respond = false;
    this.id = id;

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
  fetchselected(choice:any) {
    this.blockUI.start('Loading'); // Start blocking
    this.reviewService.fetchselected(choice).subscribe(
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
  delete(id: any) {
    this.blockUI.start('Loading'); // Start blocking
    this.reviewService.delete(id).subscribe(
      review => {
        this.toastr.info(review.message);
      },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.reviewService.fetchAll().subscribe(
          review => {
            this.dataSource = new MatTableDataSource<BaseModel>(review.data);
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
  update() {
    const controls = this.review1Group.controls;

    // check form
    if (this.review1Group.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.blockUI.start('Loading'); // Start blocking
    this.reviewService.updateComment(this.id, controls).subscribe((response) => {
      
    },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.reviewService.fetchAll().subscribe(
          rev => {
            this.dataSource = new MatTableDataSource<BaseModel>(rev.data);
            console.log(rev.data);
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
        this.id = null;
        this.comments = false;
      }
    );
  }
  submit() {
    const controls = this.reviewGroup.controls;

    // check form
    if (this.reviewGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.blockUI.start('Loading'); // Start blocking
    this.reviewService.sendresponse(this.id, this.user, controls).subscribe((response) => {
      this.toastr.info(response.message);
    },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.reviewService.fetchAll().subscribe(
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
        this.id = null;
        this.user = null;
        this.respond = false;
      }
    );
  }
}
