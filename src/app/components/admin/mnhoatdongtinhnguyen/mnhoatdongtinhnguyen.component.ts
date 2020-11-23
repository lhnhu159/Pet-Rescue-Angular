import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
@Component({
  selector: 'app-mnhoatdongtinhnguyen',
  templateUrl: './mnhoatdongtinhnguyen.component.html',
  styleUrls: ['./mnhoatdongtinhnguyen.component.scss']
})
export class MnhoatdongtinhnguyenComponent implements OnInit {

  constructor(private auth:AuthService,private fb:FormBuilder) { }
  public danhmuc=[];
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
  danhmucbyID:any;
  idDelete:any;
  selectFile:any=false;
  public Editor=ClassicEditor;
  ngOnInit(): void {
     //----------------------GET LIST DANH MUC--------------------//
     this.auth.getlistHoatdong().subscribe(
      res=>{
        this.danhmuc=Array.from(Object.keys(res),i=>res[i]);
        console.log(this.danhmuc);
      },
      err=>{
        console.log(err);
      }
    )
    //----------------Form add DANH MUC-------------//
    this.addForm=this.fb.group({
      tenhoatdong:['',[Validators.required]],
      ngaybatdau:['',[Validators.required]],
      ngayketthuc:['',[Validators.required]],
      diadiem:['',[Validators.required]],
      mota:'',
      hinhanh:''
    });
    //---------------FORM EDIT DANH MUC-------------//
    this.editForm=this.fb.group({
      tenhoatdong:['',[Validators.required]],
      ngaybatdau:['',[Validators.required]],
      ngayketthuc:['',[Validators.required]],
      diadiem:['',[Validators.required]],
      mota:'',
      hinhanh:''
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
    AddDanhmuc(){ 
      this.submitAdd=true;
      if(this.addForm.invalid){
        return;
      }
      var formData=new FormData();
      formData.append('ten',this.addForm.value.tenhoatdong);
      formData.append('noidung',this.addForm.value.mota);
      formData.append('ngaybatdau',this.addForm.value.ngaybatdau);
      formData.append('ngayketthuc',this.addForm.value.ngayketthuc);
      formData.append('diadiem',this.addForm.value.diadiem);
      formData.append('url',this.selectFile);
      this.auth.addHoatdong(formData).subscribe(
        res=>{
          this.is_confirm=false;
          this.is_success=true;
          this.is_success_add=true;
          $('#popup').addClass('show-popup');
          setTimeout(function(){
            $('#popup').css('opacity','1');
            $('.popup-success').css('margin-top','4rem');
          },100);
        },
        err=>{
          console.log(err)
        }
      )
    }
    //-------------------------------------EDIT DANH MUC-------------------------------//
    clickeditDanhmuc(id){
      this.is_edit=true;
      this.danhmucbyID=this.danhmuc.filter(item=>item._id==id)[0];
      this.editForm.patchValue({
        tenhoatdong:this.danhmucbyID.ten,
        mota:this.danhmucbyID.noidung,
        ngaybatdau:formatDate(this.danhmucbyID.ngaybatdau,'yyyy-MM-dd', 'en-US'),
        ngayketthuc:formatDate(this.danhmucbyID.ngayketthuc,'yyyy-MM-dd', 'en-US'),
        diadiem:this.danhmucbyID.diadiem,
      });
    }
    EditDanhmuc(){
      this.submitEdit=true;
      var id=this.danhmucbyID._id;
      if(this.editForm.invalid){
        return
      }
      var formData=new FormData();
      formData.append('ten',this.editForm.value.tenhoatdong);
      formData.append('noidung',this.editForm.value.mota);
      formData.append('ngaybatdau',this.editForm.value.ngaybatdau);
      formData.append('ngayketthuc',this.editForm.value.ngayketthuc);
      formData.append('diadiem',this.editForm.value.diadiem);
      if(this.selectFile!=false){
        formData.append('url',this.selectFile);
      }
      this.auth.editHoatdong(id,formData).subscribe(
        res=>{
          console.log(res);
          this.is_confirm=false;
          this.is_success=true;
          this.is_success_edit=true;
          $('#popup').addClass('show-popup');
          setTimeout(function(){
            $('#popup').css('opacity','1');
            $('.popup-success').css('margin-top','4rem');
          },100);
        },
        err=>{
          console.log(err)
        }
      )
    }
    //--------------------------------------DELETE DANH MUC ID-----------------------//
    clickDeleteDanhmuc(id){
      this.idDelete=id;
      var popup=$('#popup');
      this.is_confirm=true;
      popup.addClass('show-popup');
      setTimeout(function(){
        popup.css('opacity','1'); 
        $('.confirm').css('margin-top','4rem');     
      },100);
    }
    deleteDanhmuc(){
      this.auth.deleteHoatdong(this.idDelete).subscribe(
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
