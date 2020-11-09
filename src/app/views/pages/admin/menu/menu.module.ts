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
import { CuisineListComponent } from './cuisine-list/cuisine-list.component';
import { CreateCuisineDialogComponent } from '../components/create-cuisine-dialog/create-cuisine-dialog.component';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { CreateMenuDialogComponent } from '../components/create-menu-dialog/create-menu-dialog.component';
import { CreateCategoryDialogComponent } from '../components/create-category-dialog/create-category-dialog.component';
import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { IngredientsService } from '../../../../services/ingredients.service';
import { CreateIngredientDialogComponent } from '../components/create-ingredient-dialog/create-ingredient-dialog.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent, children: [{
      path: 'cuisine', component: CuisineListComponent,
    }],
  },
  {
    path: 'menu', component: MenulistComponent, children: [{
      path: 'menu', component: MenulistComponent,
    }],
  },
  {
    path: '', component: MenuActionComponent, children: [{
      path: 'menu/action', component: MenuActionComponent,
    }]
  },
  {
    path: 'category', component: CategoryListComponent, children: [{
      path: 'category', component: CategoryListComponent,
    }]
  },
  {
    path: 'ingredients', component: IngredientsListComponent, children: [{
      path: 'ingredients', component: IngredientsListComponent,
    }]
  },
  {
    path: 'product', component: ProductListComponent, children: [{
      path: 'product', component: ProductListComponent,
    }]
  }
];
@NgModule({
  declarations: [
    MenuComponent, MenulistComponent, MenuActionComponent, CategoryListComponent,
    CuisineListComponent, CreateCuisineDialogComponent,ConfirmationDialogComponent ,
    CreateMenuDialogComponent,CreateCategoryDialogComponent, IngredientsListComponent , ProductListComponent,
    CreateIngredientDialogComponent 
  ] ,
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
  entryComponents:[
    CreateCuisineDialogComponent,
    ConfirmationDialogComponent,
    CreateMenuDialogComponent ,
    CreateCategoryDialogComponent , CreateIngredientDialogComponent
  ],
  providers:[ToastrService,MenuService,ConfirmDialogService,DeviceDetectorService,IngredientsService]
})
export class MenuModule { }
