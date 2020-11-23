import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import {formatDate} from "@angular/common"
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private auth:AuthService,private fb:FormBuilder) { }
  public user:any=[];
  submitEdit=false;
  editForm:FormGroup;
  is_success=false;
  ngOnInit(): void {
    //---------------------FORM EDIT------------------//
    this.editForm=this.fb.group({
      firstname:['',[Validators.required]],
      lastname:['',[Validators.required]],
      ngaysinh:['',[Validators.required]],
      gioitinh:['',[Validators.required]],
      phone:['',[Validators.required]],
      diachi:['',[Validators.required]]
    });
    //-------------------GET USER--------------------//
    this.auth.getUserApi().subscribe(
      res=>{
        this.user=res;
        this.editForm.patchValue({
          firstname:this.user.firstname,
          lastname:this.user.lastname,
          ngaysinh:formatDate(this.user.ngaysinh,'yyyy-MM-dd', 'en-US'),
          gioitinh:this.user.gioitinh,
          phone:this.user.phone,
          diachi:this.user.diachi
        })
      },
      err=>{
        console.log(err);
      }
    );
  }
  get formControlEdit(){return this.editForm.controls};
  //------------------EDIT USER--------------------------//
  editUser(){
    this.submitEdit=true;
    if(this.editForm.invalid){
      return;
    }
    var formData=new FormData();
    formData.append('firstname',this.editForm.value.firstname);
    formData.append('lastname',this.editForm.value.lastname);
    formData.append('gioitinh',this.editForm.value.gioitinh);
    formData.append('ngaysinh',this.editForm.value.ngaysinh);
    formData.append('phone',this.editForm.value.phone);
    formData.append('diachi',this.editForm.value.diachi);
    this.auth.editUser(formData).subscribe(
      res=>{
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
  //-------------------BACK------------------------//
  Back(){
    window.location.replace('/user-dashboard/information');
  }
  //---------------------POP UP-----------------//
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
      window.location.replace('/user-dashboard/information');     
    },500);
  }

}
