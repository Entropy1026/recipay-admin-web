// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Partials
import { PartialsModule } from '../partials/partials.module';
import { CoreModule } from '../../core/core.module';
import { ConfirmationDialogComponent } from './admin/components/confirmation-dialog/confirmation-dialog.component';
import { CreateMenuDialogComponent } from './admin/components/create-menu-dialog/create-menu-dialog.component';
import { CreateCategoryDialogComponent } from './admin/components/create-category-dialog/create-category-dialog.component';
import { CreateIngredientDialogComponent } from './admin/components/create-ingredient-dialog/create-ingredient-dialog.component';
@NgModule({
	declarations: [],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		NgbModule,
		CoreModule,
		PartialsModule,
	],
	providers: []
})
export class PagesModule {
}
