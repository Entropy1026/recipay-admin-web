import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenulistComponent } from './menulist/menulist.component';
import { ToastrService } from 'ngx-toastr';
import { CoreModule } from '../../../../core/core.module';
import { PartialsModule } from '../../../partials/partials.module'
import { SharedModule } from '../../shared/shared.module';
import { MenuActionComponent } from './menulist/menu-action/menu-action.component'
import { MenuService } from '../../../../services/menu.service';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '', component: MenuComponent, children: [{
      path: 'list', component: MenulistComponent,
    }],  
  },
  {
    path: '', component: MenuActionComponent, children: [{
      path: 'list/action', component: MenuActionComponent,
    }]
  }
];
@NgModule({
  declarations: [MenuComponent, MenulistComponent, MenuActionComponent] ,
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
  providers:[ToastrService,MenuService,ConfirmDialogService,DeviceDetectorService]
})
export class MenuModule { }
