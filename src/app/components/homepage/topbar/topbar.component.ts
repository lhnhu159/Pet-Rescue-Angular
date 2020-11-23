import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(public auth:AuthService,private router:Router) { }
  public name='';
  ngOnInit(): void {
     //DATA
     if(localStorage.getItem('name')){
      this.name=localStorage.getItem('name');
    }
    if(this.auth.isLoggedIn()){
      $('.logout').css('display','block');
      
    }
    else{
      $('.logout').css('display','none');
    }
  }
  //---------------------------LOGOUT-----------------------//
  logout(){
    this.auth.logout();
    window.location.reload();
  }
  //-----------------------------------CLICK ACCOUT---------------------------//
  clickAccount(){
    if(this.auth.isLoggedIn()){
      this.router.navigate(['admin']);
    }
    else{
      this.router.navigate(['login']);
    }
  }

}
