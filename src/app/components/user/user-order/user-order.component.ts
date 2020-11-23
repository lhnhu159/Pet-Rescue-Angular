import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss']
})
export class UserOrderComponent implements OnInit {

  constructor(private auth:AuthService,private dongvat:DongvatService) { }
  donhang:any=[];
  listcart:any=[];
  hinhthuc:any=[];
  trangthai:any=[];
  sanpham:any=[];
  myorder:any=[];
  mycart:any=[];
  detail:any=[];
  user:any=[];
  listorder:any=[];
  is_details=false;
  is_confirm=false;
  is_success=false;
  is_success_add=false;
  ngOnInit(): void {
    this.getData();
   //-------------------------------------GET LIST CART-------------------------------//
    this.auth.listCart().subscribe(
      res => {
        this.listcart = Array.from(Object.keys(res), i => res[i]);
        console.log(this.listcart);
      },
      err => {
        console.log(err);
      }
    );
    //-----------------------------GET LIST HINH THUC------------------------//
    this.dongvat.getlistHinhthucTT().subscribe(
      res => {
        this.hinhthuc = Array.from(Object.keys(res), i => res[i]);
      },
      err => {
        console.log(err);
      }
    );
    //--------------------------------GET LIST TRANG THAI--------------------------//
    this.dongvat.getlisttrangthaiDH().subscribe(
      res => {
        this.trangthai = Array.from(Object.keys(res), i => res[i]);
      },
      err => {
        console.log(err);
      }
    );

    //---------------------------------GET LIST SAN PHAM------------------------//
    this.dongvat.getlistSanpham().subscribe(
      res => {
        this.sanpham = Array.from(Object.keys(res), i => res[i]);
      },
      err => {
        console.log(err);
      }
    )
  }
  async getData(){
    this.user=await this.auth.getUserApi().toPromise();
     //--------------------------GET LIST DON HANG-------------------------------//
     await this.auth.getlistOrder().subscribe(
      res => {
        this.donhang = Array.from(Object.keys(res), i => res[i]);
        this.listorder=this.donhang.filter(item=>item.tk_id==this.user._id);
        console.log(this.myorder);
      },
      err => {
        console.log(err);
      }
    );
  }
  viewDetails(id){
    this.myorder=this.donhang.filter(item=>item._id==id)[0];
    this.mycart=this.listcart.filter(item=>item.dh_id==id);
    this.is_details=true;
  }
  back(){
    this.is_details=false;
  }
  huydon(){
    var popup=$('#popup');
    this.is_confirm=true;
    popup.addClass('show-popup');
    setTimeout(function(){
      popup.css('opacity','1'); 
      $('.confirm').css('margin-top','4rem');     
    },10);
  }
  confirmHuydon(){
    var formData=new FormData();
    formData.append('huydon','true');
    formData.append('ttdh_id','5f9779c90a5b742ba8d014c9');
    this.auth.editOrder(this.myorder._id,formData).subscribe(
      res=>{
        this.is_confirm=false;
        this.is_success=true;
        this.is_success_add=true;
        setTimeout(function(){
          $('.popup-success').css('margin-top','4rem');
        },5);
      },
      err=>{
        console.log(err);
      }
    );
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
}
