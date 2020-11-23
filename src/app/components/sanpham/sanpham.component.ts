import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.scss']
})
export class SanphamComponent implements OnInit {

  constructor(private dongvat: DongvatService, private auth: AuthService, private router: Router) { }
  public sanpham: any = [];
  public danhmuc: any = [];
  public cart = [];
  ngOnInit(): void {
    $('.heading').css('padding-top', $('#topbar').innerHeight() + 'px');
    //-------------------------GET LIST SAN PHAM--------------------//
    this.dongvat.getlistSanpham().subscribe(
      res => {
        this.sanpham = Array.from(Object.keys(res), i => res[i]);
      },
      err => {
        console.log(err);
      }
    );
    //-----------------------------GET LIST DANH MUC------------------------//
    this.dongvat.getlistDanhmuc().subscribe(
      res => {
        this.danhmuc = Array.from(Object.keys(res), i => res[i]);
      },
      err => {
        console.log(err);
      }
    )
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }


  //------------------------------ADD TO CARD------------------------------//
  addtoCart(id) {
    var sp = this.sanpham.filter(item => item._id == id)[0];
    var is_sp = false;
    if (!this.auth.isLoggedIn()) {
      if (localStorage.getItem('cart') != null) {
        this.cart = JSON.parse(localStorage.getItem('cart'));
        for (let i in this.cart) {
          if (this.cart[i]['id'] == sp._id) {
            this.cart[i]['soluong'] = Number(this.cart[i]['soluong']) + 1;
            this.cart[i]['thanhtien'] = Number(this.cart[i]['soluong']) * Number(this.cart[i]['dongia']);
            is_sp = true;
          }
        }
        if (is_sp == true) {
          localStorage.setItem('cart', JSON.stringify(this.cart));
        }
        else {
          let data = { id: sp._id, soluong: 1, thanhtien: sp.sp_dongia, dongia: sp.sp_dongia, hinhanh: sp.sp_hinhanh, ten: sp.sp_ten };
          this.cart.push(data);
          localStorage.setItem('cart', JSON.stringify(this.cart));
        }
      }
      else {
        var temp = { id: sp._id, soluong: 1, thanhtien: sp.sp_dongia, dongia: sp.sp_dongia, hinhanh: sp.sp_hinhanh, ten: sp.sp_ten };
        this.cart.push(temp);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
      var getdata = JSON.parse(localStorage.getItem('cart'));
      var num = 0;
      for (let i in getdata) {
        num = num + getdata[i]['soluong'];
      }
      this.dongvat.changeMessage(num.toString());
    }
    else {
      var kq = [];
      var mycart = [];
      this.auth.getlistCart().subscribe(
        res => {
          mycart = Array.from(Object.keys(res), i => res[i]);
          mycart=mycart.filter(item=>item.dh_id==null);
          if (mycart.length != 0) {
            kq = mycart.filter(item => item.sp_id == sp._id);
            if (kq.length != 0) {
              let soluong = Number(kq[0].ctdh_soluong) + 1;
              let thanhtien=Number(soluong)*Number(sp.sp_dongia);
              this.auth.editCart(kq[0]._id, { ctdh_soluong: soluong,ctdh_thanhtien:thanhtien }).subscribe(
                res => {
                  console.log(res);
                  this.auth.getlistCart().subscribe(
                    res => {
                      mycart = Array.from(Object.keys(res), i => res[i]);
                      mycart=mycart.filter(item=>item.dh_id==null);
                      let numb = 0;
                      for (let i in mycart) {
                        numb = Number(numb) + Number(mycart[i]['ctdh_soluong']);
                      }
                      this.dongvat.changeMessage(numb.toString());
                    },
                    err=>console.log(err));
                },
                err=>console.log(err));
            }
            else {
              var formData = new FormData();
              formData.append('sp_id', sp._id);
              formData.append('tk_id', this.auth.getAuthenticateUser().getUsername());
              let n=1;
              formData.append('ctdh_soluong', n.toString());
              formData.append('ctdh_thanhtien', sp.sp_dongia);
              this.auth.addCart(formData).subscribe(
                res => {
                  this.auth.getlistCart().subscribe(
                    res => {
                      mycart = Array.from(Object.keys(res), i => res[i]);
                      mycart=mycart.filter(item=>item.dh_id==null);
                      let numb = 0;
                      for (let i in mycart) {
                        numb = Number(numb) + Number(mycart[i]['ctdh_soluong']);
                      }
                      this.dongvat.changeMessage(numb.toString());
                    },
                    err=>console.log(err));
                },
                err => console.log(err)
              );
            }
          }
          else {
            var formData = new FormData();
            formData.append('sp_id', sp._id);
            formData.append('tk_id', this.auth.getAuthenticateUser().getUsername());
            formData.append('ctdh_soluong', '1');
            formData.append('ctdh_thanhtien', sp.sp_dongia);
            this.auth.addCart(formData).subscribe(
              res => {
                this.auth.getlistCart().subscribe(
                  res => {
                    mycart = Array.from(Object.keys(res), i => res[i]);
                    mycart=mycart.filter(item=>item.dh_id==null);
                    let numb = 0;
                    for (let i in mycart) {
                      numb = Number(numb) + Number(mycart[i]['ctdh_soluong']);
                    }
                    this.dongvat.changeMessage(numb.toString());
                  },
                  err=>console.log(err));
              },
              err => console.log(err)
            );
          }


        }
      );
    }



  }
  //--------------------------------DETAILS CLICK---------------------------//
  details(id) {
    window.location.replace('/sanpham-details/' + id);
  }

}
