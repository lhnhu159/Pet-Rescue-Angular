import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';

@Component({
  selector: 'app-mnmausac',
  templateUrl: './mnmausac.component.html',
  styleUrls: ['./mnmausac.component.scss']
})
export class MnmausacComponent implements OnInit {

  constructor(private dongvat:DongvatService,private fb:FormBuilder) { }
  public mausac=[];
  is_add=false;
  is_edit=false;
  is_delete=false;
  is_confirm=false;
  is_success=false;
  is_success_add=false;
  is_success_edit=false;
  is_success_delete=false;
  addmausacForm:FormGroup;
  editmausacForm:FormGroup;
  submitAddmausac=false;
  submitEditmausac=false;
  mausacbyID:any;
  tenmausac='';
  idDelete:any;
  ngOnInit(): void {
    //------------Get list Mau sac--------------//
    this.dongvat.getlistMausac().subscribe(
      res=>{
        console.log(res);
        this.mausac=Array.from(Object.keys(res),i=>res[i])
      },
      err=>{
        console.log(err);
      }
    )
    //----------------Form add MAU SAC-------------//
    this.addmausacForm=this.fb.group({
      tenmau:['',[Validators.required]]
    });
    //---------------FORM EDIT MAU SAC-------------//
    this.editmausacForm=this.fb.group({
      tenmau:['',[Validators.required]]
    });
  }
  get formControlAddmausac(){return this.addmausacForm.controls};
  get formControlEditmausac(){return this.editmausacForm.controls};
  //-----------------CLICK SHOW ADD MAU SAC---------------//
  clickshowAdd(){
    this.is_add=true;
  }
  //---------------CLICK BACK LIST MAU SAC----------------//
  BackList(){
    if(this.is_add==true){
      this.is_add=false;
    }
    else if(this.is_edit==true){
      this.is_edit=false;
    }
    
  }
  //------------------------CREATE MAU SAC------------------//
  AddMausac(){ 
    this.submitAddmausac=true;
    var tenmau=this.addmausacForm.value.tenmau;
    if(this.addmausacForm.invalid){
      return;
    }
    this.dongvat.addMausac(tenmau).subscribe(
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
  //-------------------------------------EDIT MAU SAC-------------------------------//
  clickeditMausac(id){
    this.dongvat.mausacbyID(id).subscribe(
      res=>{
        this.mausacbyID=res;
        this.editmausacForm.setValue({tenmau:this.mausacbyID.mau_ten});
        this.is_edit=true;
      },
      err=>{
        console.log(err)
      }
    )

  }
  EditMausac(){
    this.submitEditmausac=true;
    var id=this.mausacbyID._id;
    var tenmau=this.editmausacForm.value.tenmau;
    if(this.editmausacForm.invalid){
      return
    }
    this.dongvat.editMausac(id,tenmau).subscribe(
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
  //--------------------------------------DELETE MAU SAC ID-----------------------//
  clickDeleteMausac(id){
    this.idDelete=id;
    var popup=$('#popup');
    this.is_confirm=true;
    popup.addClass('show-popup');
    setTimeout(function(){
      popup.css('opacity','1'); 
      $('.confirm').css('margin-top','4rem');     
    },10);
  }
  deleteMausac(){
    this.dongvat.deleteMausac(this.idDelete).subscribe(
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
