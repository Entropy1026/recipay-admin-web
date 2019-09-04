import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from './review-list/review-list.component';
import { Routes, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from '../../../../services/review.service';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../../../../core/core.module';
import { PartialsModule } from '../../../partials/partials.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ReviewComponent } from './review.component';
import { DisputeListComponent } from './dispute-list/dispute-list.component';
import { DisputeService } from '../../../../services/dispute.service';
const routes: Routes = [
  {
    path: '', component: ReviewListComponent, children: [{
      path: 'list', component: ReviewListComponent,
    }],
      
  },{
    path: '', component: DisputeListComponent, children: [{
      path: 'dispute', component: DisputeListComponent,
    }],
      
  }
];
@NgModule({
  declarations: [ReviewListComponent, ReviewComponent, DisputeListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PartialsModule,
    CoreModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  providers:[ToastrService,ReviewService,DisputeService,ConfirmDialogService,DeviceDetectorService]
})
export class ReviewModule { }
