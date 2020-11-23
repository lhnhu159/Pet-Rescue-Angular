import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DongvatService } from 'src/app/service/dongvat/dongvat.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-mndonhang',
  templateUrl: './mndonhang.component.html',
  styleUrls: ['./mndonhang.component.scss']
})
export class MndonhangComponent implements OnInit {

  constructor(private auth: AuthService, private dongvat: DongvatService) { }
  public donhang: any = [];
  is_add = false;
  is_edit = false;
  is_delete = false;
  is_confirm = false;
  is_success = false;
  is_success_change = false;
  is_success_edit = false;
  is_success_delete = false;
  idDelete: any;
  listcart: any = [];
  sanpham: any = [];
  mycart: any = [];
  hinhthuc: any = [];
  trangthai: any[];
  myorder: any = [];
  p: number = 1;
  collection: any[] = this.donhang;
  details = false;
  value: any;
  idOrder: any;
  ngOnInit(): void {
    //--------------------------GET LIST DON HANG-------------------------------//
    this.auth.getlistOrder().subscribe(
      res => {
        this.donhang = Array.from(Object.keys(res), i => res[i]);
      },
      err => {
        console.log(err);
      }
    );
    //-------------------------------------GET LIST CART-------------------------------//
    this.auth.listCart().subscribe(
      res => {
        this.listcart = Array.from(Object.keys(res), i => res[i]);
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
  //-------------------------CLICK DETAILS-----------------------------------//
  clickDetails(id) {
    this.mycart = this.listcart.filter(item => item.dh_id == id);
    this.myorder = this.donhang.filter(item => item._id == id)[0];
    this.details = true;
  }
  //-------------------------CHANGE STATUS--------------------------//
  changeStatus(e, id) {
    this.value = e.target.value;
    this.idOrder = id;
    console.log(this.value);
    console.log(this.idOrder);
    var popup = $('#popup');
    this.is_confirm = true;
    popup.addClass('show-popup');
    setTimeout(function () {
      popup.css('opacity', '1');
      $('.confirm').css('margin-top', '4rem');
    }, 10);
  }
  confirmStatus() {
    var dh = this.donhang.filter(item => item._id == this.idOrder)[0];
    if (dh.token == '' && dh.httt_id == '5f7abefa8b55241f606d0683') {
      window.location.reload();
    }
    if (dh.token != '' && dh.httt_id == '5f7abefa8b55241f606d0683' && dh.ttdh_id == '') {
      if (this.value != '') {
        const money = Number(dh.dh_total) / 23000;
        var formData = new FormData();
        formData.append('token', dh.token);
        formData.append('money', String(money));
        formData.append('mota', 'Thanh toan mua hang');
        this.dongvat.paymentStripe(formData).subscribe(
          res => {
            var formOrder = new FormData();
            formOrder.append('token', '');
            formOrder.append('ttdh_id', this.value);
            this.auth.editOrder(this.idOrder, formOrder).subscribe(
              res => {
                this.is_confirm = false;
                this.is_success = true;
                this.is_success_change = true;
                $('#popup').addClass('show-popup');
                setTimeout(function () {
                  $('#popup').css('opacity', '1');
                  $('.popup-success').css('margin-top', '4rem');
                }, 10);
              },
              err => {
                console.log(err);
              }
            );
          },
          err => {
            console.log(err)
          }
        );
      }
    }
    else {
      if (this.value != '') {
        var form = new FormData();
        form.append('ttdh_id', this.value);
        this.auth.editOrder(this.idOrder, form).subscribe(
          res => {
            this.is_confirm = false;
            this.is_success = true;
            this.is_success_change = true;
            $('#popup').addClass('show-popup');
            setTimeout(function () {
              $('#popup').css('opacity', '1');
              $('.popup-success').css('margin-top', '4rem');
            }, 10);
          },
          err => {
            console.log(err);
          }
        )
      }
    }
  }
}

