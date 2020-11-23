import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js'
import { AuthService } from 'src/app/service/auth/auth.service';
@Component({
  selector: 'app-ungho',
  templateUrl: './ungho.component.html',
  styleUrls: ['./ungho.component.scss']
})
export class UnghoComponent implements OnInit {
  @ViewChild(StripeCardComponent,{static:true}) card: StripeCardComponent;
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
  constructor(private dongvat: DongvatService, private fb: FormBuilder, private Stripeservice: StripeService, public auth: AuthService) { }
  infoForm: FormGroup;
  stripeTest: FormGroup;
  submitInfo = false;
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  is_Stripe = false;
  submitStripe = false;
  hoten = '';
  diachi = '';
  sodienthoai = '';
  sotien = '';
  mota = '';
  finishbtn = false;
  user: any = [];
  is_finish = false;
  tokenStripe: any;
  has_Stripe=false;
  mtq:any=[];
  hinhthuc:any=[];
  p: number = 1;
  collection: any[] = this.mtq;
  ngOnInit(): void {
    //-------------------JQUERY-------------------//
    if (this.auth.isLoggedIn()) {
      this.auth.getUserApi().subscribe(
        res => {
          this.user = res;
        },
        err => {
          console.log(err);
        }
      )
    }
    $('.heading').css('padding-top', $('#topbar').innerHeight() + 'px');
    //-----------------------INFO FORM-----------------------------//
    this.infoForm = this.fb.group({
      ten: ['', [Validators.required]],
      sodienthoai: ['', [Validators.required]],
      diachi: ['', [Validators.required]],
    });
    //--------------------STRIPE CARD FORM ------------------------//
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      sotien: ['', [Validators.required]],
      mota: ''
    });
    //--------------------------------GET LIST MTQ------------------------//
    this.dongvat.getlistUngho().subscribe(
      res=>{
        this.mtq=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    );
    //-----------------------------GET LIST HINH THUC UNG HO---------------------------//
    this.dongvat.getlistHinhthucUh().subscribe(
      res=>{
        this.hinhthuc=Array.from(Object.keys(res),i=>res[i]);
      },
      err=>{
        console.log(err);
      }
    );
  }
  get formControlInfo() { return this.infoForm.controls };
  get formControlStripe() { return this.stripeTest.controls };
  //--------------------CLICK GET USER------------------------//
  clickGetuser() {
    this.infoForm.patchValue({
      ten: this.user.firstname + ' ' + this.user.lastname,
      sodienthoai: this.user.phone,
      diachi: this.user.diachi
    });
  }
  //--------------------CLICK BACK------------------------//
  clickBack() {
    if(this.step1==true){
      this.is_Stripe=false;
    }
    if (this.step2 == true) {
      this.step2 = false;
      this.step1 = true;
      $('.step2').removeClass('active');
      $('.step1').addClass('active');
    }
    if (this.step3 == true) {
      this.step3 = false;
      this.step2 = true;
      $('.step3').removeClass('active');
      $('.step2').addClass('active');
    }
  }
  //-------------------------CLICK CONFIRM-------------------------//
  clickConfirm() {
    //---------------STEP 1-----------------//
    if (this.step1 == true) {
      this.submitInfo = true;
      if (this.infoForm.invalid) {
        return;
      }
      this.step2 = true;
      this.step1 = false;
      $('.step1').removeClass('active');
      $('.step2').addClass('active');
      return;
    }
    //--------STEP 2------------//
    if (this.step2 == true) {
      this.submitStripe = true;
      if (this.stripeTest.invalid) {
        return;
      }
      const money = this.stripeTest.value.sotien / 23000;
      const name = this.stripeTest.value.name;
      this.Stripeservice.createToken(this.card.element, { name }).subscribe(
        res => {
          if (res.token.id) {
            this.hoten = this.infoForm.value.ten;
            this.diachi = this.infoForm.value.diachi;
            this.sodienthoai = this.infoForm.value.sodienthoai;
            this.sotien = this.stripeTest.value.sotien;
            this.mota = this.stripeTest.value.mota;
            this.step2 = false;
            this.step3 = true;
            this.finishbtn = true;
            this.tokenStripe = res.token.id;
            $('.step2').removeClass('active');
            $('.step3').addClass('active');
            $('donate-confirm').css('display', 'none');
            return;
          }
        },
        err => {
          console.log(err);
        });

    }
    //-----------------STEP 3-------------------------//
    if (this.step3 == true) {
      var formUngho = new FormData();
      formUngho.append('hinhthuc', '5f928f516e3e313624cf80ea');
      formUngho.append('hoten', this.stripeTest.value.name);
      formUngho.append('diachi', this.diachi);
      formUngho.append('sodienthoai', this.sodienthoai);
      if (this.auth.isLoggedIn()) {
        formUngho.append('user_id', this.user._id);
      }
      formUngho.append('sotien', this.sotien);
      formUngho.append('mota', this.mota);
      this.dongvat.addUngho(formUngho).subscribe(
        res => {
          console.log(res);
          const money = this.stripeTest.value.sotien / 23000;
          const name = this.stripeTest.value.name;
          var formData = new FormData();
          formData.append('token', this.tokenStripe);
          formData.append('money', String(money));
          formData.append('mota', this.stripeTest.value.mota);
          this.dongvat.paymentStripe(formData).subscribe(
            res => {
              this.step3 = false;
              this.step4 = true;
              this.is_finish = true;
              $('.step3').removeClass('active');
              $('.step4').addClass('active');
            },
            err => {
              console.log(err)
            }
          );
        },
        err => {
          console.log(err);
        }
      );
    }

  }
  //---------------CLICK STRIPE-----------------//
  clickStripe(){
    this.is_Stripe=true;
  }

}
