import { Component, OnInit , ViewChild} from '@angular/core';
import { AdvertisementService } from '../../../../../services/advertisement.service';
import { BaseModel } from '../../../../../model/base-model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
// import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'kt-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.scss']
})
export class AdvertisementListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  displayedColumns: any = ['id','name','desc' , 'subbed',  'status', 'action'];
  dataSource: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  pages:any;
  isMobile:boolean = this.deviceService.isMobile();
  constructor(private adService: AdvertisementService, private modalService: NgbModal, private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,private deviceService: DeviceDetectorService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.blockUI.start('Loading'); // Start blocking
    this.adService.fetchAll().subscribe(
      ads => {
        this.dataSource = new MatTableDataSource<BaseModel>(ads.data);
        console.log(ads.data);
        this.dataSource.paginator = this.paginator;
        this.toastr.info(ads.message);
      },
      err => {
        this.blockUI.stop();
      },
      () => {
        this.blockUI.stop();
      }
    );
    if(this.isMobile){
      this.pages=5;
    }
    else{
      this.pages=10;
    }
  }



}
