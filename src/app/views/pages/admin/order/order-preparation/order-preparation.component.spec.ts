import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPreparationComponent } from './order-preparation.component';

describe('OrderPreparationComponent', () => {
  let component: OrderPreparationComponent;
  let fixture: ComponentFixture<OrderPreparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPreparationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
