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
  adsGroup: FormGroup;
  displayedColumns: any = ['id','name','desc' , 'subbed',  'status', 'action'];
  dataSource: MatTableDataSource<BaseModel>;
  deviceInfo = null;
  advertisementID = null;
  pages:any;
  addAds = false;
  isMobile:boolean = this.deviceService.isMobile();
  constructor(private adService: AdvertisementService,private fb: FormBuilder, private modalService: NgbModal, private confirmDialogService: ConfirmDialogService, private toastr: ToastrService,private deviceService: DeviceDetectorService) {
  }

  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.adsGroup = this.fb.group({
      name: ['', Validators.compose([
				Validators.required
			])
			],
      description: ['', Validators.compose([
				Validators.required
			])
      ],
      fileurl: ['', Validators.compose([
        Validators.required
			])
      ]
    });
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
 open(){
  this.addAds = true;
 }
 close(){
   this.addAds = false;
 }
 submit() {
  const controls = this.adsGroup.controls;

  // check form
  if (this.adsGroup.invalid) {
    Object.keys(controls).forEach(controlName =>
      controls[controlName].markAsTouched()
    );
    return;
  }
  this.blockUI.start('Loading'); // Start blocking
  this.adService.addAdvertisement(this.advertisementID,controls).subscribe((response) => {
  this.toastr.info(response.message);
  },
    err => {
      this.blockUI.stop();
    },
    () => {
      this.adService.fetchAll().subscribe(
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
      this.advertisementID = null;
    }
  );
}
updateInfo(data:any){
   this.advertisementID = data.id;
   const controls = this.adsGroup.controls;
   this.addAds = true;
   controls['name'].setValue(data.name);
   controls['description'].setValue(data.description);
   controls['fileurl'].setValue(data.fileurl);
}
delete(id:any){
  this.blockUI.start('Loading'); // Start blocking
  this.adService.delete(id).subscribe((response) => {
  this.toastr.info(response.message);
  },
    err => {
      this.blockUI.stop();
    },
    () => {
      this.adService.fetchAll().subscribe(
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
    }
  );
}
status(id:any,status:any){
  this.blockUI.start('Loading'); // Start blocking
  this.adService.status(id,status).subscribe((response) => {
  this.toastr.info(response.message);
  },
    err => {
      this.blockUI.stop();
    },
    () => {
      this.adService.fetchAll().subscribe(
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
    }
  );
}
}
