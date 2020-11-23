import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';

@Component({
  selector: 'app-mnsuckhoe',
  templateUrl: './mnsuckhoe.component.html',
  styleUrls: ['./mnsuckhoe.component.scss']
})
export class MnsuckhoeComponent implements OnInit {

  constructor(private dongvat:DongvatService,private fb:FormBuilder) { }
  public suckhoe=[];
  is_add=false;
  is_edit=false;
  is_delete=false;
  is_confirm=false;
  is_success=false;
  is_success_add=false;
  is_success_edit=false;
  is_success_delete=false;
  addsuckhoeForm:FormGroup;
  editsuckhoeForm:FormGroup;
  submitAddsuckhoe=false;
  submitEditsuckhoe=false;
  suckhoebyID:any;
  tensuckhoe='';
  idDelete:any;
  ngOnInit(): void {
    //------------Get list TINH TRANG SUC KHOE--------------//
    this.dongvat.getlistSuckhoe().subscribe(
      res=>{
        console.log(res);
        this.suckhoe=Array.from(Object.keys(res),i=>res[i])
      },
      err=>{
        console.log(err);
      }
    )
    //----------------Form add TINH TRANG SUC KHOE-------------//
    this.addsuckhoeForm=this.fb.group({
      tentinhtrang:['',[Validators.required]]
    });
    //---------------FORM EDIT TINH TRANG SUC KHOE-------------//
    this.editsuckhoeForm=this.fb.group({
      tentinhtrang:['',[Validators.required]]
    });
  }
  get formControlAddsuckhoe(){return this.addsuckhoeForm.controls};
  get formControlEditsuckhoe(){return this.editsuckhoeForm.controls};
  //-----------------CLICK SHOW ADD TINH TRANG SUC KHOE---------------//
  clickshowAdd(){
    this.is_add=true;
  }
  //---------------CLICK BACK LIST TINH TRANG SUC KHOE----------------//
  BackList(){
    if(this.is_add==true){
      this.is_add=false;
    }
    else if(this.is_edit==true){
      this.is_edit=false;
    }
    
  }
  //------------------------CREATE TINH TRANG SUC KHOE------------------//
  AddSuckhoe(){ 
    this.submitAddsuckhoe=true;
    var tentinhtrang=this.addsuckhoeForm.value.tentinhtrang;
    if(this.addsuckhoeForm.invalid){
      return;
    }
    this.dongvat.addSuckhoe(tentinhtrang).subscribe(
      res=>{
        //this.is_confirm=false;
        this.is_success=true;
        this.is_success_add=true;
        $('#popup').addClass('show-popup');
        setTimeout(function(){
          $('#popup').css('opacity','1');
          $('.popup-success').css('margin-top','4rem');
        },10);
      },
      err=>{
        console.log(err)
      }
    )
  }
  //-------------------------------------EDIT TINH TRANG SUC KHOE-------------------------------//
  clickeditSuckhoe(id){
    this.dongvat.suckhoebyID(id).subscribe(
      res=>{
        this.suckhoebyID=res;
        this.editsuckhoeForm.setValue({tentinhtrang:this.suckhoebyID.ttsk_tentinhtrang});
        this.is_edit=true;
      },
      err=>{
        console.log(err)
      }
    )

  }
  EditSuckhoe(){
    this.submitEditsuckhoe=true;
    var id=this.suckhoebyID._id;
    var tensuckhoe=this.editsuckhoeForm.value.tentinhtrang;
    if(this.editsuckhoeForm.invalid){
      return
    }
    this.dongvat.editSuckhoe(id,tensuckhoe).subscribe(
      res=>{
        //this.is_confirm=false;
        this.is_success=true;
        this.is_success_edit=true;
        $('#popup').addClass('show-popup');
        setTimeout(function(){
          $('#popup').css('opacity','1');
          $('.popup-success').css('margin-top','4rem');
        },10);
      },
      err=>{
        console.log(err)
      }
    )
  }
  //--------------------------------------DELETE TINH TRANG SUC KHOE ID-----------------------//
  clickDeleteSuckhoe(id){
    this.idDelete=id;
    var popup=$('#popup');
    this.is_confirm=true;
    popup.addClass('show-popup');
    setTimeout(function(){
      popup.css('opacity','1'); 
      $('.confirm').css('margin-top','4rem');     
    },10);
  }
  deleteSuckhoe(){
    this.dongvat.deleteSuckhoe(this.idDelete).subscribe(
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

}
