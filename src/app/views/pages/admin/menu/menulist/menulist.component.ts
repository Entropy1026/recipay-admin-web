import { Component, OnInit } from '@angular/core';
import {ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
@Component({
  selector: 'kt-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.scss']
})
export class MenulistComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  constructor(private toastr: ToastrService,private router: Router) { }
  
  
  // addClick(){
  //   this.router.navigateByUrl('default/menu/list/action');
  // }    
  ngOnInit() {
    this.toastr.success("test");
    this.blockUI.start('Loading...'); // Start blocking
 
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking
    }, 2000);
  }

}
