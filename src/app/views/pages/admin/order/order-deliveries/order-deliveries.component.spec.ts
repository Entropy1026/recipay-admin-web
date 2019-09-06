import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeliveriesComponent } from './order-deliveries.component';

describe('OrderDeliveriesComponent', () => {
  let component: OrderDeliveriesComponent;
  let fixture: ComponentFixture<OrderDeliveriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDeliveriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
