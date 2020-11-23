import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
@Component({
  selector: 'app-mnsanpham',
  templateUrl: './mnsanpham.component.html',
  styleUrls: ['./mnsanpham.component.scss']
})
export class MnsanphamComponent implements OnInit {

  constructor(private dongvat:DongvatService,private fb:FormBuilder) { }
  public danhmuc:any=[];
  public sanpham:any=[];
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
  sanphambyID:any;
  idDelete:any;
  selectFile:any='';
  public Editor=ClassicEditor;
  ngOnInit(): void {
    //----------------------GET LIST DANH MUC--------------------//
    this.dongvat.getlistDanhmuc().subscribe(
      res=>{
        this.danhmuc=Array.from(Object.keys(res),i=>res[i]);
        console.log(this.danhmuc);
      },
      err=>{
        console.log(err);
      }
    )
    //------------------------GET LIST SAN PHAM---------------------//
    this.dongvat.getlistSanpham().subscribe(
      res=>{
        this.sanpham=Array.from(Object.keys(res),i=>res[i]);
        console.log(this.sanpham);
      },
      err=>{
        console.log(err);
      }
    );
    //----------------Form add SAN PHAM-------------//
    this.addForm=this.fb.group({
      tensanpham:['',[Validators.required]],
      danhmuc:['',[Validators.required]],
      soluong:['',[Validators.required,Validators.min(1),Validators.pattern("^[0-9]*$")]],
      dongia:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      mota:'',
      thuonghieu:['',[Validators.required]],
      hinhanh:''
    });
    //---------------FORM EDIT SAN PHAM-------------//
    this.editForm=this.fb.group({
      tensanpham:['',[Validators.required]],
      danhmuc:['',[Validators.required]],
      soluong:['',[Validators.required,Validators.min(1),Validators.pattern("^[0-9]*$")]],
      dongia:['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1)]],
      mota:'',
      hinhanh:'',
      thuonghieu:['',[Validators.required]]
    });
  }
  get formControlAdd(){return this.addForm.controls};
  get formControlEdit(){return this.editForm.controls};
  //-----------------CLICK SHOW ADD DANH MUC---------------//
  clickshowAdd(){
    this.is_add=true;
  }
  //---------------CLICK BACK LIST DANH MUC----------------//
  BackList(){
    window.location.reload();    
  }
  //------------------------SELECT HINH ANH---------------------------//
  selectHinhanh(event){
    this.selectFile=<File>event.target.files[0];
  }
  //------------------------CREATE DANH MUC------------------//
  AddSanpham(){ 
    this.submitAdd=true;
    if(this.addForm.invalid){
      return;
    }
    var formData=new FormData();
    formData.append('sp_ten',this.addForm.value.tensanpham);
    formData.append('dm_id',this.addForm.value.danhmuc);
    formData.append('sp_soluong',this.addForm.value.soluong);
    formData.append('sp_dongia',this.addForm.value.dongia);
    formData.append('sp_mota',this.addForm.value.mota);
    formData.append('sp_thuonghieu',this.addForm.value.thuonghieu);
    formData.append('sp_hinhanh',this.selectFile);
    this.dongvat.addSanpham(formData).subscribe(
      res=>{
        console.log(res);
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
  //-------------------------------------EDIT DANH MUC-------------------------------//
  clickeditSanpham(id){
    this.is_edit=true;
    this.sanphambyID=this.sanpham.filter(item=>item._id==id)[0];
    this.editForm.patchValue({
      tensanpham:this.sanphambyID.sp_ten,
      soluong:this.sanphambyID.sp_soluong,
      dongia:this.sanphambyID.sp_dongia,
      mota:this.sanphambyID.sp_mota,
      thuonghieu:this.sanphambyID.sp_thuonghieu,
      danhmuc:this.sanphambyID.dm_id
    });
  }
  EditSanpham(){
    this.submitEdit=true;
    var id=this.sanphambyID._id;
    if(this.editForm.invalid){
      return
    }
    var formData=new FormData();
    formData.append('sp_ten',this.editForm.value.tensanpham);
    formData.append('dm_id',this.editForm.value.danhmuc);
    formData.append('sp_soluong',this.editForm.value.soluong);
    formData.append('sp_dongia',this.editForm.value.dongia);
    formData.append('sp_mota',this.editForm.value.mota);
    formData.append('sp_thuonghieu',this.editForm.value.thuonghieu);
    if(this.selectFile!=''){
      formData.append('sp_hinhanh',this.selectFile);
    }
    this.dongvat.editSanpham(id,formData).subscribe(
      res=>{
        console.log(res);
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
  //--------------------------------------DELETE DANH MUC ID-----------------------//
  clickDeleteSanpham(id){
    this.idDelete=id;
    var popup=$('#popup');
    this.is_confirm=true;
    popup.addClass('show-popup');
    setTimeout(function(){
      popup.css('opacity','1'); 
      $('.confirm').css('margin-top','4rem');     
    },10);
  }
  deleteSanpham(){
    this.dongvat.deleteSanpham(this.idDelete).subscribe(
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
