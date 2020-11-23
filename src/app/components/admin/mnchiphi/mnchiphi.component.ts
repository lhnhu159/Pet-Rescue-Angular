import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';

@Component({
  selector: 'app-mnchiphi',
  templateUrl: './mnchiphi.component.html',
  styleUrls: ['./mnchiphi.component.scss']
})
export class MnchiphiComponent implements OnInit {

  constructor(private dongvat:DongvatService,private fb:FormBuilder,private actRoute:ActivatedRoute) { }
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
  id_dongvat:any;
  ngOnInit(): void {
     //--------------------------GET ID DONG VAT-----------------------//
     this.actRoute.params.subscribe(
      params=>{
        this.id_dongvat=params.id;
      }
    );
    //--------------------------GET LIST CHI PHI------------------------//
    this.dongvat.getlistChiphi().subscribe(
      res=>{
        this.danhmuc=Array.from(Object.keys(res),i=>res[i]);
        this.danhmuc=this.danhmuc.filter(item=>item.dv_id==this.id_dongvat);
      },
      err=>{
        console.log(err);
      }
    );
    //----------------Form add DANH MUC-------------//
    this.addForm=this.fb.group({
      sotien:['',[Validators.required]],
      ngay:['',[Validators.required]],
      mota:['',[Validators.required]],
    });
    //---------------FORM EDIT DANH MUC-------------//
    this.editForm=this.fb.group({
      sotien:['',[Validators.required]],
      ngay:['',[Validators.required]],
      mota:['',[Validators.required]],
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
      formData.append('dvcp_sotien',this.addForm.value.sotien);
      formData.append('dvcp_mota',this.addForm.value.mota);
      formData.append('dvcp_ngay',this.addForm.value.ngay);
      formData.append('dv_id',this.id_dongvat);
      this.dongvat.addChiphi(formData).subscribe(
        res=>{
          console.log(res);
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
        sotien:this.danhmucbyID.dvcp_sotien,
        mota:this.danhmucbyID.dvcp_mota,
        ngay:formatDate(this.danhmucbyID.dvcp_ngay,'yyyy-MM-dd', 'en-US')
      });
    }
    EditDanhmuc(){
      this.submitEdit=true;
      var id=this.danhmucbyID._id;
      if(this.editForm.invalid){
        return
      }
      var formData=new FormData();
      formData.append('dvcp_sotien',this.editForm.value.sotien);
      formData.append('dvcp_mota',this.editForm.value.mota);
      formData.append('dvcp_ngay',this.editForm.value.ngay);
      this.dongvat.editChiphi(id,formData).subscribe(
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
      this.dongvat.deleteChiphi(this.idDelete).subscribe(
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
