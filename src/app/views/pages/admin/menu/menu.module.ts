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
    PartialsModule,
		CoreModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers:[ToastrService]
})
export class MenuModule { }
