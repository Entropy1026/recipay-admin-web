import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCuisineDialogComponent } from './create-cuisine-dialog.component';

describe('CreateCuisineDialogComponent', () => {
  let component: CreateCuisineDialogComponent;
  let fixture: ComponentFixture<CreateCuisineDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCuisineDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCuisineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
