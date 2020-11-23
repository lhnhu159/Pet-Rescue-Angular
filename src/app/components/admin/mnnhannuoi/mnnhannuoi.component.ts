import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';

@Component({
  selector: 'app-mnnhannuoi',
  templateUrl: './mnnhannuoi.component.html',
  styleUrls: ['./mnnhannuoi.component.scss']
})
export class MnnhannuoiComponent implements OnInit {

  constructor(private dongvat:DongvatService,private auth:AuthService,private fb:FormBuilder) { }
  public nhannuoi:any=[];
  public details:any=[];
  is_success_duyet=false;
  is_success_boduyet=false;
  is_success_thongqua=false;
  is_success_bothongqua=false;
  is_success=false;
  public dv:any=[];
  userbyId:any=[];
  dvbyId:any=[];
  nhannuoibyId:any=[];
  suckhoe:any=[];
  mausac:any=[];
  ngOnInit(): void {
    //-----------------------GET LIST NHAN NUOI------------------------------//
    this.dongvat.getNhannuoi().subscribe(
      res=>{
        this.nhannuoi=Array.from(Object.keys(res),i=>res[i])
      },
      err=>{
        console.log(err);
      }
    );
    //---------------------------GET LIST DONG VAT--------------------------//
    this.dongvat.getlistDongvat().subscribe(
      res=>{
        this.dv=Array.from(Object.keys(res),i=>res[i]);
        console.log(this.dv);
      },
      err=>{
        console.log(err);
      }
    );
    //---------------------------GET LIST SUC KHOE----------------------------//
    this.dongvat.getlistSuckhoe().subscribe(
      res=>{
        this.suckhoe=Array.from(Object.keys(res),i=>res[i]);
        console.log(this.suckhoe);
      },
      err=>{
        console.log(err);
      }
    );
    //--------------------------------GET LIST MAU SAC------------------------//
    this.dongvat.getlistMausac().subscribe(
      res=>{
        this.mausac=Array.from(Object.keys(res),i=>res[i]);;
        console.log(this.mausac)
      },
      err=>{
        console.log(err);
      }
    );
  }
  //-----------------------------CHANGE DUYET-----------------------------//
  changeDuyet(e,id){
    var duyet=e.target.checked;
    var formData=new FormData();
    formData.append('nn_duyet',duyet);
    this.dongvat.editNhannuoi(id,formData).subscribe(
      res=>{
        this.is_success=true;
        if(duyet==true){
          this.is_success_duyet=true;
        }
        else{
          this.is_success_boduyet=true;
        }
        $('#popup').addClass('show-popup');
        setTimeout(function(){
          $('#popup').css('opacity','1');
          $('.popup-success').css('margin-top','4rem');
        },10);
      }
    )
  }
  //-------------------------------CHANGE THONG QUA--------------------------//
  changeThongqua(e,id,id_dv){
    var thongqua=e.target.checked;
    var dateNhannuoi=formatDate(Date.now(),'yyyy-MM-dd', 'en-US');
    var formData=new FormData();
    if(thongqua==true){
      formData.append('nn_ngaynhan',dateNhannuoi);
      formData.append('nn_duyet','true');
    }
    else{
      formData.append('nn_ngaynhan','');
    }
    formData.append('success',thongqua);
    this.dongvat.editNhannuoi(id,formData).subscribe(
      res=>{
        
        var formDv=new FormData()
        if(thongqua==true){
          this.is_success_thongqua=true;
          formDv.append('nn_id',id);
          formDv.append('dv_isactive','false');
        }
        else{
          this.is_success_bothongqua=true;
          formDv.append('nn_id','');
        }
        this.dongvat.editDongvat(id_dv,formDv).subscribe(
          res=>{
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
    )
  }
  //--------------------------------POPUP---------------------------------//
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
  //---------------------------------------CLICK DETAILS NHAN NUOI-----------------------------//
  clickDetails(nn,dv,tk){
    //--GET NHAN NUOI DETAILS--//
    this.nhannuoibyId=this.nhannuoi.filter(item=>item._id==nn);
    //------GET DONG VAT----//
    this.dvbyId=this.dv.filter(item=>item._id==dv);
    //-------GET USER-------//
    this.auth.getUserbyId(tk).subscribe(
      res=>{
        this.userbyId=res;
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
  }

}
