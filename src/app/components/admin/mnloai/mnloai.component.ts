import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';

@Component({
  selector: 'app-mnloai',
  templateUrl: './mnloai.component.html',
  styleUrls: ['./mnloai.component.scss']
})
export class MnloaiComponent implements OnInit {

  constructor(private dongvat:DongvatService,private fb:FormBuilder) { }
  public giong=[];
  public loai=[];
  is_add=false;
  is_edit=false;
  is_delete=false;
  is_confirm=false;
  is_success=false;
  is_success_add=false;
  is_success_edit=false;
  is_success_delete=false;
  addgiongForm:FormGroup;
  editgiongForm:FormGroup;
  submitAddgiong=false;
  submitEditgiong=false;
  giongbyID:any;
  tengiong='';
  idDelete:any;
  ngOnInit(): void {
    //------------Get list Giong--------------//
    this.dongvat.getlistLoai().subscribe(
      res=>{
        console.log(res);
        this.giong=Array.from(Object.keys(res),i=>res[i])
      },
      err=>{
        console.log(err);
      }
    )
    //--------------------------- GET LIST LOAI---------------------//
    this.dongvat.getlistGiong().subscribe(
      res=>{
        this.loai=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    )
    //----------------Form add Giong-------------//
    this.addgiongForm=this.fb.group({
      tengiong:['',[Validators.required]],
      loai:['',[Validators.required]]
    });
    //---------------FORM EDIT GIONG-------------//
    this.editgiongForm=this.fb.group({
      tengiong:['',[Validators.required]],
      loai:['',[Validators.required]]
    });
  }
  get formControlAddgiong(){return this.addgiongForm.controls};
  get formControlEditgiong(){return this.editgiongForm.controls};
  //-----------------CLICK SHOW ADD GIONG---------------//
  clickshowAdd(){
    this.is_add=true;
  }
  //---------------CLICK BACK LIST GIONG----------------//
  BackList(){
    if(this.is_add==true){
      this.is_add=false;
    }
    else if(this.is_edit==true){
      this.is_edit=false;
    }
    
  }
  //------------------------CREATE GIONG------------------//
  AddGiong(){ 
    this.submitAddgiong=true;
    var tengiong=this.addgiongForm.value.tengiong;
    var loai=this.addgiongForm.value.loai;
    if(this.addgiongForm.invalid){
      return;
    }
    this.dongvat.addLoai(tengiong,loai).subscribe(
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
  //-------------------------------------EDIT GIONG-------------------------------//
  clickeditGiong(id){
    this.dongvat.loaibyID(id).subscribe(
      res=>{
        this.giongbyID=res;
        this.editgiongForm.setValue({tengiong:this.giongbyID.loai_ten,loai:this.giongbyID.giong_id});
        this.is_edit=true;
      },
      err=>{
        console.log(err)
      }
    )

  }
  EditGiong(){
    this.submitEditgiong=true;
    var id=this.giongbyID._id;
    var tengiong=this.editgiongForm.value.tengiong;
    var loai=this.editgiongForm.value.loai;
    if(this.editgiongForm.invalid){
      return
    }
    this.dongvat.editLoai(id,tengiong,loai).subscribe(
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
  //--------------------------------------DELETE GIONG ID-----------------------//
  clickDeleteGiong(id){
    this.idDelete=id;
    var popup=$('#popup');
    this.is_confirm=true;
    popup.addClass('show-popup');
    setTimeout(function(){
      popup.css('opacity','1'); 
      $('.confirm').css('margin-top','4rem');     
    },10);
  }
  deleteGiong(){
    this.dongvat.deleteLoai(this.idDelete).subscribe(
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
