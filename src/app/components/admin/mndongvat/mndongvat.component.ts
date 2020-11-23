import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormArray, FormControl } from '@angular/forms';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ThrowStmt } from '@angular/compiler';
import {formatDate} from "@angular/common"
import { Router } from '@angular/router';

@Component({
  selector: 'app-mndongvat',
  templateUrl: './mndongvat.component.html',
  styleUrls: ['./mndongvat.component.scss']
})
export class MndongvatComponent implements OnInit {
  public dv=[];
  public dvbyID:any=[];
  adddongvatForm:FormGroup;
  editdongvatForm:FormGroup;
  is_add=false;
  is_edit=false;
  is_confirm=false;
  is_details=false;
  is_success_edit=false;
  is_success_add=false;
  is_success_delete=false;
  public is_success=false;
  is_active=false;
  is_unactive=false;
  is_bengoan=false;
  is_unbengoan=false;
  has_tiemphong=false;
  submitAdddongvat=false;
  submitEditdongvat=false;
  selectFile:any='';
  public loai=[];
  public giong=[];
  public giongbyloai=[];
  public mau=[];
  public ttsk:any=[];
  p: number = 1;
  collection: any[] = this.dv;
  idEdit='';
  public Editor=ClassicEditor;
  public thongtinArr=[];
  idDelete:any;
  chiphi:any=[];
  view=[];
  thongtin:any=[
    {
      name:"Thân thiện với chó mèo",
      value:"Thân thiện với chó mèo"
    },
    {
      name:"Thân thiện với người",
      value:"Thân thiện với người"
    },
    {
      name:"Đi vệ sinh đúng chỗ",
      value:"Đi vệ sinh đúng chỗ"
    },
    {
      name:"Triệt sản",
      value:"Triệt sản"
    },
    {
      name:"Ăn uống ngoan",
      value:"Ăn uống ngoan"
    }

  ]
  constructor(private dongvat:DongvatService,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    //----------------------GET LIST DONG VAT---------------//
    this.dongvat.getlistDongvat().subscribe(
      res=>{
        console.log(res);
        this.dv=Array.from(Object.keys(res),i=>res[i]);
        this.view=this.dv;
      },
      err=>{
        console.log(err);
      }
    );
    //--------------------------GET LIST LOAI-------------------//
    this.dongvat.getlistGiong().subscribe(
      res=>{
        this.loai=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    )
    //------------------------------GET LIST GIONG------------------//
    this.dongvat.getlistLoai().subscribe(
      res=>{
        this.giong=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    )
    //----------------------GET LIST MAU---------------------//
    this.dongvat.getlistMausac().subscribe(
      res=>{
        this.mau=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    )
    //GET LIST SUC KHOE
    this.dongvat.getlistSuckhoe().subscribe(
      res=>{
        this.ttsk=Array.from(Object.keys(res),i=>res[i]);
        console.log(this.ttsk);
      },
      err=>{
        console.log(err)
      }
    )
    //----------------Form add Dong vat-------------//
    this.adddongvatForm=this.fb.group({
      tendongvat:['',[Validators.required]],
      cannang:['',[Validators.required]],
      dotuoi:['',[Validators.required]],
      gioitinh:['',[Validators.required]],
      tiemphong:['',[Validators.required]],
      ngaytiemphong:[''],
      lydoden:['',[Validators.required]],
      ngayden:['',[Validators.required]],
      loai:['',[Validators.required]],
      giong:['',[Validators.required]],
      thongtinthem:this.fb.array([]),
      mau:['',[Validators.required]],
      mota:'',
      active:'',
      hinhanh:'',
      suckhoe:['',[Validators.required]],

    });
    //----------------------FORM EDIT DONG VAT--------------------//
    this.editdongvatForm=this.fb.group({
      tendongvat:['',[Validators.required]],
      cannang:['',[Validators.required]],
      dotuoi:['',[Validators.required]],
      gioitinh:['',[Validators.required]],
      tiemphong:['',[Validators.required]],
      ngaytiemphong:[''],
      lydoden:['',[Validators.required]],
      ngayden:['',[Validators.required]],
      loai:['',[Validators.required]],
      giong:['',[Validators.required]],
      thongtinthem:this.fb.array([]),
      mau:['',[Validators.required]],
      mota:'',
      active:'',
      hinhanh:'',
      suckhoe:['',[Validators.required]],
    });
  }
  get formControlAdddongvat(){return this.adddongvatForm.controls};
  get formControlEditdongvat(){return this.editdongvatForm.controls};
  //--------------------ADD DONG VAT-----------------------------------//
  AddDongvat(){
    console.log(this.adddongvatForm.value.suckhoe);
    this.submitAdddongvat=true;
    var thongtin=this.adddongvatForm.value.thongtinthem;
    var mergeThongtin=thongtin.toString();
    var formData=new FormData();
    console.log(this.adddongvatForm.value);
    formData.append('dv_ten',this.adddongvatForm.value.tendongvat);
    formData.append('dv_cannang',this.adddongvatForm.value.cannang);
    formData.append('dv_dotuoi',this.adddongvatForm.value.dotuoi);
    formData.append('dv_gioitinh',this.adddongvatForm.value.gioitinh);
    formData.append('dv_tiemphong',this.adddongvatForm.value.tiemphong);
    formData.append('dv_ngaytiemphong',this.adddongvatForm.value.ngaytiemphong);
    formData.append('dv_lydoden',this.adddongvatForm.value.lydoden);
    formData.append('dv_ngayden',this.adddongvatForm.value.ngayden);
    formData.append('ttsk_id',this.adddongvatForm.value.suckhoe);
    if(this.adddongvatForm.value.active==true){
      formData.append('dv_isactive',this.adddongvatForm.value.active);
    }
    else{
      formData.append('dv_isactive','false');
    }
    formData.append('giong_id',this.adddongvatForm.value.loai);
    formData.append('loai_id',this.adddongvatForm.value.giong);
    formData.append('dv_mota',this.adddongvatForm.value.mota);
    formData.append('dv_hinhanh',this.selectFile);
    formData.append('mau_id',this.adddongvatForm.value.mau);
    formData.append('dv_thongtinthem',mergeThongtin);
    if(this.adddongvatForm.invalid){
      return;
    }
    this.dongvat.addDongvat(formData).subscribe(
      res=>{
        this.is_success=true;
        this.is_success_add=true;
        $('#popup').addClass('show-popup');
        setTimeout(function(){
          $('#popup').css('opacity','1');
          $('.popup-success').css('margin-top','4rem');
        },100);
      },
      err=>{
        console.log(err);
      }
    )
  }
  //---------------CLICK BACK LIST GIONG----------------//
  BackList(){
    if(this.is_add==true){
      this.is_add=false;
    }
    else if(this.is_edit==true){
      this.is_edit=false;
    }
    this.is_details=false;
    
  }
  //--------------------------SELECT TIEM PHONG---------------//
  selectTiemphong(event){
    if(event=="true"){
      this.has_tiemphong=true;
    }
    else{
      this.has_tiemphong=false;
    }
  }
  //------------------------SELECT LOAI---------------------------//
  selectLoai(event){
    this.dongvat.getgiongbyLoai(event).subscribe(
      res=>{
        this.giongbyloai=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    )
  }
  //----------------CHANGE CHECKBOX----------------------------//
  changeCheckbox(event){
    const checkThongtin:FormArray=this.adddongvatForm.get('thongtinthem') as FormArray;
    if(event.target.checked){
      checkThongtin.push(new FormControl(event.target.value));
    }
    else{
      let i=0;
      checkThongtin.controls.forEach((item:FormControl)=>{
        if(item.value==event.target.value){
          checkThongtin.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  //----
  changeCheckboxEdit(event){
    const checkThongtin:FormArray=this.editdongvatForm.get('thongtinthem') as FormArray;
    if(event.target.checked){
      checkThongtin.push(new FormControl(event.target.value));
    }
    else{
      let i=0;
      checkThongtin.controls.forEach((item:FormControl)=>{
        if(item.value==event.target.value){
          checkThongtin.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  //------------------------SELECT HINH ANH---------------------------//
  selectHinhanh(event){
    this.selectFile=<File>event.target.files[0];
  }
  //-----------------CLICK SHOW ADD GIONG---------------//
  clickshowAdd(){
    this.is_add=true;
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
  //-----------------------------------CHANGE AVTIVE---------------------------//
  changeActive(e,id){
    console.log(e.target.checked,id);
    var formData=new FormData();
    formData.append('dv_isactive',e.target.checked);
    this.dongvat.editDongvat(id,formData).subscribe(
      res=>{
        console.log(res);
        if(e.target.checked==true){
          this.is_active=true;
        }
        else{
          this.is_unactive=true;
        }
        this.is_success=true;
        $('#popup').addClass('show-popup');
        setTimeout(function(){
          $('#popup').css('opacity','1');
          $('.popup-success').css('margin-top','4rem');
        },100);
      },
      err=>{
        console.log(err);
      }
    )
  }
  //-----------------------CHANGE BE NGOAN--------------------------------//
  changeBengoan(e,id){
    var formData=new FormData();
    formData.append('dv_bengoan',e.target.checked);
    this.dongvat.editDongvat(id,formData).subscribe(
      res=>{
        if(e.target.checked==true){
          this.is_bengoan=true;
        }
        else{
          this.is_unbengoan=true;
        }
        this.is_success=true;
        $('#popup').addClass('show-popup');
        setTimeout(function(){
          $('#popup').css('opacity','1');
          $('.popup-success').css('margin-top','4rem');
        },100);
      },
      err=>{
        console.log(err);
      }
    )
  }
  //----------------CLICK VIEW DONGVAT DETAILS---------------------//
  clickView(id){
    this.dongvat.dongvatbyId(id).subscribe(
      res=>{
        this.dvbyID=res;
        this.is_details=true;
        this.idEdit=id;
        this.thongtinArr=this.dvbyID.dv_thongtinthem.split(',');
        this.dongvat.getlistChiphi().subscribe(
          res=>{
            this.chiphi=Array.from(Object.keys(res),i=>res[i]);
            this.chiphi=this.chiphi.filter(item=>item.dv_id==id);
          }
        )
      },
      err=>{
        console.log(err);
      }
    )
  }
  //------------------------------EDIT DONG VAT-----------------------------//
  clickEdit(id){
    this.dongvat.dongvatbyId(id).subscribe(
      res=>{
        this.dvbyID=res;
        this.thongtinArr=this.dvbyID.dv_thongtinthem.split(',');
        this.dongvat.getgiongbyLoai(this.dvbyID.giong_id).subscribe(
          res=>{
            this.is_details=false;
            this.giongbyloai=Array.from(Object.keys(res),i=>res[i]);
            this.editdongvatForm.patchValue({
              tendongvat:this.dvbyID.dv_ten,
              cannang:this.dvbyID.dv_cannang,
              dotuoi:this.dvbyID.dv_dotuoi,
              gioitinh:this.dvbyID.dv_gioitinh,
              tiemphong:this.dvbyID.dv_tiemphong,
              ngaytiemphong:formatDate(this.dvbyID.dv_ngaytiemphong,'yyyy-MM-dd', 'en-US'),
              lydoden:this.dvbyID.dv_lydoden,
              ngayden:formatDate(this.dvbyID.dv_ngayden,'yyyy-MM-dd', 'en-US'),
              loai:this.dvbyID.giong_id,
              giong:this.dvbyID.loai_id,
              mau:this.dvbyID.mau_id,
              mota:this.dvbyID.dv_mota,
              active:this.dvbyID.dv_isactive,
              suckhoe:this.dvbyID.ttsk_id
            });
            this.is_edit=true;
          },
          err=>{
            console.log(err);
          }
        )
      },
      err=>{
        console.log(err);
      }
    )
    
  }
  EditDongvat(){
    this.submitEditdongvat=true;
    if(this.editdongvatForm.invalid){
      return;
    }
    var thongtin=this.editdongvatForm.value.thongtinthem;
    console.log(thongtin);
    var mergeThongtin=thongtin.toString();
    var formData=new FormData();
    console.log(this.adddongvatForm.value);
    formData.append('dv_ten',this.editdongvatForm.value.tendongvat);
    formData.append('dv_cannang',this.editdongvatForm.value.cannang);
    formData.append('dv_dotuoi',this.editdongvatForm.value.dotuoi);
    formData.append('dv_gioitinh',this.editdongvatForm.value.gioitinh);
    formData.append('dv_tiemphong',this.editdongvatForm.value.tiemphong);
    formData.append('dv_ngaytiemphong',this.editdongvatForm.value.ngaytiemphong);
    formData.append('dv_lydoden',this.editdongvatForm.value.lydoden);
    formData.append('dv_ngayden',this.editdongvatForm.value.ngayden);
    formData.append('ttsk_id',this.editdongvatForm.value.suckhoe);
    if(this.editdongvatForm.value.active==true){
      formData.append('dv_isactive',this.editdongvatForm.value.active);
    }
    else{
      formData.append('dv_isactive','false');
    }
    formData.append('giong_id',this.editdongvatForm.value.loai);
    formData.append('loai_id',this.editdongvatForm.value.giong);
    formData.append('dv_mota',this.editdongvatForm.value.mota);
    if(this.editdongvatForm.value.hinhanh!=''){
      formData.append('dv_hinhanh',this.selectFile);
    }
    formData.append('mau_id',this.editdongvatForm.value.mau);
    formData.append('dv_thongtinthem',mergeThongtin);
    this.dongvat.editDongvat(this.dvbyID._id,formData).subscribe(
      res=>{
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
  //------------------------DELETE DONG VAT--------------------//
  clickDelete(id){
    this.idDelete=id;
    var popup=$('#popup');
    this.is_confirm=true;
    popup.addClass('show-popup');
    setTimeout(function(){
      popup.css('opacity','1'); 
      $('.confirm').css('margin-top','4rem');     
    },10);
  }
  deleteDongvat(){
    this.dongvat.deleteDongvat(this.idDelete).subscribe(
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
  //------------------CLICK HINH ANH------------------------//
  clickHinhanh(id){
    this.router.navigate(['/admin/manage-hinhanh',id]);
  }
  //-------------------------CLICK ADD TIN TUC---------------------------//
  addTintuc(id){

    var kt=this.dv.filter(item=>item._id==id)[0];
    if(kt.ttch_id!=null&&kt.ttch_id!=''){
      window.location.replace('/tintuc-details/'+kt.ttch_id);
    }
    else{
      window.location.replace('/admin/add-tintuc/'+id);
    }
  }
  clickChiphi(id){
    window.location.replace('/admin/manage-chiphi/'+id);
  }
}
