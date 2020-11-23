import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-tinhnguyenvien',
  templateUrl: './tinhnguyenvien.component.html',
  styleUrls: ['./tinhnguyenvien.component.scss']
})
export class TinhnguyenvienComponent implements OnInit {

  constructor(private auth: AuthService, private fb: FormBuilder) { }
  regisForm: FormGroup;
  submitRegis = false;
  group: any = [];
  is_confirm = false;
  is_success = false;
  is_success_add = false;
  danhmuc:any=[];
  p: number = 1;
  collection: any[] = this.danhmuc;
  event:any=[];
  ngOnInit(): void {
    $('.heading').css('padding-top', $('#topbar').innerHeight() + 'px');
    //-----------------------REGIS FORM-----------------------------//
    this.regisForm = this.fb.group({
      ten: ['', [Validators.required]],
      dotuoi: ['', [Validators.required]],
      sodienthoai: ['', [Validators.required]],
      diachi: '',
      kinhnghiem: ['', [Validators.required]],
      group: ['', Validators.required],
    });
    //-------------------------------GET LIST GROUP-------------------------//
    this.auth.getlistGroup().subscribe(
      res => {
        this.group = Array.from(Object.keys(res), i => res[i]);
      },
      err => {
        console.log(err);
      }
    )
    //-------------------------------------GET LIST TNV------------------------//
    this.auth.getlistTnv().subscribe(
      res => {
        this.danhmuc = Array.from(Object.keys(res), i => res[i]);
        this.danhmuc=this.danhmuc.filter(item=>item.duyet==true);
      },
      err => {
        console.log(err);
      }
    );
    //--------------------------------------------GET LIST EVENT----------------------------//
    this.auth.getlistHoatdong().subscribe(
      res=>{
        this.event = Array.from(Object.keys(res), i => res[i]);
        this.event=this.event.sort((val1, val2)=>  new Date(val2.ngaybatdau).getDate() - new Date(val1.ngaybatdau).getDate()).slice(0,3);
      },
      err=>{
        console.log(err);
      }
    )
  }
  get formControlRegis() { return this.regisForm.controls };
  Regis() {
    this.submitRegis = true;
    if (this.regisForm.invalid) {
      return;
    }
    var formData = new FormData();
    formData.append('hoten', this.regisForm.value.ten);
    formData.append('diachi', this.regisForm.value.diachi);
    formData.append('sodienthoai', this.regisForm.value.sodienthoai);
    formData.append('dotuoi', this.regisForm.value.dotuoi);
    formData.append('kinhnghiem', this.regisForm.value.kinhnghiem);
    formData.append('group', this.regisForm.value.group);
    this.auth.addTnv(formData).subscribe(
      res => {
        console.log(res);
        this.is_success = true;
        this.is_success_add = true;
        $('#popup').addClass('show-popup');
        setTimeout(function () {
          $('#popup').css('opacity', '1');
          $('.popup-success').css('margin-top', '4rem');
        }, 100);
      },
      err => {
        console.log(err);
      }
    );
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
  //----------------------------CLICk DETAILS-------------------------//
  clickDetails(id){
    window.location.replace('event-details/'+id);
  }
}
