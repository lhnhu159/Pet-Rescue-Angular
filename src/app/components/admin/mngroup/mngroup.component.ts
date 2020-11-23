import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-mngroup',
  templateUrl: './mngroup.component.html',
  styleUrls: ['./mngroup.component.scss']
})
export class MngroupComponent implements OnInit {

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
  ngOnInit(): void {
      //----------------------GET LIST DANH MUC--------------------//
      this.auth.getlistGroup().subscribe(
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
        tendanhmuc:['',[Validators.required]],
      });
      //---------------FORM EDIT DANH MUC-------------//
      this.editForm=this.fb.group({
        tendanhmuc:['',[Validators.required]],
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
    //------------------------CREATE DANH MUC------------------//
    AddDanhmuc(){ 
      this.submitAdd=true;
      if(this.addForm.invalid){
        return;
      }
      var formData=new FormData();
      formData.append('tennhom',this.addForm.value.tendanhmuc);
      this.auth.addGroup(formData).subscribe(
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
      this.editForm.setValue({
        tendanhmuc:this.danhmucbyID.tennhom,
      });
    }
    EditDanhmuc(){
      this.submitEdit=true;
      var id=this.danhmucbyID._id;
      if(this.editForm.invalid){
        return
      }
      var formData=new FormData();
      formData.append('tennhom',this.editForm.value.tendanhmuc);
      this.auth.editGroup(id,formData).subscribe(
        res=>{
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
      this.auth.deleteGroup(this.idDelete).subscribe(
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
