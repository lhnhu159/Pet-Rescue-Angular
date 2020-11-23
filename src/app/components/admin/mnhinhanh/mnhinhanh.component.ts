import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';
import * as $ from "jquery";
@Component({
  selector: 'app-mnhinhanh',
  templateUrl: './mnhinhanh.component.html',
  styleUrls: ['./mnhinhanh.component.scss']
})
export class MnhinhanhComponent implements OnInit {

  constructor(private route:ActivatedRoute,private dongvat:DongvatService) { }
  id_dv:any;
  public dv:any=[];
  public hinhanh:any=[];
  public imgSrc:any;
  is_confirmMain=false;
  is_confirm=false;
  is_success_main=false;
  is_success_sub=false;
  is_success_delete=false;
  is_success=false;
  is_choose=false;
  selectMain:any;
  selectItem:any;
  idDelete:any;
  ngOnInit(): void {
    //--------------------------GET ID DONG VAT-----------------------//
    this.route.params.subscribe(
      params=>{
        this.id_dv=params.id;
        console.log(this.id_dv);
      }
    );
    //----------------------------GET DONG VAT DETAILS---------------------//
    this.dongvat.dongvatbyId(this.id_dv).subscribe(
      res=>{
        this.dv=res;
        this.imgSrc=this.dv.dv_hinhanh;
      },
      err=>{
        console.log(err);
      }
    );
    //-------------------------------GET LIST HINH ANH BY DON VAT------------------------//
    this.dongvat.getHinhanh(this.id_dv).subscribe(
      res=>{
        this.hinhanh=Array.from(Object.keys(res),i=>res[i]);
        console.log(this.hinhanh);
      },
      err=>{
        console.log(err);
      }
    )
  }
  //-----------------------------------CHANGE IMG------------------------//
  changeImg(event){
    var file =event.target.files[0];
    var reader=new FileReader();
    reader.onload=event=>this.imgSrc=reader.result;
    reader.readAsDataURL(file);
    this.is_confirmMain=true;
    this.selectMain=<File>event.target.files[0];
  }
  //-------------------------CONFIRM FILE---------------------------------//
  confirmFile(){
    var formData=new FormData();
    formData.append('dv_hinhanh',this.selectMain);
    this.dongvat.editDongvat(this.id_dv,formData).subscribe(
      res=>{
        this.is_success=true;
        this.is_success_main=true;
        $('#popup').addClass('show-popup');
        setTimeout(function(){
          $('#popup').css('opacity','1');
          $('.popup-success').css('margin-top','4rem');
        },10);
      },
      err=>{
        console.log(err);
      }
    )
  }
  //-----------------------CANCEL FILE-----------------------------------//
  cancelFile(){
    window.location.reload();
  }
  //--------------------------------POPUP---------------------------------//
  exitPopup(){
    $('#popup').css('opacity','0'); 
    $('.popup-content').css('margin-top','0');
    this.is_confirm=false;
    setTimeout(function(){
      $('#popup').removeClass('show-popup');    
    },1000);
    
  }
  okclick(){
    $('#popup').css('opacity','0'); 
    $('.popup-content').css('margin-top','0');
    setTimeout(function(){
      window.location.reload();     
    },500);
  }
  //-----------------------------------UPLOAD ITEM HINH ANH------------------------//
  uploadItem(e){
    this.selectItem=<File>e.target.files[0];
    var formData=new FormData();
    formData.append('url',this.selectItem);
    formData.append('dv_id',this.id_dv);
    this.dongvat.addHinhanh(formData).subscribe(
      res=>{
        this.is_success=true;
        this.is_success_sub=true;
        $('#popup').addClass('show-popup');
        setTimeout(function(){
          $('#popup').css('opacity','1');
          $('.popup-success').css('margin-top','4rem');
        },10);
      },
      err=>{
        console.log(err);
      }
    )
  }
  //-------------------------DELETE ITEM---------------------------//
  deleteItem(id){
    this.idDelete=id;
    var popup=$('#popup');
    this.is_confirm=true;
    popup.addClass('show-popup');
    setTimeout(function(){
      popup.css('opacity','1'); 
      $('.confirm').css('margin-top','4rem');     
    },10);
  }
  deleteHinhanh(){
    this.dongvat.deleteHinhanh(this.idDelete).subscribe(
      res=>{
        this.is_confirm=false;
        this.is_success=true;
        this.is_success_delete=true;
        setTimeout(function(){
          $('.popup-success').css('margin-top','4rem');
        },5);
      },
      err=>{
        console.log(err);
      }
    )
  }
  //--------------------------------VIEW ITEM----------------------------//
  viewItem(url){
    this.imgSrc=url;
    this.is_choose=true;
    $('.item-img').each(function(){
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
  //------------------------CHOOSE FILE-----------------------------//
  chooseFile(){
    var formData=new FormData();
    formData.append('dv_hinhanh',this.imgSrc);
    this.dongvat.editDongvat(this.id_dv,formData).subscribe(
      res=>{
        this.is_success=true;
        this.is_success_main=true;
        $('#popup').addClass('show-popup');
        setTimeout(function(){
          $('#popup').css('opacity','1');
          $('.popup-success').css('margin-top','4rem');
        },10);
      },
      err=>{
        console.log(err);
      }
    )
  }

}
