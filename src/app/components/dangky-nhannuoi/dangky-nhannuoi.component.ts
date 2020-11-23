import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';
@Component({
  selector: 'app-dangky-nhannuoi',
  templateUrl: './dangky-nhannuoi.component.html',
  styleUrls: ['./dangky-nhannuoi.component.scss']
})
export class DangkyNhannuoiComponent implements OnInit {

  constructor(private dongvat:DongvatService,private actRoute:ActivatedRoute,private fb:FormBuilder,private auth:AuthService) { }
  public dv:any=[];
  public idpet:any;
  public mausac:any=[];
  public suckhoe:any=[];
  step1=true;
  step2=false;
  step3=false;
  next=false;
  finish=false;
  dieukhoanForm:FormGroup;
  infoForm:FormGroup;
  submitInfo=false;
  confirmDieukhoan=false;
  user:any=[];
  ngOnInit(): void {
    //-----------------------------JQUERY------------------------------//
    $('.heading').css('padding-top',$('#topbar').innerHeight()+'px');
    //--------------------------GET ID PET-----------------------//
    this.actRoute.params.subscribe(
      params=>{
        this.idpet=params.id;
      }
    );
    //-------------------------------GET DONG VAT BY ID-----------------------//
    this.dongvat.dongvatbyId(this.idpet).subscribe(
      res=>{
        this.dv=res;
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
    //-----------------------INFO FORM-----------------------------//
     this.infoForm=this.fb.group({
      ten:['',[Validators.required]],
      ngaysinh:['',[Validators.required]],
      gioitinh:['',[Validators.required]],
      phone:['',[Validators.required]],
      diachi:['',[Validators.required]],
      hasPet:false,
    });
    //---------------------------GET INFO USER-------------------------//
    this.auth.getUserApi().subscribe(
      res=>{
        this.user=res;
      },
      err=>{console.log(err)}
    );
  }
  get formControlInfo(){return this.infoForm.controls};
  //---------------------CHECK DIEU KHOAN---------------------------//
  checkDieukhoan(event){
    if(event.target.checked==true){
      this.confirmDieukhoan=true;
      $('.next').addClass('active-btn');
      
    }
    else{
      $('.next').removeClass('active-btn');
    }
  }
  //--------------------CLICK GET INFO------------------------//
  clickGetInfo(){
    this.infoForm.patchValue({
      ten:this.user.firstname+' '+this.user.lastname,
      ngaysinh:formatDate(this.user.ngaysinh,'yyyy-MM-dd', 'en-US'),
      gioitinh:this.user.gioitinh,
      phone:this.user.phone,
      diachi:this.user.diachi,
    });
    console.log(this.user);
  }
  //-----------------------CLICK BACK--------------------//
  clickBack(){
    if(this.step2==true){
      this.step2=false;
      this.step1=true;
      this.confirmDieukhoan=true;
      $('.step2').removeClass('active-step');
      //$('.next').removeClass('active-btn');
      $('.step1').addClass('active-step');
      return;
    }
  }
  //-------------------------CLICK NEXT-----------------------//
  clickNext(){
    console.log(this.confirmDieukhoan,this.step1);
    if(this.confirmDieukhoan==true&&this.step1==true){
      this.step2=true;
      this.step1=false;
      $('.step1').removeClass('active-step');
      $('.step2').addClass('active-step');
      return;
    }
    if(this.step2==true){
      this.submitInfo=true;
      console.log(this.infoForm.value);
      if(this.infoForm.invalid){
        return;
      };
      var formData=new FormData();
      formData.append('dv_id',this.dv._id);
      formData.append('phone',this.infoForm.value.phone);
      formData.append('tk_id',this.user._id);
      formData.append('email',this.user.email);
      formData.append('diachi',this.infoForm.value.diachi);
      formData.append('ngaysinh',this.infoForm.value.ngaysinh);
      formData.append('gioitinh',this.infoForm.value.gioitinh),
      formData.append('ten',this.infoForm.value.ten);
      formData.append('haspet',this.infoForm.value.hasPet);
      this.dongvat.addNhannuoi(formData).subscribe(
        res=>{
          this.step2=false;
          this.step3=true;
          this.finish=true;
          $('.step2').removeClass('active-step');
           $('.step3').addClass('active-step');
           return;
        },
        err=>{
          console.log(err);
        }
      )
    }
  }

}
