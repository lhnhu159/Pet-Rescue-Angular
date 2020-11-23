import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from 'src/app/service/auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   
  
  constructor(private router:Router,public auth:AuthService) { }
  name='';
  ngOnInit(): void {
    $('.loader').show();
    if(this.auth.isLoggedIn()==true){
      this.auth.getUserApi().subscribe(
        res=>{
          console.log(res);
        },
        err=>{
          console.log(err);        
        }
      )
    }
    $(window).on("load",function(){
      setTimeout(function(){
        $('.loader').hide();
      },1000);
      
      $('loader').fadeOut("slow");
    })
  }

}
