import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';

@Component({
  selector: 'app-tintuc-details',
  templateUrl: './tintuc-details.component.html',
  styleUrls: ['./tintuc-details.component.scss']
})
export class TintucDetailsComponent implements OnInit {

  constructor(private actRoute:ActivatedRoute,private dongvat:DongvatService) { }
  public tintucNow:any=[];
  public danhmuc:any=[];
  public tintuc:any=[];
  public idTintuc:any;
  public more:any=[];
  ngOnInit(): void {
    $('.heading').css('padding-top',$('#topbar').innerHeight()+'px');
    this.getData();
    
  }
  //-------------------GET DATA-----------------//
  async getData(){
     //--------------------------GET ID DONG VAT-----------------------//
     await this.actRoute.params.subscribe(
      params=>{
        this.idTintuc=params.id;
      }
    );
    await this.dongvat.getlistTintuc().subscribe(
      res=>{
        this.tintuc=Array.from(Object.keys(res),i=>res[i]);
        this.tintucNow=this.tintuc.filter(item=>item._id==this.idTintuc)[0];
        this.more=this.tintuc.filter(item=>item._id!=this.tintucNow._id).slice(0,3);
      },
      err=>{
        console.log(err);
      }
    );
    
    this.dongvat.getlistDanhmucTT().subscribe(
      res=>{
        this.danhmuc=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    );
  }
  //-----------------------DETAILS-------------------//
  clickDetails(id){
    window.location.replace('/tintuc-details/'+id);
  }

}
