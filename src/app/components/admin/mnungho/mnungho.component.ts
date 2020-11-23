import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';

@Component({
  selector: 'app-mnungho',
  templateUrl: './mnungho.component.html',
  styleUrls: ['./mnungho.component.scss']
})
export class MnunghoComponent implements OnInit {

  constructor(private dongvat:DongvatService,private fb:FormBuilder) { }
  public ungho:any=[];
  public hinhthuc:any=[];
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
  unghobyID:any;
  idDelete:any;
  ngOnInit(): void {
    //------------Get list Giong--------------//
    this.dongvat.getlistUngho().subscribe(
      res=>{
        this.ungho=Array.from(Object.keys(res),i=>res[i]);
        this.ungho=this.ungho.sort((val1, val2)=>  new Date(val2.ngay).getDate() - new Date(val1.ngay).getDate());
      },
      err=>{
        console.log(err);
      }
    )
    //--------------------------- GET LIST LOAI---------------------//
    this.dongvat.getlistHinhthucUh().subscribe(
      res=>{
        this.hinhthuc=Array.from(Object.keys(res),i=>res[i]);
        console.log(this.hinhthuc);
      },
      err=>{
        console.log(err);
      }
    )
    //----------------Form add Giong-------------//
    this.addForm=this.fb.group({
      ten:['',[Validators.required]],
      diachi:'',
      sodienthoai:'',
      mota:'',
      hinhthuc:['',[Validators.required]],
      ngay:['',[Validators.required]],
      sotien:''
    });
    //---------------FORM EDIT GIONG-------------//
    this.editForm=this.fb.group({
      ten:['',[Validators.required]],
      diachi:'',
      sodienthoai:'',
      mota:'',
      ngay:['',[Validators.required]],
      hinhthuc:['',[Validators.required]],
      sotien:''
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
    if(this.is_add==true){
      this.is_add=false;
    }
    else if(this.is_edit==true){
      this.is_edit=false;
    }
    
  }
  //------------------------CREATE GIONG------------------//
  AddUngho(){ 
    this.submitAdd=true;
    if(this.addForm.invalid){
      return;
    }
    var formData=new FormData();
    formData.append('hoten',this.addForm.value.ten);
    formData.append('diachi',this.addForm.value.diachi);
    formData.append('sodienthoai',this.addForm.value.sodienthoai);
    formData.append('mota',this.addForm.value.mota);
    formData.append('hinhthuc',this.addForm.value.hinhthuc);
    formData.append('ngay',this.addForm.value.ngay);
    formData.append('sotien',this.addForm.value.sotien);

    this.dongvat.addUngho(formData).subscribe(
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
  clickeditUngho(id){
    this.unghobyID=this.ungho.filter(item=>item._id==id)[0];
    this.editForm.patchValue({
      ten:this.unghobyID.hoten,
      diachi:this.unghobyID.diachi,
      sodienthoai:this.unghobyID.sodienthoai,
      mota:this.unghobyID.mota,
      hinhthuc:this.unghobyID.hinhthuc,
      ngay:formatDate(this.unghobyID.ngay,'yyyy-MM-dd', 'en-US'),
      sotien:this.unghobyID.sotien
    })
    this.is_edit=true;

  }
  EditUngho(){
    this.submitEdit=true;
    if(this.editForm.invalid){
      return
    }
    var formData=new FormData();
    formData.append('hoten',this.editForm.value.ten);
    formData.append('diachi',this.editForm.value.diachi);
    formData.append('sodienthoai',this.editForm.value.sodienthoai);
    formData.append('mota',this.editForm.value.mota);
    formData.append('hinhthuc',this.editForm.value.hinhthuc);
    formData.append('ngay',this.editForm.value.ngay);
    formData.append('sotien',this.editForm.value.sotien);
    this.dongvat.editUngho(this.unghobyID._id,formData).subscribe(
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
  clickDeleteUngho(id){
    this.idDelete=id;
    var popup=$('#popup');
    this.is_confirm=true;
    popup.addClass('show-popup');
    setTimeout(function(){
      popup.css('opacity','1'); 
      $('.confirm').css('margin-top','4rem');     
    },10);
  }
  deleteUngho(){
    this.dongvat.deleteUngho(this.idDelete).subscribe(
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
