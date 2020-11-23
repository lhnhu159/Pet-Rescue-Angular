import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import * as $ from 'jquery';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';

@Component({
  selector: 'app-nhannuoi',
  templateUrl: './nhannuoi.component.html',
  styleUrls: ['./nhannuoi.component.scss']
})
export class NhannuoiComponent implements OnInit {

  constructor(private dongvat:DongvatService,private fb:FormBuilder) { }
  public dv:any=[];
  public mausac:any=[];
  public loai:any=[];
  searchForm:FormGroup;
  view:any=[];
  is_giong='';
  not_item=false;
  ngOnInit(): void {
    $('.nhannuoi').css('padding-top',$('#topbar').innerHeight()+'px');
    //----------------GET LIST DONG VAT----------------------//
    this.dongvat.getlistDongvat().subscribe(
      res=>{
        this.dv=Array.from(Object.keys(res),i=>res[i]);
        this.view=this.dv.filter(item=>item.dv_isactive==true);
      },
      err=>{
        console.log(err);
      }
    )
    //------------------------GET LIST MAU---------------------//
    this.dongvat.getlistMausac().subscribe(
      res=>{
        this.mausac=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    );
    //--------------------------GET LIST LOAI-----------------------//
    this.dongvat.getlistGiong().subscribe(
      res=>{
        this.loai=Array.from(Object.keys(res),i=>res[i]);
      }
    );
    //-----------------------REGIS FORM-----------------------------//
    this.searchForm = this.fb.group({
      ten:'',
      gioitinh:'',
      mau:''
    });
  }
  //----------------CLICK DETAILS----------------------//
  clickDetails(id){
    window.location.replace('dongvat-details/'+id);
  }
  //------------------CLICK NHAN NUOI------------------//
  clickNhannuoi(id){
    window.location.replace('/dangky-nhannuoi/'+id);
  }
  //--------------------------FIND LOAI------------------------//
  async findLoai(id){
    
    this.view=this.dv.filter(item=>item.giong_id==id);
    this.is_giong=id;
    if(this.searchForm.value.ten!=''){
      this.view=this.view.filter(item=>item.dv_ten.toUpperCase().slice(0,this.searchForm.value.ten.length)===this.searchForm.value.ten.toUpperCase());

    }
    if(this.searchForm.value.gioitinh!=''){
      this.view=this.view.filter(item=>item.dv_gioitinh==this.searchForm.value.gioitinh);
      console.log('gioitinh');
    }
    if(this.searchForm.value.mau!=''){
      this.view=this.view.filter(item=>item.mau_id==this.searchForm.value.mau);
      console.log('mau');
    }
    $('html, body').animate({
      scrollTop: $(".is-pet").offset().top+80
      }, 'slow');
      this.view=this.view.filter(item=>item.dv_isactive==true);
  }
  //-----------------------------SEARCH--------------------------//
  search(){
    this.view=this.dv.filter(item=>item.dv_isactive==true);
    if(this.searchForm.value.ten!=''){
      this.view=this.view.filter(item=>item.dv_ten.toUpperCase().slice(0,this.searchForm.value.ten.length)===this.searchForm.value.ten.toUpperCase());

    }
    if(this.searchForm.value.gioitinh!=''){
      this.view=this.view.filter(item=>item.dv_gioitinh==this.searchForm.value.gioitinh);
      console.log('gioitinh');
    }
    if(this.searchForm.value.mau!=''){
      this.view=this.view.filter(item=>item.mau_id==this.searchForm.value.mau);
      console.log('mau');
    }
    if(this.is_giong!=''){
      this.view=this.view.filter(item=>item.giong_id==this.is_giong);
    }
    $('html, body').animate({
      scrollTop: $(".is-pet").offset().top+80
      }, 'slow');
    if(this.view.length==0){
      this.not_item=true;
    }
    else{
      this.not_item=false;
    }
  }
  //-----------------------CLICK ALL-------------------------------//
  clickAll(){
    this.view=this.dv.filter(item=>item.dv_isactive==true);
    $('html, body').animate({
      scrollTop: $(".is-pet").offset().top+80
      }, 'slow');
  }

}
