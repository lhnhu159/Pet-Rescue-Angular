import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
@Component({
  selector: 'app-mntintuc',
  templateUrl: './mntintuc.component.html',
  styleUrls: ['./mntintuc.component.scss']
})
export class MntintucComponent implements OnInit {

  constructor(private dongvat:DongvatService,private fb:FormBuilder) { }
  public tintuc:any=[];
  public danhmuc:any=[];
  is_add=false;
  is_edit=false;
  addtintucForm:FormGroup;
  submitAddtintuc=false;
  edittintucForm:FormGroup;
  submitAdd=false;
  submitEdit=false;
  dv:any=[];
  is_success=false;
  is_confirm=false;
  is_active=false;
  is_unactive=false;
  is_success_add=false;
  is_success_edit=false;
  is_success_delete=false;
  tintucForm:FormGroup;
  selectFile:any=false;
  public Editor=ClassicEditor;
  tintucbyId:any=[];
  idDelete:any;
  ngOnInit(): void {
    //-------------------GET LIST DONG VAT--------------------//
    this.dongvat.getlistDongvat().subscribe(
      res=>{
        this.dv=Array.from(Object.keys(res),i=>res[i])
      },
      err=>{
        console.log(err);
      }
    );
    //--------------------------------GET LIST TIN TUC------------------//
    this.dongvat.getlistTintuc().subscribe(
      res=>{
        this.tintuc=Array.from(Object.keys(res),i=>res[i])
      },
      err=>{
        console.log(err);
      }
    )
    //---------------------------GET LIST DANH MUC TIN TUC---------------//
      this.dongvat.getlistDanhmucTT().subscribe(
        res=>{
          this.danhmuc=Array.from(Object.keys(res),i=>res[i])
        },
        err=>{
          console.log(err);
        }
      )
    //----------------Form add TIN TUC-------------//
    this.tintucForm=this.fb.group({
      tieude:['',[Validators.required]],
      noidung:['',[Validators.required]],
      mota:['',[Validators.required]],
      hinhanh:'',
      danhmuc:''
    });
    //----------------Form EDIT TIN TUC-------------//
    this.edittintucForm=this.fb.group({
      tieude:['',[Validators.required]],
      noidung:['',[Validators.required]],
      mota:['',[Validators.required]],
      hinhanh:'',
      danhmuc:''
    });
  }
  //-------------------------BACKLIST------------------------------//
  BackList(){
    window.location.reload();
  }
  //---------------CLICK SHOW ADD-------------------//
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
  //------------------------CHANGE NOI BAT-------------------------//
  changeActive(event,id){
    var formData=new FormData();
    formData.append('noibat',event.target.checked);
    this.dongvat.editTintuc(id,formData).subscribe(
      res=>{
        console.log(res);
        this.is_success=true;
        if(event.target.checked==true){
          this.is_active=true;
        }
        else{
          this.is_unactive=true;
        }
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
  get formControlAdd(){return this.tintucForm.controls};
  get formControlEdit(){return this.edittintucForm.controls};
  //-------------------SELECT HINH ANH-----------------//
  selectHinhanh(event){
    this.selectFile=<File>event.target.files[0];
  }
  //-----------------ADD TIN TUC---------------------//
  Addtintuc(){
    this.submitAdd=true;
    if(this.tintucForm.invalid){
      return;
    }
    var formData=new FormData();
    formData.append('tieude',this.tintucForm.value.tieude);
    formData.append('noidung',this.tintucForm.value.noidung);
    formData.append('hinhanh',this.selectFile);
    formData.append('mota',this.tintucForm.value.mota);
    formData.append('noibat','false');
    formData.append('danhmuc',this.tintucForm.value.danhmuc);
    this.dongvat.addTintuc(formData).subscribe(
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
        console.log(err);
      }
    )
  }
  //-----------------ON READY----------------//
  onReady(event){
    event.plugins.get('FileRepository').createUploadAdapter = (loader)=> {
      return new UploadAdapter(loader,this.dongvat);
    };
  }
  //---------------------------EDIT TIN TUC---------------------//
  clickeditTintuc(id){
    this.is_edit=true;
    this.tintucbyId=this.tintuc.filter(item=>item._id==id)[0];
    this.edittintucForm.patchValue({
      tieude:this.tintucbyId.tieude,
        mota:this.tintucbyId.mota,
        noidung:this.tintucbyId.noidung,
        danhmuc:this.tintucbyId.danhmuc
    });
  }
  Edittintuc(){
    this.submitEdit=true;
    if(this.edittintucForm.invalid){
      return;
    }
    var formData=new FormData();
    formData.append('tieude',this.edittintucForm.value.tieude);
    formData.append('noidung',this.edittintucForm.value.noidung);
    formData.append('mota',this.edittintucForm.value.mota);
    formData.append('danhmuc',this.edittintucForm.value.danhmuc);
    if(this.selectFile!=false){
      formData.append('hinhanh',this.selectFile);
    }
    this.dongvat.editTintuc(this.tintucbyId._id,formData).subscribe(
      res=>{
        this.is_success=true;
        this.is_success_edit=true;
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
  //-----------------DELETE TIN TUC---------------------//
  clickDeleteTintuc(id){
    this.tintucbyId=this.tintuc.filter(item=>item._id==id)[0];
    var popup=$('#popup');
    this.is_confirm=true;
    popup.addClass('show-popup');
    setTimeout(function(){
      popup.css('opacity','1'); 
      $('.confirm').css('margin-top','4rem');     
    },10);
  }
  deleteTintuc(){
    this.dongvat.deleteTintuc(this.tintucbyId._id).subscribe(
      res=>{
        if(this.tintucbyId.dv_id!=null&&this.tintucbyId.dv_id!=''){
          var formdv=new FormData();
          formdv.append('ttch_id','');
          this.dongvat.editDongvat(this.tintucbyId._id,formdv).toPromise();
        }
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
}
class UploadAdapter {
  public url;
  constructor(private loader,private dongvat:DongvatService){}
  uploadFile(file){
    var formData=new FormData();
    formData.append('url',file);
    var result=this.dongvat.upload(file).toPromise();
    return result;
  }
  upload(){
    let upload=new Promise((resolve,rejects)=>{
      this.loader['file'].then(
        (data)=>{
          var formData=new FormData();
          formData.append('url',data);
          this.dongvat.upload(formData).subscribe(
            res=>{
              resolve({default:res});
            },
            err=>{
              console.log(err);
            }
          )
        }
      );
    });
    return upload;
  }
  abort(){
    console.log("abort");
  }
}
