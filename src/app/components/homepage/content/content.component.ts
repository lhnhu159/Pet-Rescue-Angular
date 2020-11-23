import { Component, OnInit } from '@angular/core';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  
  constructor(private dongvat:DongvatService,private router:Router,private auth:AuthService) { }
  public bengoan=[];
  public SlideOptions = { items: 3, dots: false,loop:false, nav: true ,autoplay: true,autoplayHoverPause: true,animateOut: 'fadeOut',
  navText: ["<div class='nav-btn prev-slide'><i class='fas fa-chevron-left'></i></div>", "<div class='nav-btn next-slide'><i class='fas fa-chevron-right'></i></div>"]
};
  event:any=[];
  news:any=[];
  ngOnInit(): void {
    
    //------------------------GET LIST BE NGOAN----------------//
    this.dongvat.getlistBengoan().subscribe(
      res=>{
        this.bengoan=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    );
    //--------------------------------------------GET LIST EVENT----------------------------//
    this.auth.getlistHoatdong().subscribe(
      res=>{
        this.event = Array.from(Object.keys(res), i => res[i]);
        this.event=this.event.sort((val1, val2)=>  new Date(val2.ngaybatdau).getDate() - new Date(val1.ngaybatdau).getDate()).slice(0,3);
      },
      err=>{
        console.log(err);
      }
    );
    //--------------------------------GET LIST NEWS--------------------------//
    this.dongvat.getlistTintuc().subscribe(
      res=>{
        this.news=Array.from(Object.keys(res),i=>res[i]);
        this.news=this.news.sort((val1, val2)=>  new Date(val2.ngaytao).getDate() - new Date(val1.ngaytao).getDate()).slice(0,3);
        console.log(this.news);
      }
    )
  }
  //---------------------------CLICK DETAILS--------------------------//
  clickDetails(id){
    this.router.navigate(['/dongvat-details',id]);
  }
  clickTintuc(id){
    window.location.replace('/tintuc-details/'+id);
  }
  eventDetails(id){
    window.location.replace('/event-details/'+id);
  }
}
