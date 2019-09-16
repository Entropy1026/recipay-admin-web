
import { ReportComponent } from './report.component';
import { ReportListComponent } from './report-list/report-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../../partials/partials.module';
import { CoreModule } from '../../../../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ReportService } from '../../../../services/report.service';

const routes: Routes = [
  {
    path: '', component: ReportComponent, children: [{
      path: 'list', component: ReportListComponent
    }
  ]
  }
];
@NgModule({
  declarations: [ReportComponent, ReportListComponent],
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
  providers: [ToastrService ,DeviceDetectorService , ReportService]
})
export class ReportModule { }
