import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementComponent } from './advertisement.component';
import { AdvertisementListComponent } from './advertisement-list/advertisement-list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '', component: AdvertisementComponent, children: [{
      path: 'list', component: AdvertisementListComponent
    }]
  }
];
@NgModule({
  declarations: [AdvertisementComponent, AdvertisementListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdvertisementModule { }
