import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';
@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.scss']
})
export class TintucComponent implements OnInit {

  constructor(private dongvat:DongvatService,private auth:AuthService) { }
  public tintuc:any=[];
  public danhmuc:any=[];
  public noibat:any=[];
  public recent:any=[];
  event:any=[];
  comming:any=[];
  ngOnInit(): void {
    $('.heading').css('padding-top',$('#topbar').innerHeight()+'px');
    this.getData();
    //------------------------------GET LIST DANH MUC----------------------------//
    this.dongvat.getlistDanhmucTT().subscribe(
      res=>{
        this.danhmuc=Array.from(Object.keys(res),i=>res[i]);
        console.log(this.danhmuc);
      },
      err=>{
        console.log(err);
      }
    );
    this.auth.getlistHoatdong().subscribe(
      res=>{
        this.event=Array.from(Object.keys(res),i=>res[i]);
        this.comming=this.event.sort((val1, val2)=>  new Date(val2.ngaybatdau).getDate() - new Date(val1.ngaybatdau).getDate()).slice(0,3);
      },
      err=>{
        console.log(err);
      }
    )
  }
  async getData(){
    this.tintuc=await this.dongvat.getlistTintuc().toPromise();
    this.noibat=this.tintuc.filter(item=>item.noibat==true)[0];
    this.recent=this.tintuc.sort((val1, val2)=>  new Date(val2.ngaytao).getDate() - new Date(val1.ngaytao).getDate()).slice(0,3);
    console.log(this.recent);
  }
  //-----------------------CLICK DETAILS-------------------------//
  clickDetails(id){
    window.location.replace('/tintuc-details/'+id);
  }
  eventDetails(id){
    window.location.replace('/event-details/'+id);
  }

}
