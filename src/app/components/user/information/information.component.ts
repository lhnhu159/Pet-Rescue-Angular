import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  constructor(private auth:AuthService) { }
  public user:any=[];
  public payload:any=[];
  public role:any=[];
  ngOnInit(): void {
     //-----------------------GET USER-------------------//
     this.auth.getUserApi().subscribe(
      res=>{
        this.user=res;
        console.log(this.user);
      },
      err=>{
        console.log(err);
      }
    );
    //--------------------GET PAY LOAD---------------------//
    this.auth.getPayload().subscribe(
      res=>{
        this.payload=res;
        if(this.payload["custom:is_admin"]=='true'){
          this.role='ADMIN';
        }
        else{
          this.role='USER';
        }
      },
      err=>{
        console.log(err);
      }
    );
  }
  //----------------------CLICK EDIT---------------------------//
  clickEdit(){
    window.location.replace('/user-dashboard/edit-user');
  }
  //--------------------------------POPUP---------------------------------//
 

}
