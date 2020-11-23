import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  constructor(private auth:AuthService,private actRoute:ActivatedRoute) { }
  event:any=[];
  Id:any=[];
  details:any=[];
  comming:any=[];
  ngOnInit(): void {
    $('.heading').css('padding-top',$('#topbar').innerHeight()+'px');
    //--------------------------GET ID DONG VAT-----------------------//
    this.actRoute.params.subscribe(
      params=>{
        this.Id=params.id;
        this.auth.getlistHoatdong().subscribe(
          res=>{
            this.event=Array.from(Object.keys(res),i=>res[i]);
            this.details=this.event.filter(item=>item._id==this.Id)[0];
            this.comming=this.event.sort((val1, val2)=>  new Date(val2.ngaybatdau).getDate() - new Date(val1.ngaybatdau).getDate()).slice(0,3);
            this.comming=this.comming.filter(item=>item._id!=this.Id);
          },
          err=>{
            console.log(err);
          }
        )
      }
    );
  }
  clickDetails(id){
    window.location.replace('/event-details/'+id);
  }

}
