import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(window).on('scroll',function(){
      var scrollDistance=$(window).scrollTop();
      var topbar=$('#topbar');
      if(scrollDistance>=50){
        topbar.addClass('sticky');
        $('.account').addClass('show-user');
      }
      else{
        topbar.removeClass('sticky');
        $('.account').removeClass('show-user');
      }
    })
  }

}
