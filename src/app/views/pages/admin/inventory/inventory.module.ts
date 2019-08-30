import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { InventoryService } from '../../../../services/inventory.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../../../../core/core.module';
import { PartialsModule } from '../../../partials/partials.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '', component: InventoryComponent, children: [{
      path: 'list', component: InventoryListComponent
    }]
  }
];
@NgModule({
  declarations: [InventoryListComponent,InventoryComponent],
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
  providers:[ToastrService,InventoryService,ConfirmDialogService,DeviceDetectorService]
})
export class InventoryModule { }
