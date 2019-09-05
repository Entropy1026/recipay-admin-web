// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
// Auth
import { AuthGuard } from '../../../core/auth';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'order',
				loadChildren: 'app/views/pages/admin/order/order.module#OrderModule'
			},
			{
				path: 'builder',
				loadChildren: 'app/views/themes/default/content/builder/builder.module#BuilderModule'
			},
			{
				path: 'menu',
				loadChildren: 'app/views/pages/admin/menu/menu.module#MenuModule'
			},
			{
				path: 'inventory',
				loadChildren: 'app/views/pages/admin/inventory/inventory.module#InventoryModule'
			},
			{
				path: 'review',
				loadChildren: 'app/views/pages/admin/review/review.module#ReviewModule'
			},
			{
				path: 'user',
				loadChildren: 'app/views/pages/admin/user/user.module#UserModule'
			},
			
			{
				path: 'advertisement',
				loadChildren: 'app/views/pages/admin/advertisement/advertisement.module#AdvertisementModule'
			},
			{
				path: 'report',
				loadChildren: 'app/views/pages/admin/report/report.module#ReportModule'
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					'type': 'error-v6',
					'code': 403,
					'title': '403... Access forbidden',
					'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'order/list', pathMatch: 'full'},
			{path: '**', redirectTo: 'order/list', pathMatch: 'full'}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
