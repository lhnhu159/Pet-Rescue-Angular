import { Injectable } from '@angular/core';
import {AuthenticationDetails,CognitoUser,CognitoUserPool,CognitoUserAttribute} from 'amazon-cognito-identity-js'
import {observable, Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment'
import { JwtHelperService } from '@auth0/angular-jwt';
const poolData={
  UserPoolId:'us-east-1_uQExmxu5p',
  ClientId:'5rev42cr541jtoii0le5si3pk4'
}
const url=environment.url;
const userPool=new CognitoUserPool(poolData);
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  cognitoUser:any;
  userSession:any;
  accessToken:any;
  constructor(private http:HttpClient,public jwtHelper: JwtHelperService) { }
  //----------------Cognito Register-----------------//
  registerCognito(username,email,password,name){
    const attributeList=[];
    let dataEmail={
      Name:'email',
      Value:email
    };
    let is_admin={
      Name:'custom:is_admin',
      Value:'false'
    };
    let dataname={
      Name:'name',
      Value:name
    }
    const attributeEmail=new CognitoUserAttribute(dataEmail);
    const attributeadmin=new CognitoUserAttribute(is_admin);
    const attributename=new CognitoUserAttribute(dataname);
    attributeList.push(attributeadmin);
    attributeList.push(attributeEmail);
    attributeList.push(attributename);
    return Observable.create(observer=>{
      userPool.signUp(username,password,attributeList,null,(err,result)=>{
        if(err){
          observer.error(err);
          return;
        }
        this.cognitoUser=result.user;
        observer.next(result);
        observer.complete();
      });
    });

  }
  //---------------------Get Id User API-----------------------//
  registerApi(firstname,lastname,email){
    return this.http.post(environment.url+'register',{firstname:firstname,lastname:lastname,email:email});
  }
  //---------------------------Verify Code------------------------//
  verifyCode(code){
    const user={
      Username:this.cognitoUser.username,
      Pool:userPool
    };
    return Observable.create(observer=>{
      const cognitoUser=new CognitoUser(user);
      cognitoUser.confirmRegistration(code,true,(err,result)=>{
        if(err){
          observer.error(err);
          return;
        }
        observer.next(result);
        observer.complete();
      })
    })
  }
  //------------------------------------RESEND------------------------------//
  resend(){
    const user={
      Username:this.cognitoUser.username,
      Pool:userPool
    }
    return Observable.create(observer=>{
      const cognitouser=new CognitoUser(user);
      cognitouser.resendConfirmationCode(function(err,result){
        if(err){
          observer.error(err);
          return;
        }
        observer.next(result);
        observer.complete();
      })
    })
  };
  //------------------------------------Login-------------------------------------//
  login(email,password){
    const authenticationData={
      Username:email,
      Password:password
    };
    const authenticationDetails=new AuthenticationDetails(authenticationData);
    const userData={
      Username:email,
      Pool:userPool
    };
    const cognitoUser=new CognitoUser(userData);
    return Observable.create(observer=>{
      cognitoUser.authenticateUser(authenticationDetails,{
        onSuccess:function(result){
          var idToken=result.getIdToken().getJwtToken();
          var name=result.getIdToken().payload.name;
          this.accessToken=result.getAccessToken().getJwtToken();
          localStorage.setItem('AccessToken',result.getAccessToken().getJwtToken());
          localStorage.setItem('name',name);
          observer.next(result);
          observer.complete();
        },
        onFailure:function(err){
          observer.error(err);
        }
      })
    })
  }
  //-----------------------------Forgot Password-----------------------------//
  forgot(email){
    const user={
      Username:email,
      Pool:userPool
    };
    return Observable.create(observer=>{
      const cognitouser=new CognitoUser(user);
      cognitouser.forgotPassword({
        onSuccess:function(data){
          observer.next(data);
          observer.complete();
        },
        onFailure:function(err){
          observer.error(err);
        }
      })
    })
  }
  //------------------------------------CONFIRM PASSWORD-------------------------//
  confirmPassword(code,password,email){
    const user={
      Username:email,
      Pool:userPool
    };
    return Observable.create(observer=>{
      const cognitouser=new CognitoUser(user);
      cognitouser.confirmPassword(code,password,{
        onSuccess(){
          observer.next();
          observer.complete();
        },
        onFailure(err){
          observer.error(err);
        }
      })
    })
  }
  //-------------------------------- Get user ----------------------------//
  getAuthenticateUser(){
    return userPool.getCurrentUser();
  }
  //-------------------------------------IS LOGGED IN-----------------------------//
  isLoggedIn(){
    if(userPool.getCurrentUser()!=null){
      const token=localStorage.getItem('AccessToken');
      if(!this.jwtHelper.isTokenExpired(token)){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
    

    return userPool.getCurrentUser()!=null;
  }
  //------------------------------------------LOG OUT -----------------------------//
  logout(){
    this.getAuthenticateUser().signOut();
    localStorage.removeItem('idToken');
    localStorage.removeItem('name');
    localStorage.clear();
  }
  //------------------------------------------GET TOKEN-----------------------------//
  gettoken(){
    return Observable.create(observer=>{
      this.getAuthenticateUser().getSession((err,session)=>{
        if(err){
          observer.error(err);
        }
        observer.next(session.getAccessToken().getJwtToken());
        observer.complete();
      })
    })
  }
  //-----------------------------------------GET PAYLOAD---------------------------//
  getPayload(){
    return Observable.create(observer=>{
      this.getAuthenticateUser().getSession((err,session)=>{
        if(err){
          observer.error(err);
        }
        observer.next(session.getIdToken().payload);
        observer.complete();
      })
    })
  }
  //------------------------------------GET USER API----------------------------------//
  getUserApi(){
    var headers = new HttpHeaders().set("Authorization", localStorage.getItem('AccessToken'));
    return this.http.get(url+'get-user/'+this.getAuthenticateUser().getUsername(),{headers:headers});
  }
  //----------------------------EDIT USER------------------------------------//
  editUser(data){
    var headers = new HttpHeaders().set("Authorization", localStorage.getItem('AccessToken'));
    return this.http.put(url+'edit-user/'+this.getAuthenticateUser().getUsername(),data,{headers:headers});
  }
  //---------------------------------GET LIST USER----------------------------------//
  getlistUser(){
    return this.http.get(url+'list-user');
  }
  //----------------------------------------------GET USER BY ID----------------------------//
  getUserbyId(id){
    var headers = new HttpHeaders().set("Authorization", localStorage.getItem('AccessToken'));
    return this.http.get(url+'get-user/'+id,{headers:headers});
  }
  //----------------------------------GET CART--------------------------------------//
  getlistCart(){
    return this.http.post(url+'giohang/byUser',{tk_id:this.getAuthenticateUser().getUsername()});
  }
  listCart(){
    return this.http.get(url+'giohang');
  }
  addCart(data){
    return this.http.post(url+'giohang',data);
  }
  editCart(id,data){
    return this.http.put(url+'giohang/'+id,data);
  }
  deleteCart(id){
    return this.http.delete(url+'giohang/'+id);
  }
  //-----------------------------------ORDER--------------------------------//
  createOrder(data){
    return this.http.post(url+'donhang',data);
  }
  editOrder(id,data){
    return this.http.put(url+'donhang/'+id,data);
  }
  getlistOrder(){
    return this.http.get(url+'donhang');
  }
  findOrder(data){
    return this.http.post(url+'donhang',data);
  }
  //-----------------------------------------BAI DANG---------------------------//
  getlistBaidang(){
    return this.http.get(url+'baidang');
  }
  findBaidang(data){
    return this.http.post(url+'baidang/find',data);
  }
  editBaidang(id,data){
    return this.http.put(url+'baidang/'+id,data);
  }
  addBaidang(data){
    return this.http.post(url+'baidang',data);
  }
  //----------------------------------TRA LOI-----------------------------------//
  getlistTraloi(){
    return this.http.get(url+'traloi');
  }
  addTraloi(data){
    return this.http.post(url+'traloi',data);
  }
  //------------------------------------TNV-------------------------------------//
  getlistTnv(){
    return this.http.get(url+'tinhnguyenvien');
  }
  addTnv(data){
    return this.http.post(url+'tinhnguyenvien',data);
  }
  editTnv(id,data){
    return this.http.put(url+'tinhnguyenvien/'+id,data);
  }
  deleteTnv(id){
    return this.http.delete(url+'tinhnguyenvien/'+id);
  }
  //-----------------------------------------NHOM TINH NGUYEN-----------------------//
  getlistGroup(){
    return this.http.get(url+'nhomtinhnguyen');
  }
  addGroup(data){
    return this.http.post(url+'nhomtinhnguyen',data);
  }
  editGroup(id,data){
    return this.http.put(url+'nhomtinhnguyen/'+id,data);
  }
  deleteGroup(id){
    return this.http.delete(url+'nhomtinhnguyen/'+id);
  }
  //---------------------------------------------HOAT DONG TINH NGUYEN------------------------------//
  getlistHoatdong(){
    return this.http.get(url+'hoatdong');
  }
  addHoatdong(data){
    return this.http.post(url+'hoatdong',data);
  }
  editHoatdong(id,data){
    return this.http.put(url+'hoatdong/'+id,data);
  }
  deleteHoatdong(id){
    return this.http.delete(url+'hoatdong/'+id);
  }
}
