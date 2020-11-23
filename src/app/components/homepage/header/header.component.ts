import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import * as $ from 'jquery';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  SlideOptions = {
    items: 1, dots: false, nav: true, autoplay: true, autoplayHoverPause: true, animateOut: 'fadeOut',
    navText: ["<div class='nav-btn prev-slide'><i class='fas fa-chevron-left'></i></div>", "<div class='nav-btn next-slide'><i class='fas fa-chevron-right'></i></div>"]
  };

  constructor(private router: Router, public auth: AuthService, private dongvat: DongvatService) { }
  public numcart = 0;
  user:any=[];
  is_admin=false;
  ngOnInit(): void {
    this.is_Admin();
    console.log(this.is_Admin());
    if(this.auth.isLoggedIn()){
      this.auth.getUserApi().subscribe(
        res=>{
          this.user=res;
        },
        err=>{
          console.log(err);
        }
      );
      this.auth.getPayload().subscribe(
        res=>{
          if(res["custom:is_admin"]=='true'){
            this.is_admin=true;
          }
          else  {
            this.is_admin=false;
          }
        },
        err=>{
          console.log(err);
        }
      );
    }
    this.getdata();
    //Jquery
    $(window).on('scroll', function () {
      var scrollDistance = $(window).scrollTop();
      var topbar = $('#topbar');
      if (scrollDistance >= 50) {
        topbar.addClass('sticky');
        $('.account').addClass('show-user');
      }
      else {
        topbar.removeClass('sticky');
        $('.account').removeClass('show-user');
      }
    })
    $('.account').on('mouseover', function () {
      $('.user-dropdown').css('background', 'none');
      $('.user-dropdown').css('color', '#E7A844');
      $('.user-down').css('visibility', 'hidden');
    }).on('mouseout', function () {
      $('.user-dropdown').css('color', 'white');
      $('.user-down').css('visibility', 'visible');
    })
    if (this.auth.isLoggedIn() == true) {
      $('.account').css('display', 'block');
    }
    else {
      $('.account').css('display', 'none');
    }
    //-----------URL-------------//
    if (this.router.url != '/home') {
      $('#header-slider').addClass('hide-slider');
    }
    else {
      $('#header-slider').removeClass('hide-slider');
    }
    if (localStorage.getItem('cart') != null) {

    }
    this.dongvat.currentMessage.subscribe(res => this.numcart = Number(res));
  }
  is_Admin(){
    if(this.auth.isLoggedIn()){
      this.auth.getPayload().subscribe(
        res=>{
          if(res["custom:is_admin"]=='true'){
            return true;
          }
          else  {
            return false;
          }
        },
        err=>{
          console.log(err);
        }
      );
    }
  }
  async getdata() {
    if (!this.auth.isLoggedIn()) {
      if (localStorage.getItem('cart')) {
        var temp = JSON.parse(localStorage.getItem('cart'));
        var num = 0;
        for (let i in temp) {
          num = Number(temp[i]['soluong']) + num;
        }
        await this.dongvat.changeMessage(num.toString());
        await this.dongvat.currentMessage.subscribe(res => this.numcart = Number(res));
      }
    }
    else {
      if (localStorage.getItem('cart') != null) {
        var data = JSON.parse(localStorage.getItem('cart'));
        var getCart = [];
        this.auth.getlistCart().subscribe(
          res => {
            getCart = Array.from(Object.keys(res), i => res[i]);
            
            if (getCart.length != 0) {
              for (let i in data) {
                var kt = getCart.filter(item => item.sp_id == data[i]['id']);
                if (kt.length == 0) {
                  var formData = new FormData();
                  formData.append('sp_id', data[i]['id']);
                  formData.append('tk_id', this.auth.getAuthenticateUser().getUsername());
                  formData.append('ctdh_soluong', data[i]['soluong']);
                  formData.append('ctdh_thanhtien', data[i]['thanhtien']);
                  this.auth.addCart(formData).subscribe(
                    res => {
                      localStorage.removeItem('cart');
                      this.auth.getlistCart().subscribe(
                        res => {
                          var numbCart = Array.from(Object.keys(res), i => res[i]);
                          numbCart=numbCart.filter(item=>item.dh_id==null);
                          let numb = 0;
                          for (let i in numbCart) {
                            numb = Number(numb) + Number(numbCart[i]['ctdh_soluong']);
                          }
                          this.dongvat.changeMessage(numb.toString());
                          this.dongvat.currentMessage.subscribe(res => this.numcart = Number(res));
                        },
                        err => {
                          console.log(err);
                        }
                      );
                    },
                    err => console.log(err)
                  );
                }
                else {
                  let soluong = Number(kt[0].ctdh_soluong) + Number(data[i]['soluong']);
                  this.auth.editCart(kt[0]._id, { ctdh_soluong: soluong }).subscribe(
                    res => {
                      localStorage.removeItem('cart');
                      this.auth.getlistCart().subscribe(
                        res => {
                          var numbCart = Array.from(Object.keys(res), i => res[i]);
                          numbCart=numbCart.filter(item=>item.dh_id==null);
                          let numb = 0;
                          for (let i in numbCart) {
                            numb = Number(numb) + Number(numbCart[i]['ctdh_soluong']);
                          }
                          this.dongvat.changeMessage(numb.toString());
                          this.dongvat.currentMessage.subscribe(res => this.numcart = Number(res));
                        },
                        err => {
                          console.log(err);
                        }
                      );
                    },
                    err => {
                      console.log(err);
                    }
                  );
                }
              }
            }
            else {
              for (let i in data) {
                var formData = new FormData();
                formData.append('sp_id', data[i]['id']);
                formData.append('tk_id', this.auth.getAuthenticateUser().getUsername());
                formData.append('ctdh_soluong', data[i]['soluong']);
                formData.append('ctdh_thanhtien', data[i]['thanhtien']);
                this.auth.addCart(formData).subscribe(
                  res => {
                    this.auth.getlistCart().subscribe(
                      res => {
                        var numbCart = Array.from(Object.keys(res), i => res[i]);
                        numbCart=numbCart.filter(item=>item.dh_id==null);
                        let numb = 0;
                        for (let i in numbCart) {
                          numb = Number(numb) + Number(numbCart[i]['ctdh_soluong']);
                        }
                        this.dongvat.changeMessage(numb.toString());
                        this.dongvat.currentMessage.subscribe(res => this.numcart = Number(res));
                      },
                      err => {
                        console.log(err);
                      }
                    );
                  },
                  err => console.log(err)
                );
              }
              localStorage.removeItem('cart');
            }

          },
          err => { console.log(err) }
        );
      }
      else {
        this.auth.getlistCart().subscribe(
          res => {
            var numbCart = Array.from(Object.keys(res), i => res[i]);
            numbCart=numbCart.filter(item=>item.dh_id==null);
            let numb = 0;
            for (let i in numbCart) {
              numb = Number(numb) + Number(numbCart[i]['ctdh_soluong']);
            }
            this.dongvat.changeMessage(numb.toString());
            this.dongvat.currentMessage.subscribe(res => this.numcart = Number(res));
          },
          err => {
            console.log(err);
          }
        );
      }

    }


  }
  //---------------------------LOGOUT-----------------------//
  logout(){
    this.auth.logout();
    window.location.reload();
  }
  clickAccount(){
    if(this.auth.isLoggedIn()){
      window.location.replace('/user-dashboard/information');
    }
    else{
      window.location.replace('/login');
    }
  }


}
