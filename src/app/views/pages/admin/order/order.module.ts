import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { Routes, RouterModule } from '@angular/router';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { OrderService } from '../../../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../../partials/partials.module';
import { CoreModule } from '../../../../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { OrderPreparationComponent } from './order-preparation/order-preparation.component';
import { OrderDeliveriesComponent } from './order-deliveries/order-deliveries.component';

const routes: Routes = [
  {
    path: '', component: OrderComponent, children: [{
      path: 'list', component: OrderlistComponent
    }
  ]
  }
  ,{
    path: 'preparation', component: OrderPreparationComponent, children: [{
      path: 'preparation', component: OrderPreparationComponent,
    }],
      
  }
  ,{
    path: 'on-deliveries', component: OrderDeliveriesComponent, children: [{
      path: 'on-deliveries', component: OrderDeliveriesComponent,
    }],
      
  }
];
@NgModule({
  declarations: [OrderComponent, OrderlistComponent, OrderPreparationComponent, OrderDeliveriesComponent],
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
  providers: [ OrderService , ToastrService ,DeviceDetectorService]
})
export class OrderModule { }
