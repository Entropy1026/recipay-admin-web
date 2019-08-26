import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';

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
    RouterModule.forChild(routes)
  ]
})
export class InventoryModule { }
