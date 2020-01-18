import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { Routes, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../../partials/partials.module';
import { CoreModule } from '../../../../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [{
      path: 'list', component: UserListComponent
    }]
  }
];
@NgModule({
  declarations: [UserComponent, UserListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PartialsModule,
    CoreModule,
    NgbModule,
    RouterModule.forChild(routes) , 
    NgxUiLoaderModule
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [UserService,ToastrService,DeviceDetectorService,ConfirmDialogService]
})
export class UserModule { }
