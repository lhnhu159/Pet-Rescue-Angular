import { Component, OnInit,Pipe,PipeTransform } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  
})
export class ForumComponent implements OnInit {

  constructor(public auth:AuthService,private dongvat:DongvatService,private fb:FormBuilder) { }
  public Editor=ClassicEditor;
  user:any=[];
  chude:any=[];
  postForm:FormGroup;
  submitPost=false;
  is_confirm=false;
  is_success=false;
  is_success_add=false;
  baidang:any=[];
  listuser:any=[];
  repValue:any;
  traloi:any=[];
  listComment:any=[];
  recent:any=[];
  is_details=false;
  postDetails:any=[];
  ngOnInit(): void {
    $('.heading').css('padding-top',$('#topbar').innerHeight()+'px');
    //$('.post').css('padding-top',$('#topbar').innerHeight()+'px');
    if(this.auth.isLoggedIn()){
      this.auth.getUserApi().subscribe(
        res=>{
          this.user=res;
        },
        err=>{
          console.log(err)
        }
        
      )
    }
    //-------------------GET LIST CHU DE--------------------------//
    this.dongvat.getlistChude().subscribe(
      res=>{
        this.chude=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    );
    //------------------------------FORM POST--------------------//
    this.postForm=this.fb.group({
      title:['',[Validators.required]],
      chude:['',[Validators.required]],
      noidung:['',[Validators.required]],
    });
    //------------------------------GET LIST BAI DANG-------------------------//
    this.auth.getlistBaidang().subscribe(
      res=>{
        this.baidang=Array.from(Object.keys(res),i=>res[i]);
        this.recent=this.baidang.sort((val1, val2)=>  new Date(val2.bd_ngay).getDate() - new Date(val1.bd_ngay).getDate()).slice(0,3);
        console.log(this.recent);
      },
      err=>{
        console.log(err);
      }
    );
    //--------------------------------------GET LIST USER------------------------//
    this.auth.getlistUser().subscribe(
      res=>{
        this.listuser=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    );
    localStorage.removeItem('comment');
    //--------------------------------GET LIST TRA LOI------------------------------//
    this.auth.getlistTraloi().subscribe(
      res=>{
        this.traloi=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    );
  }
  get formControlPost(){return this.postForm.controls};
  showPost(){
    $('.post').addClass('show-post');
    setTimeout(function(){
      $('.post').css('opacity','1');
      $('.post-content').css('margin-top','3rem');
    },5);
  }
  clickCancel(){
    $('.post').css('opacity','0');
    $('.post-content').css('margin-top','-5rem');
    setTimeout(function(){
      $('.post').removeClass('show-post');
    },1000)
    
  }
  //-----------------ON READY----------------//
  onReady(event){
    event.plugins.get('FileRepository').createUploadAdapter = (loader)=> {
      return new UploadAdapter(loader,this.dongvat);
    };
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
    },300);
  }
  //--------------------------POST------------------------//
  post(){
    this.submitPost=true;
    if(this.postForm.invalid){
      return;
    }
    var formData=new FormData();
    formData.append('bd_ten',this.postForm.value.title);
    formData.append('bd_noidung',this.postForm.value.noidung);
    formData.append('cdbd_id',this.postForm.value.chude);
    formData.append('user_id',this.user._id);
    this.auth.addBaidang(formData).subscribe(
      res=>{
        this.is_confirm=false;
        this.is_success=true;
        this.is_success_add=true;
        $('#popup').addClass('show-popup');
        $('.post').css('opacity','0');
        $('.post-content').css('margin-top','-5rem');
        setTimeout(function(){
          $('#popup').css('opacity','1');
          $('.popup-success').css('margin-top','4rem');
          $('.post').removeClass('show-post');
        },500);
      },
      err=>{
        console.log(err);
      }
    );
  }
  //----------------------------------COMMENT-----------------------------------//
  comment(event,id){
    console.log(event.target.value);
    console.log(id);
    var cm=[];
    var is_cm=false;
    if(localStorage.getItem('comment')!=null){
      cm=JSON.parse(localStorage.getItem('comment'));
      for(let i in cm){
        if(cm[i]['id']==id){
          cm[i]['noidung']=event.target.value;
          is_cm=true;
        }
      }
      if(is_cm==true){
        localStorage.setItem('comment',JSON.stringify(cm));
        
      }
      else{
        let data={id:id,noidung:event.target.value};
        cm.push(data);
        localStorage.setItem('comment',JSON.stringify(cm));
        
      }
    }
    else{
      let data={id:id,noidung:event.target.value};
        cm.push(data);
        localStorage.setItem('comment',JSON.stringify(cm));
        
    }
  }
  //------------------------------------ADD COMMENT------------------------//
  AddComment(id){
    var kt:any;
    var rep=[];
    if(localStorage.getItem('comment')!=null){
      rep=JSON.parse(localStorage.getItem('comment'));
      for(let i in rep){
        if(rep[i]['id']==id&&rep[i]['id']!=''){
          kt=rep[i];
        }
      }
      var formData = new FormData();
      formData.append('tl_noidung',kt.noidung);
      formData.append('bd_id',kt.id);
      formData.append('tk_id',this.user._id);
      this.auth.addTraloi(formData).subscribe(
        res=>{
          window.location.reload();
        },
        err=>{
          console.log(err);
        }
      )
    }
  }
  //----------------------------VIEW DETAILS---------------------------------//
  viewDetails(id){
    this.postDetails=this.baidang.filter(item=>item._id==id)[0];
    this.is_details=true;
  }
  //------------------------------CLICK BACK---------------------------//
  back(){
    this.is_details=false;
  }
  //-------------------------------CLICK CATE-------------------------//
  clickCate(id){
    this.auth.getlistBaidang().subscribe(
      res=>{
        this.baidang=Array.from(Object.keys(res),i=>res[i]);
        this.baidang=this.baidang.filter(item=>item.cdbd_id==id);
        console.log(this.baidang);
      },
      err=>{
        console.log(err);
      }
    );
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
@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[],value : string): any[] {  
      if (!items) return [];
      if (!value || value.length == 0) return items;
      return items.filter(item=>item.bd_id==value);
    }
}

