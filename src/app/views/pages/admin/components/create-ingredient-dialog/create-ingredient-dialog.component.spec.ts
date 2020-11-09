import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIngredientDialogComponent } from './create-ingredient-dialog.component';

describe('CreateIngredientDialogComponent', () => {
  let component: CreateIngredientDialogComponent;
  let fixture: ComponentFixture<CreateIngredientDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIngredientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIngredientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
