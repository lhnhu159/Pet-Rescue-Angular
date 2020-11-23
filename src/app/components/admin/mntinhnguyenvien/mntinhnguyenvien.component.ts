import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-mntinhnguyenvien',
  templateUrl: './mntinhnguyenvien.component.html',
  styleUrls: ['./mntinhnguyenvien.component.scss']
})
export class MntinhnguyenvienComponent implements OnInit {

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
  is_success_active=false;
  is_success_deactive=false;
  addForm:FormGroup;
  editForm:FormGroup;
  submitAdd=false;
  submitEdit=false;
  danhmucbyID:any;
  idDelete:any;
  group:any=[];
  ngOnInit(): void {
    //-------------------------------GET LIST GROUP-------------------------//
    this.auth.getlistGroup().subscribe(
      res => {
        this.group = Array.from(Object.keys(res), i => res[i]);
      },
      err => {
        console.log(err);
      }
    );
    //---------------FORM ADD TINH NGUYEN VIEN-------------//
    this.addForm=this.fb.group({
      ten:['',[Validators.required]],
      sodienthoai:['',[Validators.required]],
      dotuoi:['',[Validators.required]],
      diachi:'',
      group:['',[Validators.required]],
      kinhnghiem:['',[Validators.required]],
    });
    //---------------FORM EDIT TINH NGUYEN VIEN-------------//
    this.editForm=this.fb.group({
      ten:['',[Validators.required]],
      sodienthoai:['',[Validators.required]],
      dotuoi:['',[Validators.required]],
      diachi:'',
      group:['',[Validators.required]],
      kinhnghiem:['',[Validators.required]],
    });
    //-----------------------------------GET LIST TINH NGUYEN VIEN//
    this.auth.getlistTnv().subscribe(
      res => {
        this.danhmuc = Array.from(Object.keys(res), i => res[i]);
      },
      err => {
        console.log(err);
      }
    );
  }
  get formControlAdd(){return this.addForm.controls};
    get formControlEdit(){return this.editForm.controls};
    //-----------------CLICK SHOW ADD TINH NGUYEN VIEN---------------//
    clickshowAdd(){
      this.is_add=true;
    }
    //---------------CLICK BACK LIST TINH NGUYEN VIEN----------------//
    BackList(){
      window.location.reload();    
    }
    //------------------------CREATE TINH NGUYEN VIEN------------------//
    AddDanhmuc(){ 
      this.submitAdd=true;
      if(this.addForm.invalid){
        return;
      }
      var formData=new FormData();
      formData.append('hoten',this.addForm.value.ten);
      formData.append('diachi',this.addForm.value.diachi);
      formData.append('sodienthoai',this.addForm.value.sodienthoai);
      formData.append('kinhnghiem',this.addForm.value.kinhnghiem);
      formData.append('group',this.addForm.value.group);
      formData.append('dotuoi',this.addForm.value.dotuoi);
      this.auth.addTnv(formData).subscribe(
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
        ten:this.danhmucbyID.hoten,
        diachi:this.danhmucbyID.diachi,
        sodienthoai:this.danhmucbyID.sodienthoai,
        dotuoi:this.danhmucbyID.dotuoi,
        kinhnghiem:this.danhmucbyID.kinhnghiem,
        group:this.danhmucbyID.group,
      });
    }
    EditDanhmuc(){
      this.submitEdit=true;
      var id=this.danhmucbyID._id;
      if(this.editForm.invalid){
        return
      }
      var formData=new FormData();
      formData.append('hoten',this.editForm.value.ten);
      formData.append('diachi',this.editForm.value.diachi);
      formData.append('sodienthoai',this.editForm.value.sodienthoai);
      formData.append('kinhnghiem',this.editForm.value.kinhnghiem);
      formData.append('group',this.editForm.value.group);
      formData.append('dotuoi',this.editForm.value.dotuoi);
      this.auth.editTnv(id,formData).subscribe(
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
    //--------------------------------------DELETE TINH NGUYEN VIEN ID-----------------------//
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
      this.auth.deleteTnv(this.idDelete).subscribe(
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
    //------------------------CHANGE ACTIVE---------------------------//
    changeActive(event,id){
      var checked=event.target.checked;
      var formData=new FormData();
      formData.append('duyet',checked);
      this.auth.editTnv(id,formData).subscribe(
        res=>{
          this.is_success=true;
          if(checked==true){
            this.is_success_active=true;
          }
          else{
            this.is_success_deactive=true;
          }
          $('#popup').addClass('show-popup');
          setTimeout(function(){
            $('#popup').css('opacity','1');
            $('.popup-success').css('margin-top','4rem');
          },100);
        }
      )
    }
}
