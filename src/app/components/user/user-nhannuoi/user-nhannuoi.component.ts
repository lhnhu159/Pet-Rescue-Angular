import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';

@Component({
  selector: 'app-user-nhannuoi',
  templateUrl: './user-nhannuoi.component.html',
  styleUrls: ['./user-nhannuoi.component.scss']
})
export class UserNhannuoiComponent implements OnInit {

  constructor(private dongvat:DongvatService,private auth:AuthService) { }
  public nhannuoi:any=[];
  public user:any=[];
  public dv:any=[];
  public nhannuoibyId:any=[];
  public dvbyId:any=[];
  public mausac:any=[];
  public suckhoe:any=[];
  details=false;
  ngOnInit(): void {
    this.getData();
  }
  async getData(){
    this.user=await this.auth.getUserApi().toPromise();
    this.nhannuoi=await this.dongvat.getNhannuoi().toPromise();
    this.nhannuoi=await this.nhannuoi.filter(item=>item.tk_id==this.user._id);
    this.dv=await this.dongvat.getlistDongvat().toPromise();
    this.suckhoe=await this.dongvat.getlistSuckhoe().toPromise();
    this.mausac=await this.dongvat.getlistMausac().toPromise();
  }
  //--------------------------------CLICK DETAILS-----------------------//
  clickDetail(id,dv){
    this.nhannuoibyId=this.nhannuoi.filter(item=>item._id==id);
    this.dvbyId=this.dv.filter(item=>item._id==dv);
    this.details=true;
  }
  //-----------------------------CLICK BACK-------------------------------//
  clickBack(){
    this.details=false;
  }

}
