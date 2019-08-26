import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    topic: string,
    btnYesText: string = 'Yes',
    btnNoText: string = 'No',
    dialogSize: 'sm' | 'lg' = 'sm'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmDialogComponent, { size: dialogSize })
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.topic = topic;
    modalRef.componentInstance.btnYesText = btnYesText;
    modalRef.componentInstance.btnNoText = btnNoText;

    return modalRef.result;
  }

}
