import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';
import { FooterComponent } from '../homepage/footer/footer.component';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js'
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: 'white',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: 'white'
        }
      }
    }
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  constructor(private dongvat: DongvatService, public auth: AuthService, private Stripeservice: StripeService, private fb: FormBuilder) { }
  cart = [];
  sanpham = [];
  donateForm: FormGroup;
  numCart = 0;
  total = 0;
  donate = false;
  submitDonate = false;
  is_confirm = false;
  is_success_delete = false;
  is_success_order = false;
  is_success = false;
  idDelete: any;
  hinhthuc: any = [];
  checkout=false;
  submitCheckout = false;
  checkoutForm: FormGroup;
  is_Stripe = false;
  step1 = true;
  step2 = false;
  step3 = false;
  ten = '';
  diachi = '';
  sdt = '';
  ghichu = '';
  moneyDonate = '';
  mota = '';
  hinhthucTT: any = [];
  tokenId: any;
  stripeTest: FormGroup;
  submitStripe = false;
  hoanthanh = false;
  tong = 0;
  donhang: any = [];
  is_createToken = false;
  no_item=false;
  user:any=[];
  ngOnInit(): void {
    $('.heading').css('padding-top', $('#topbar').innerHeight() + 'px');
    this.donateForm = this.fb.group({
      sotien: ['', [Validators.required]],
      mota: ''
    });
    this.checkoutForm = this.fb.group({
      ten: ['', [Validators.required]],
      diachi: ['', [Validators.required]],
      sodienthoai: ['', [Validators.required]],
      hinhthuc: ['', [Validators.required]],
      ghichu: ''
    });
    //--------------------STRIPE CARD FORM ------------------------//
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
    });
    this.dongvat.getlistHinhthucTT().subscribe(
      res => {
        this.hinhthuc = Array.from(Object.keys(res), i => res[i]);
      },
      err => {
        console.log(err);
      }
    )
    this.dongvat.getlistSanpham().subscribe(
      res => {
        this.sanpham = Array.from(Object.keys(res), i => res[i]);
      },
      err => {
        console.log(err);
      });
    if (this.auth.isLoggedIn()) {
      this.auth.getlistCart().subscribe(
        res => {
          this.cart = Array.from(Object.keys(res), i => res[i]);
          this.cart = this.cart.filter(item => item.dh_id == null);
          let temp = 0;
          for (let i in this.cart) {
            temp = temp + Number(this.cart[i]['ctdh_thanhtien']);
          }
          this.total = temp;
          if(this.cart.length==0){
            this.no_item=true;
          }
          else{
            this.no_item=false;
          }
        },
        err => {
          console.log(err);
        });
    }
    else {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      let temp = 0;
      for (let i in this.cart) {
        temp = temp + Number(this.cart[i]['thanhtien']);
      }
      this.total = temp;
      if(this.cart==null){
        this.no_item=true;
      }
      else{
        this.no_item=false;
      }
    }

  }
  get formControlDonate() { return this.donateForm.controls };
  get formControlCheckout() { return this.checkoutForm.controls };
  get formControlStripe() { return this.stripeTest.controls };
  changeNumcart(e, id) {
    var sp = this.sanpham.filter(item => item._id == id)[0];
    console.log(e);
  }
  plus(id) {
    if (this.auth.isLoggedIn()) {
      for (let i in this.cart) {
        if (this.cart[i]['_id'] == id) {
          var sp = this.sanpham.filter(item => item._id == this.cart[i]['sp_id'])[0];
          if (this.cart[i]['ctdh_soluong'] < sp.sp_soluong) {
            let dongia = Number(this.cart[i]['ctdh_thanhtien']) / Number(this.cart[i]['ctdh_soluong']);
            this.cart[i]['ctdh_soluong'] = Number(this.cart[i]['ctdh_soluong']) + 1;
            this.cart[i]['ctdh_thanhtien'] = Number(this.cart[i]['ctdh_soluong']) * dongia;
            this.auth.editCart(this.cart[i]['_id'], { ctdh_soluong: this.cart[i]['ctdh_soluong'], ctdh_thanhtien: this.cart[i]['ctdh_thanhtien'] }).toPromise();
          }

        }
      }
      let numb = 0;
      let money = 0;
      for (let i in this.cart) {
        numb = Number(numb) + Number(this.cart[i]['ctdh_soluong']);
        money = money + Number(this.cart[i]['ctdh_thanhtien']);
      }
      this.total = money;
      this.dongvat.changeMessage(numb.toString());
    }
    else {
      for (let i in this.cart) {
        if (this.cart[i]['id'] == id) {
          var sp = this.sanpham.filter(item => item._id == this.cart[i]['id'])[0];
          if (this.cart[i]['soluong'] < sp.sp_soluong) {
            this.cart[i]['soluong'] = Number(this.cart[i]['soluong']) + 1;
            this.cart[i]['thanhtien'] = Number(this.cart[i]['dongia']) * Number(this.cart[i]['soluong']);
            localStorage.setItem('cart', JSON.stringify(this.cart));
          }

        }
      }
      let numb = 0;
      let money = 0;
      for (let i in this.cart) {
        numb = Number(numb) + Number(this.cart[i]['soluong']);
        money = money + Number(this.cart[i]['thanhtien']);
      }
      this.total = money;
      this.dongvat.changeMessage(numb.toString());
    }

  }
  minus(id) {
    if (this.auth.isLoggedIn()) {
      for (let i in this.cart) {
        if (this.cart[i]['_id'] == id) {
          if (this.cart[i]['ctdh_soluong'] > 1) {
            let dongia = Number(this.cart[i]['ctdh_thanhtien']) / Number(this.cart[i]['ctdh_soluong']);
            this.cart[i]['ctdh_soluong'] = Number(this.cart[i]['ctdh_soluong']) - 1;
            this.cart[i]['ctdh_thanhtien'] = Number(this.cart[i]['ctdh_soluong']) * dongia;
            this.auth.editCart(this.cart[i]['_id'], { ctdh_soluong: this.cart[i]['ctdh_soluong'], ctdh_thanhtien: this.cart[i]['ctdh_thanhtien'] }).toPromise();
          }

        }
      }
      let numb = 0;
      let money = 0;
      for (let i in this.cart) {
        numb = Number(numb) + Number(this.cart[i]['ctdh_soluong']);
        money = money + Number(this.cart[i]['ctdh_thanhtien']);
      }
      this.total = money;
      this.dongvat.changeMessage(numb.toString());
    }
    else {
      for (let i in this.cart) {
        if (this.cart[i]['id'] == id) {
          if (this.cart[i]['soluong'] > 1) {
            this.cart[i]['soluong'] = Number(this.cart[i]['soluong']) - 1;
            this.cart[i]['thanhtien'] = Number(this.cart[i]['dongia']) * Number(this.cart[i]['soluong']);
            localStorage.setItem('cart', JSON.stringify(this.cart));
          }

        }
      }
      let numb = 0;
      let money = 0;
      for (let i in this.cart) {
        numb = Number(numb) + Number(this.cart[i]['soluong']);
        money = money + Number(this.cart[i]['thanhtien']);
      }
      this.total = money;
      this.dongvat.changeMessage(numb.toString());
    }

  }
  changeDonate(event) {
    this.donate = event.target.checked;
  }
  clickCheckout() {
    if (this.donate == true) {
      this.submitDonate = true;
      if (this.donateForm.invalid) {
        return;
      }
    }
    if(this.cart.length>0){
      if(this.auth.isLoggedIn()){
        this.checkout=true;
      }
      else{
        window.location.replace('/login');
      }
    }
  }
  clickDelete(id) {
    this.idDelete = id;
    var popup = $('#popup');
    this.is_confirm = true;
    popup.addClass('show-popup');
    setTimeout(function () {
      popup.css('opacity', '1');
      $('.confirm').css('margin-top', '4rem');
    }, 10);
  }
  deleteItem() {
    if (this.auth.isLoggedIn()) {
      this.auth.deleteCart(this.idDelete).subscribe(
        res => {
          this.is_confirm = false;
          this.is_success = true;
          this.is_success_delete = true;
          setTimeout(function () {
            $('.popup-success').css('margin-top', '4rem');
          }, 5);
        },
        err => {
          console.log(err);
        }
      )
    }
    else {
      for (let i in this.cart) {
        if (this.cart[i]['id'] == this.idDelete) {
          this.cart.splice(Number(i), 1);
        }
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.is_confirm = false;
      this.is_success = true;
      this.is_success_delete = true;
      setTimeout(function () {
        $('.popup-success').css('margin-top', '4rem');
      }, 5);
    }
  }
  //--------------------------------POPUP---------------------------------//
  exitPopup() {
    $('#popup').css('opacity', '0');
    $('.popup-content').css('margin-top', '0');
    this.is_confirm = false;
    setTimeout(function () {
      $('#popup').removeClass('show-popup');
    }, 1000);

  }
  okclick() {
    $('#popup').css('opacity', '0');
    $('.popup-content').css('margin-top', '0');
    setTimeout(function () {
      window.location.reload();
    }, 500);
  }
  changeHinhthuc(event) {
    if (event.target.value == '5f7abefa8b55241f606d0683') {
      this.is_Stripe = true;
    }
    else {
      this.is_Stripe = false;
    }
  }
  back(){
    if(this.step1==true){
      this.checkout=false;
    }
    if(this.step2==true){
      this.step2=false;
      this.step1=true;
      $('.step2').removeClass('active');
      $('.step1').addClass('active');
      this.hoanthanh=false;
    }
  }
  next() {
    if (this.step1 == true) {
      this.submitCheckout = true;
      if (this.checkoutForm.invalid) {
        return;
      }
      console.log(this.checkoutForm.value);
      if (this.checkoutForm.value.hinhthuc == '5f7abefa8b55241f606d0683') {
        this.submitStripe = true;
        if (this.stripeTest.invalid) {
          return;
        }
        this.Stripeservice.createToken(this.card.element, { name: this.stripeTest.value.name }).subscribe(
          res => {
            if (res.token.id) {
              this.tokenId = res.token.id;
              console.log(res);
            }
          },
          err => {
            console.log(err);
            return;
          }
        )
      }

      if (this.donate == true) {
        this.tong = Number(this.total) + Number(this.donateForm.value.sotien);
      }
      else {
        this.tong = this.total;
      }
      this.hinhthucTT = this.hinhthuc.filter(item => item._id == this.checkoutForm.value.hinhthuc)[0];
      this.ten = this.checkoutForm.value.ten;
      this.diachi = this.checkoutForm.value.diachi;
      this.sdt = this.checkoutForm.value.sodienthoai;
      this.moneyDonate = this.donateForm.value.sotien;
      this.ghichu = this.checkoutForm.value.ghichu;
      this.mota = this.donateForm.value.mota;
      this.step2 = true;
      this.step1 = false;
      this.hoanthanh = true;
      $('.step1').removeClass('active');
      $('.step2').addClass('active');
      return;
    }
    if (this.step2 == true) {
      this.user=this.auth.getAuthenticateUser().getUsername();
      var formData = new FormData();
      formData.append('dh_total', this.tong.toString());
      formData.append('httt_id', this.hinhthucTT._id);
      formData.append('dh_note', this.ghichu);
      formData.append('ten', this.ten);
      formData.append('diachi', this.diachi);
      formData.append('sodienthoai', this.sdt);
      formData.append('tienhang', this.total.toString());
      formData.append('tk_id',this.user);
      if (this.donate == true) {
        formData.append('ungho', this.moneyDonate);
        formData.append('ungho_mota', this.mota);
      }
      else {
        formData.append('ungho', '');
        formData.append('ungho_mota', '');
      }
      if (this.hinhthucTT._id == '5f7abefa8b55241f606d0683') {
        formData.append('token', this.tokenId);
      }
      else {
        formData.append('token', '');
      }
      this.auth.createOrder(formData).subscribe(
        res => {
          this.donhang = res;
          console.log(res);
          for (let i in this.cart) {
            console.log(this.donhang.donhang._id);
            var sanpham: any = [];
            sanpham = this.sanpham.filter(item => item._id == this.cart[i]['sp_id'])[0];
            let soluong = Number(sanpham.sp_soluong) - Number(this.cart[i]['ctdh_soluong']);
            this.dongvat.editSanpham(sanpham._id, { sp_soluong: soluong }).toPromise();
            var formCart = new FormData();
            formCart.append('dh_id', this.donhang.donhang._id);
            this.auth.editCart(this.cart[i]['_id'], formCart).toPromise();
            this.is_success = true;
            this.is_success_order = true;
            $('#popup').addClass('show-popup');
            setTimeout(function () {
              $('#popup').css('opacity', '1');
              $('.popup-success').css('margin-top', '4rem');
            }, 10);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

}
