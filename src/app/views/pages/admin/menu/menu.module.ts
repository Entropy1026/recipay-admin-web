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
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import { CategoryListComponent } from './category-list/category-list.component';

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
  },
  {
    path: 'menu', component: CategoryListComponent, children: [{
      path: 'menu/action', component: CategoryListComponent,
    }]
  }
];
@NgModule({
  declarations: [MenuComponent, MenulistComponent, MenuActionComponent, CategoryListComponent] ,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PartialsModule,
    CoreModule,
    NgbModule,
	RouterModule.forChild(routes),
	AngularFireModule.initializeApp({
		apiKey: "AIzaSyBPVjsxZ_7zFEKrl4B4yh79-7TvkzpByac",
		authDomain: "recipaymobile.firebaseapp.com",
		storageBucket: "recipaymobile.appspot.com",
		projectId: "recipaymobile",
	  }),
	  AngularFireStorageModule ,
	  NgxUiLoaderModule
  ],
  providers:[ToastrService,MenuService,ConfirmDialogService,DeviceDetectorService]
})
export class MenuModule { }
