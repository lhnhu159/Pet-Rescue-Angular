import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';

@Component({
  selector: 'app-sanpham-details',
  templateUrl: './sanpham-details.component.html',
  styleUrls: ['./sanpham-details.component.scss']
})
export class SanphamDetailsComponent implements OnInit {

  constructor(private dongvat: DongvatService, private actRoute: ActivatedRoute, private auth: AuthService) { }
  id: any;
  sanpham: any = [];
  details: any = [];
  related: any = [];
  numcart = 1;
  err = false;
  cart = [];
  public SlideOptions = {
    items: 3, dots: false, loop: false, nav: true, autoplay: false, autoplayHoverPause: true, animateOut: 'fadeOut',
    navText: ["<div class='nav-btn prev-slide'><i class='fas fa-chevron-left'></i></div>", "<div class='nav-btn next-slide'><i class='fas fa-chevron-right'></i></div>"]
  };
  ngOnInit(): void {
    $('.heading').css('padding-top', $('#topbar').innerHeight() + 'px');
    this.getdata();

  }
  async getdata() {
    await this.actRoute.params.subscribe(
      params => {
        this.id = params.id;
      }
    );
    await this.dongvat.getlistSanpham().subscribe(
      res => {
        this.sanpham = Array.from(Object.keys(res), i => res[i])
        this.details = this.sanpham.filter(item => item._id == this.id)[0];
        this.related = this.sanpham.filter(item => item.dm_id == this.details.dm_id && item._id != this.details._id);
        console.log(this.related);
      },
      err => {
        console.log(err);
      }
    );
  }
  //--------------CLICK DETAILS----------------//
  clickDetails(id) {
    window.location.replace('/sanpham-details/' + id);
  }
  //----------------------------CART------------------------------//
  changNumcart(e) {
    if (e < this.details.soluong) {
      this.numcart = e;
      this.err = false;
    }
    else {
      this.err = true;
      this.numcart = 1;
    }

  }
  plus() {
    if (this.numcart < this.details.sp_soluong) {
      this.numcart = this.numcart + 1;
      this.err = false;
    }
  }
  minus() {
    if (this.numcart > 1) {
      this.numcart = this.numcart - 1;
      this.err = false;
    }
  }
  addtocart() {
    var is_sp = false;
    var thanhtien = Number(this.details.sp_dongia) * this.numcart;
    if (!this.auth.isLoggedIn()) {
      if (localStorage.getItem('cart') != null) {
        this.cart = JSON.parse(localStorage.getItem('cart'));
        for (let i in this.cart) {
          if (this.cart[i]['id'] == this.details._id) {
            this.cart[i]['soluong'] = Number(this.cart[i]['soluong']) + Number(this.numcart);
            this.cart[i]['thanhtien'] = Number(this.cart[i]['soluong']) * Number(this.cart[i]['dongia']);
            is_sp = true;
          }
        }
        if (is_sp == true) {
          localStorage.setItem('cart', JSON.stringify(this.cart));
          let numb = 0;
          for (let i in this.cart) {
            numb = Number(numb) + Number(this.cart[i]['soluong']);
          }
          this.dongvat.changeMessage(numb.toString());
        }
        else {
          let data = { id: this.details._id, soluong: this.numcart, thanhtien: thanhtien, dongia: this.details.sp_dongia, hinhanh: this.details.sp_hinhanh, ten: this.details.sp_ten };
          this.cart.push(data);
          localStorage.setItem('cart', JSON.stringify(this.cart));
          let numb = 0;
          for (let i in this.cart) {
            numb = Number(numb) + Number(this.cart[i]['soluong']);
          }
          this.dongvat.changeMessage(numb.toString());
        }
      }
      else {
        let temp = { id: this.details._id, soluong: this.numcart, thanhtien: thanhtien, dongia: this.details.sp_dongia, hinhanh: this.details.sp_hinhanh, ten: this.details.sp_ten };
        this.cart.push(temp);
        localStorage.setItem('cart', JSON.stringify(this.cart));
          let numb = 0;
          for (let i in this.cart) {
            numb = Number(numb) + Number(this.cart[i]['soluong']);
          }
          this.dongvat.changeMessage(numb.toString());
      }
    }
    else{
      var kq = [];
    var mycart = [];
    this.auth.getlistCart().subscribe(
      res => {
        mycart = Array.from(Object.keys(res), i => res[i]);
        mycart = mycart.filter(item => item.dh_id == null);
        if (mycart.length != 0) {
          kq = mycart.filter(item => item.sp_id == this.details._id);
          if (kq.length != 0) {
            let soluong = Number(kq[0].ctdh_soluong) + Number(this.numcart);
            let thanhtien = Number(soluong) * Number(this.details.sp_dongia);
            this.auth.editCart(kq[0]._id, { ctdh_soluong: soluong, ctdh_thanhtien: thanhtien }).subscribe(
              res => {
                console.log(res);
                this.auth.getlistCart().subscribe(
                  res => {
                    mycart = Array.from(Object.keys(res), i => res[i]);
                    mycart = mycart.filter(item => item.dh_id == null);
                    let numb = 0;
                    for (let i in mycart) {
                      numb = Number(numb) + Number(mycart[i]['ctdh_soluong']);
                    }
                    this.dongvat.changeMessage(numb.toString());
                  },
                  err => console.log(err));
              },
              err => console.log(err));
          }
          else {
            var formData = new FormData();
            formData.append('sp_id', this.details._id);
            formData.append('tk_id', this.auth.getAuthenticateUser().getUsername());
            formData.append('ctdh_soluong', this.numcart.toString());
            let thanhtien = this.numcart * Number(this.details.sp_dongia);
            formData.append('ctdh_thanhtien', thanhtien.toString());
            this.auth.addCart(formData).subscribe(
              res => {
                this.auth.getlistCart().subscribe(
                  res => {
                    mycart = Array.from(Object.keys(res), i => res[i]);
                    mycart = mycart.filter(item => item.dh_id == null);
                    let numb = 0;
                    for (let i in mycart) {
                      numb = Number(numb) + Number(mycart[i]['ctdh_soluong']);
                    }
                    this.dongvat.changeMessage(numb.toString());
                  },
                  err => console.log(err));
              },
              err => console.log(err)
            );
          }
        }
        else {
          var formData = new FormData();
          formData.append('sp_id', this.details._id);
          formData.append('tk_id', this.auth.getAuthenticateUser().getUsername());
          formData.append('ctdh_soluong', this.numcart.toString());
          let thanhtien = this.numcart * Number(this.details.sp_dongia);
          formData.append('ctdh_thanhtien', thanhtien.toString());
          this.auth.addCart(formData).subscribe(
            res => {
              this.auth.getlistCart().subscribe(
                res => {
                  mycart = Array.from(Object.keys(res), i => res[i]);
                  mycart = mycart.filter(item => item.dh_id == null);
                  let numb = 0;
                  for (let i in mycart) {
                    numb = Number(numb) + Number(mycart[i]['ctdh_soluong']);
                  }
                  this.dongvat.changeMessage(numb.toString());
                },
                err => console.log(err));
            },
            err => console.log(err)
          );
        }


      }
    );
    }
    
  }
  /* ---------------------------------CLICK DETAILS --------------------------------------*/
  productDetails(id){
    window.location.replace('/sanpham-details/'+id);
  }
}
