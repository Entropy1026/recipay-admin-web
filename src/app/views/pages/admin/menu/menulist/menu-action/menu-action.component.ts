import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'kt-menu-action',
  templateUrl: './menu-action.component.html',
  styleUrls: ['./menu-action.component.scss']
})
export class MenuActionComponent implements OnInit {
  localUrl: any[];
  constructor() { }

    showPreviewImage(event: any) {
     
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.localUrl = event.target.result;
           }
            reader.readAsDataURL(event.target.files[0]);
        }
      }

  ngOnInit() {
  }

}
