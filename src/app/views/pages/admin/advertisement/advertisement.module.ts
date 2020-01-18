import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementComponent } from './advertisement.component';
import { AdvertisementListComponent } from './advertisement-list/advertisement-list.component';
import { Routes, RouterModule } from '@angular/router';
import { AdvertisementService } from '../../../../services/advertisement.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../../../../core/core.module';
import { PartialsModule } from '../../../partials/partials.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import {NgxUiLoaderModule} from 'ngx-ui-loader';

const routes: Routes = [
  {
      path: '', component: AdvertisementComponent, children: [{
      path: 'list', component: AdvertisementListComponent
    }]
  }
];
@NgModule({
  declarations: [AdvertisementComponent, AdvertisementListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PartialsModule,
    CoreModule,
    NgbModule,
    RouterModule.forChild(routes),
    NgxUiLoaderModule
  ],
  providers: [ AdvertisementService , ToastrService ,DeviceDetectorService]
})
export class AdvertisementModule { }
