import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private auth:AuthService) { }
  //-------------------FORM---------------------------//
  registerForm:FormGroup;
  verifyForm:FormGroup;
  forgotForm:FormGroup;
  newpassForm:FormGroup;
  loginForm:FormGroup;
  //------------------------CONDITION SHOW------------------------//
  is_verify=false;
  is_forgot=false;
  is_newpass=false;
  is_successVerify=false;
  is_successNewpass=false;
  is_resend=false;
  verifyerr=false;
  notmatchpassword=false;
  notmatchnewpass=false;
  is_errNewpass=false;
  is_errLogin=false;
  //-----------------------------SUBMIT FORM------------------------//
  submitRegister=false;
  submitVerify=false;
  submitLogin=false;
  submitForgot=false;
  submitNewpass=false;
  //-------------------------------DATA----------------------------//
  userapi:any;
  err_newpass='';
  err_Login='';
  ngOnInit(): void {
    this.registerForm=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmpassword:['',[Validators.required,Validators.minLength(8)]]
    });
    this.verifyForm=this.fb.group({
      code:['',[Validators.required,Validators.minLength(6)]]
    });
    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
    this.forgotForm=this.fb.group({
      email:['',[Validators.required]]
    });
    this.newpassForm=this.fb.group({
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmpassword:['',[Validators.required]],
      code:['',[Validators.required]]
    })
    console.log(this.auth.isLoggedIn());
  }
  //----------------------------------GET FORM CONTROL-----------------------------//
  get formControlRegister(){return this.registerForm.controls};
  get formControlVerify(){return this.verifyForm.controls};
  get formControlLogin(){return this.loginForm.controls};
  get formControlForgot(){return this.forgotForm.controls};
  get formControlNewpass(){return this.newpassForm.controls};
  //--------------------------------Register---------------------------//
  registerUser(){
    this.submitRegister=true;
    let email=this.registerForm.value.email;
    let firstname=this.registerForm.value.firstname;
    let lastname=this.registerForm.value.lastname;
    let password=this.registerForm.value.password;
    let confirmpw=this.registerForm.value.confirmpassword;
    if(this.registerForm.invalid){
      if(confirmpw!=password){
        this.notmatchpassword=true;
      }
      return;
    }
    else if(confirmpw!=password){
      this.notmatchpassword=true;
      return;
    }
    this.auth.registerApi(firstname,lastname,email).subscribe(
      res=>{
        this.userapi=res;
        this.auth.registerCognito(this.userapi.user._id,email,password,firstname+' '+lastname).subscribe(
          res=>{
            console.log(res);
            this.is_verify=true;
          },
          err=>{
            console.log(err)
          }
        )

      },
      err=>{
        console.log(err)
      }
    )
  }
  //--------------------------------------Verify Code-----------------------------//
  verifyCode(){
    this.submitVerify=true;
    if(this.verifyForm.invalid){
      return;
    }
    var code = this.verifyForm.value.code;
    this.auth.verifyCode(code).subscribe(
      res=>{
        console.log(res);
        this.is_successVerify=true;
        this.is_verify=false;
      },
      err=>{
        console.log(err);
        this.verifyerr=true;
      }
    )
  }
  //-----------------------------------Resend------------------------------//
  resend(){
    this.auth.resend().subscribe(
      res=>{
        console.log(res);
        this.is_resend=true;

      },
      err=>{
        console.log(err);
      }
    )
  }
  //---------------------------------Back Register-----------------------------//
  backRegister(){
    this.is_verify=false;
    this.is_successVerify=false;
    this.registerForm.reset;
  }
  //-------------------------------Login---------------------------------//
  login(){
    this.submitLogin=true;
    var email=this.loginForm.value.email;
    var password=this.loginForm.value.password;
    if(this.loginForm.invalid){
      return;
    }
    this.auth.login(email,password).subscribe(
      res=>{
        this.auth.gettoken().subscribe(
          res=>{
            console.log(res)
          },
          err=>{
            console.log(err);
          }
        );
        this.auth.getPayload().subscribe(
          res=>{
            if(res["custom:is_admin"]=='true'){
              window.location.replace('/admin');
            }
            else{
              window.location.replace('/home');
            }
          },
          err=>{
            console.log(err)
          }
        )

      },
      err=>{
        this.err_Login=err.message;
      }
    )
  }
  //----------------------Event Forgot Password--------------------------//
  haveForgot(){
    this.is_forgot=true;
  }
  //------------------------------SEND REQUEST EMAIL FORGOT PASSWORD-----------------------//
  forgot(){
    this.submitForgot=true;
    var email=this.forgotForm.value.email;
    if(this.forgotForm.invalid){
      return;
    }
    this.auth.forgot(email).subscribe(
      res=>{
        console.log(res);
        this.is_newpass=true;
        this.is_forgot=false;
      },
      err=>{
        console.log(err)
      }
    )
  }
  //---------------------------------NEW PASS - FORGOT PASSWORD----------------------------------//
  newpass(){
    this.submitNewpass=true;
    var password=this.newpassForm.value.password;
    var confirmpassword=this.newpassForm.value.confirmpassword;
    var code=this.newpassForm.value.code;
    var email=this.forgotForm.value.email;
    if(this.newpassForm.invalid){
      if(confirmpassword!=password){
        this.notmatchnewpass=true;
        return;
      }
      return;
    }
    if(confirmpassword!=password){
      this.notmatchnewpass=true;
      return;
    }
    this.auth.confirmPassword(code,password,email).subscribe(
      res=>{
        this.is_successNewpass=true;
        this.is_newpass=false;
        this.is_errNewpass=false;
        this.forgotForm.reset();
        this.newpassForm.reset();
      },
      err=>{
        this.err_newpass=err.message;
        this.is_errNewpass=true;
      }
    )
  }
  //----------------------------------EVENT RETURN LOGIN----------------------------//
  backLogin(){
    this.is_forgot=false;
    this.is_newpass=false;
    this.is_successNewpass=false;
  }

}
