import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';
import * as $ from'jquery';
@Component({
  selector: 'app-dongvat-details',
  templateUrl: './dongvat-details.component.html',
  styleUrls: ['./dongvat-details.component.scss']
})
export class DongvatDetailsComponent implements OnInit {
  constructor(private dongvat:DongvatService,private router:Router,private actRoute:ActivatedRoute) { }
  public SlideOptions = { items: 3, dots: false,loop:false, nav: true ,autoplay: false,autoplayHoverPause: true,animateOut: 'fadeOut',
  navText: ["<div class='nav-btn prev-slide'><i class='fas fa-chevron-left'></i></div>", "<div class='nav-btn next-slide'><i class='fas fa-chevron-right'></i></div>"]
};
public SlideMore = { items: 4, dots: false,loop:false, nav: true ,autoplay: false,autoplayHoverPause: true,animateOut: 'fadeOut',
  navText: ["<div class='nav-btn prev-slide'><i class='fas fa-chevron-left'></i></div>", "<div class='nav-btn next-slide'><i class='fas fa-chevron-right'></i></div>"]
};
  id_dongvat:any;
  dv:any=[];
  public mausac=[];
  public loai=[];
  public giong=[];
  public suckhoe=[];
  public thongtin=[];
  public hinhanh=[];
  public imgSrc:any;
  public dvMore:any=[];
  
  ngOnInit(): void {
    //--------------------------GET ID DONG VAT-----------------------//
    this.actRoute.params.subscribe(
      params=>{
        this.id_dongvat=params.id;
      }
    );
    //-------------------------------GET DONG VAT BY ID-----------------------//
    this.dongvat.dongvatbyId(this.id_dongvat).subscribe(
      res=>{
        this.dv=res;
        this.thongtin=this.dv.dv_thongtinthem.split(',');
        this.imgSrc=this.dv.dv_hinhanh;
      },
      err=>{
        console.log(err);
      }
    );
    //--------------------GET MAU SAC---------------------//
    this.dongvat.getlistMausac().subscribe(
      res=>{
        this.mausac=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    );
    //------------------------GET GIONG-------------------//
    this.dongvat.getlistGiong().subscribe(
      res=>{
        this.loai=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    );
    //---------------------------GET LOAI------------------//
    this.dongvat.getlistLoai().subscribe(
      res=>{
        this.giong=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    );
    //-----------------------------GET SUC KHOE--------------------//
    this.dongvat.getlistSuckhoe().subscribe(
      res=>{
        this.suckhoe=Array.from(Object.keys(res),i=>res[i]);
        console.log(this.suckhoe);
      },
      err=>{
        console.log(err);
      }
    );
    //-----------------------------GET HINH ANH-------------------------//
    this.dongvat.getHinhanh(this.id_dongvat).subscribe(
      res=>{
        this.hinhanh=Array.from(Object.keys(res),i=>res[i]);
        console.log(this.hinhanh);
      },
      err=>{
        console.log(err);
      }
    );
    //-------------------GET MORE DONG VAT--------------------//
    var formData=new FormData();
    formData.append('giong_id',this.dv.giong_id);
    this.dongvat.findDongvat(formData).subscribe(
      res=>{
        this.dvMore=Array.from(Object.keys(res),i=>res[i]);
        this.dvMore=this.dvMore.filter(item=>item._id!==this.id_dongvat&&item.dv_isactive==true);
      },
      err=>{
        console.log(err);
      }
    );
    //-----------------------JQUERY---------------------//
    console.log($('#topbar').innerHeight());
    console.log($('#topbar').offset().top);
    $('.details').css('padding-top',$('#topbar').innerHeight()+'px');
  }
  //-------------------VIEW IMAGE-----------------------//
  viewImg(url){
    this.imgSrc=url;
    $('.img-data').each(function(){
      if($(this).attr('src')==url){
        $(this).css('opacity','0.5');
        $(this).css('transform','scale(0.8)');
      }
      else{
        $(this).css('opacity','1');
        $(this).css('transform','scale(1)');
      }
    })
  }
  //--------------------------VIEW ITEM DETAILS---------------------------//
  viewItemDetail(id){
    window.location.replace('/dongvat-details/'+id);
  }

}
