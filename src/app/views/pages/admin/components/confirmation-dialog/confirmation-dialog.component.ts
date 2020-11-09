import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CuisineListComponent } from '../../menu/cuisine-list/cuisine-list.component';

@Component({
  selector: 'kt-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CuisineListComponent>) { }

  ngOnInit() {
  }
  confirm(){
  this.dialogRef.close({confirm:true});
  }
  close(){
  this.dialogRef.close({confirm:false});
  }
} 
