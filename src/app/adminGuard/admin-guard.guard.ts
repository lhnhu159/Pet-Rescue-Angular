import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  public payload:any;
  constructor(private auth:AuthService,private router:Router){}
  canActivate():boolean{
    this.auth.getPayload().subscribe(res=>{
      this.payload=res["custom:is_admin"];
    },
    err=>console.log(err))
    if(this.auth.isLoggedIn()&&this.payload=='true'){
      return true;
    }
    else{
      this.router.navigate(['login']);
      this.auth.logout();
      return false;
    }
  }
  
}
