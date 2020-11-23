import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';

@Component({
  selector: 'app-mnhinhthuc-ungho',
  templateUrl: './mnhinhthuc-ungho.component.html',
  styleUrls: ['./mnhinhthuc-ungho.component.scss']
})
export class MnhinhthucUnghoComponent implements OnInit {

  constructor(private dongvat:DongvatService,private fb:FormBuilder) { }
  public hinhthucUh:any=[];
  is_add=false;
  is_edit=false;
  is_delete=false;
  is_confirm=false;
  is_success=false;
  is_success_add=false;
  is_success_edit=false;
  is_success_delete=false;
  addForm:FormGroup;
  editForm:FormGroup;
  submitAdd=false;
  submitEdit=false;
  hinhthucbyID:any=[];
  idDelete:any;
  ngOnInit(): void {
    //------------Get list HINH THUC UNG HO--------------//
    this.dongvat.getlistHinhthucUh().subscribe(
      res=>{
        this.hinhthucUh=Array.from(Object.keys(res),i=>res[i]);

      },
      err=>{
        console.log(err);
      }
    )
    //----------------Form add HINH THUC UNG HO-------------//
    this.addForm=this.fb.group({
      tenhinhthuc:['',[Validators.required]]
    });
    //---------------FORM EDIT HINH THUC UNG HO-------------//
    this.editForm=this.fb.group({
      tenhinhthuc:['',[Validators.required]]
    });
  }
  get formControlAdd(){return this.addForm.controls};
  get formControlEdit(){return this.editForm.controls};
  //-----------------CLICK SHOW ADD GIONG---------------//
  clickshowAdd(){
    this.is_add=true;
  }
  //---------------CLICK BACK LIST GIONG----------------//
  BackList(){
    window.location.reload();    
  }
  //------------------------CREATE GIONG------------------//
  AddHinhthuc(){ 
    this.submitAdd=true;
    if(this.addForm.invalid){
      return;
    }
    this.dongvat.addHinhthucUh({htuh_ten:this.addForm.value.tenhinhthuc}).subscribe(
      res=>{
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
  clickeditHinhthuc(id){
    this.hinhthucbyID=this.hinhthucUh.filter(item=>item._id==id)[0];
        this.editForm.setValue({tenhinhthuc:this.hinhthucbyID.htuh_ten});
        this.is_edit=true;

  }
  EditHinhthuc(){
    this.submitEdit=true;
    var id=this.hinhthucbyID._id;
    if(this.editForm.invalid){
      return
    }
    this.dongvat.editHinhthucUh(id,{htuh_ten:this.editForm.value.tenhinhthuc}).subscribe(
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
  clickDeleteHinhthuc(id){
    this.idDelete=id;
    var popup=$('#popup');
    this.is_confirm=true;
    popup.addClass('show-popup');
    setTimeout(function(){
      popup.css('opacity','1'); 
      $('.confirm').css('margin-top','4rem');     
    },10);
  }
  deleteHinhthuc(){
    this.dongvat.deleteHinhthucUh(this.idDelete).subscribe(
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
