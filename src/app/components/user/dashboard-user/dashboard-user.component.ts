import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { url } from 'inspector';


@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {

  constructor(private auth:AuthService,public router:Router) { }
  public user:any=[];
  public role:any=[];
  public payload:any;
  public srcImg:any;
  public is_edit:any;
  public btn_avatar=false;
  selectAvatar:any;
  is_success=false;
  geturl(){
    return this.router.url;
  }
  ngOnInit(): void {
    //----------------JQUERY--------------------------//
    $('.user').css('padding-top',$('#topbar').innerHeight()+'px');
    setInterval(()=>{
      $('.menu-link').each(function(){
        if($(this).attr('routerLink')==window.location.pathname){
          $(this).addClass('active');
        }
        else{
          $(this).removeClass('active');
        }
      });
    },1000);
    
    //-----------------------GET USER-------------------//
    this.auth.getUserApi().subscribe(
      res=>{
        this.user=res;
        if(this.user.hinhanh!=null){
          this.srcImg=this.user.hinhanh;
        }
      },
      err=>{
        console.log(err);
      }
    );
    //--------------------GET PAY LOAD---------------------//
    this.auth.getPayload().subscribe(
      res=>{
        this.payload=res;
        if(this.payload["custom:is_admin"]=='true'){
          this.role='ADMIN';
        }
        else{
          this.role='USER';
        }
      },
      err=>{
        console.log(err);
      }
    );
  }
  //-----------------------------UPLOAD AVATAR--------------//
  uploadAvatar(event){
    this.btn_avatar=true;
    var file =event.target.files[0];
    var reader=new FileReader();
    reader.onload=event=>this.srcImg=reader.result;
    reader.readAsDataURL(file);
    this.selectAvatar=<File>event.target.files[0];
  }
  //---------------CONFIRM AVARTAR---------------//
  confirmAvatar(){
    var formData=new FormData();
    formData.append('hinhanh',this.selectAvatar);
    this.auth.editUser(formData).subscribe(
      res=>{
        console.log(res);
        this.is_success=true;
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
  //---------------------POP UP-----------------//
  exitPopup(){
    $('#popup').css('opacity','0'); 
    $('.popup-content').css('margin-top','0');
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
  

}
