import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatTableModule, 
  MatButtonModule, 
  MatIconModule, 
  MatToolbarModule, 
  MatPaginatorModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatCardModule, 
  MatMenuModule, 
  MatDividerModule, 
  MatOptionModule, 
  MatSelectModule, 
  MatRadioModule, 
  MatDatepickerModule, 
  MatTooltipModule, 
  MatCheckboxModule, 
  MatProgressSpinnerModule, 
  MatSlideToggleModule, 
  MatCellDef, 
  MatTabsModule, 
  MatListModule, 
  MatSortModule } 
  from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './confirm-dialog/confirm-dialog.service';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    HttpClientModule,
    NgbTabsetModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    PerfectScrollbarModule,
    MatTabsModule,
    MatListModule,
    MatSortModule
  ],
  providers: [ConfirmDialogService]
})
export class SharedModule { }
