import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { resolve } from 'dns';
import { rejects } from 'assert';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-tintuc',
  templateUrl: './add-tintuc.component.html',
  styleUrls: ['./add-tintuc.component.scss']
})
export class AddTintucComponent implements OnInit {
  constructor(private fb:FormBuilder,private dongvat:DongvatService,private actRoute:ActivatedRoute) { }
  tintucForm:FormGroup;
  submitAdd=false;
  is_success=false;
  selectFile:any;
  id_dongvat:any;
  resTintuc:any;
  public Editor=ClassicEditor;
  ngOnInit(): void {
    //--------------------------GET ID DONG VAT-----------------------//
    this.actRoute.params.subscribe(
      params=>{
        this.id_dongvat=params.id;
      }
    );
    //----------------Form add TIN TUC-------------//
    this.tintucForm=this.fb.group({
      tieude:['',[Validators.required]],
      noidung:['',[Validators.required]],
      mota:['',[Validators.required]],
      hinhanh:'',
    });
    
  }
  get formControlAdd(){return this.tintucForm.controls};
  //-------------------SELECT HINH ANH-----------------//
  selectHinhanh(event){
    this.selectFile=<File>event.target.files[0];
  }
  //-----------------ADD TIN TUC---------------------//
  async Addtintuc(){
    this.submitAdd=true;
    if(this.tintucForm.invalid){
      return;
    }
    var formData=new FormData();
    formData.append('tieude',this.tintucForm.value.tieude);
    formData.append('noidung',this.tintucForm.value.noidung);
    formData.append('dv_id',this.id_dongvat);
    formData.append('hinhanh',this.selectFile);
    formData.append('mota',this.tintucForm.value.mota);
    this.dongvat.addTintuc(formData).subscribe(
      res=>{
        this.resTintuc=res;
        console.log(this.resTintuc);
        var formdv=new FormData();
        formdv.append('ttch_id',this.resTintuc.tintuc._id);
        this.dongvat.editDongvat(this.resTintuc.tintuc.dv_id,formdv).toPromise();
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
  //----------------BACK------------//
  BackList(){
    console.log(true);
  }
  //-----------------ON READY----------------//
  onReady(event){
    event.plugins.get('FileRepository').createUploadAdapter = (loader)=> {
      return new UploadAdapter(loader,this.dongvat);
    };
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