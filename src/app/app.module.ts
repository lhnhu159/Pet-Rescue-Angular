import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {OwlModule} from 'ngx-owl-carousel';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {AuthService} from './service/auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin/admin.component';
import {ContentComponent} from './components/homepage/content/content.component';
import {FooterComponent} from './components/homepage/footer/footer.component';
import { TopbarComponent } from './components/homepage/topbar/topbar.component';
import { HeaderComponent } from './components/homepage/header/header.component';
import { MndongvatComponent } from './components/admin/mndongvat/mndongvat.component';
import { MngiongComponent } from './components/admin/mngiong/mngiong.component';
import { MnmausacComponent } from './components/admin/mnmausac/mnmausac.component';
import {DongvatService} from './service/dongvat/dongvat.service';
import { MnsuckhoeComponent } from './components/admin/mnsuckhoe/mnsuckhoe.component';
import { MnloaiComponent } from './components/admin/mnloai/mnloai.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { DongvatDetailsComponent } from './components/dongvat-details/dongvat-details.component';
import { MnhinhanhComponent } from './components/admin/mnhinhanh/mnhinhanh.component';
import { DashboardUserComponent } from './components/user/dashboard-user/dashboard-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { InformationComponent } from './components/user/information/information.component';
import {NhannuoiComponent} from './components/nhannuoi/nhannuoi.component';
import { DangkyNhannuoiComponent } from './components/dangky-nhannuoi/dangky-nhannuoi.component';
import { MnnhannuoiComponent } from './components/admin/mnnhannuoi/mnnhannuoi.component';
import {UserNhannuoiComponent} from './components/user/user-nhannuoi/user-nhannuoi.component';
import { MntintucComponent } from './components/admin/mntintuc/mntintuc.component';
import { AddTintucComponent } from './components/admin/add-tintuc/add-tintuc.component';
import { TintucComponent } from './components/tintuc/tintuc.component';
import { MndanhmuctintucComponent } from './components/admin/mndanhmuctintuc/mndanhmuctintuc.component';
import { TintucDetailsComponent } from './components/tintuc-details/tintuc-details.component';
import { MnhinhthucUnghoComponent } from './components/admin/mnhinhthuc-ungho/mnhinhthuc-ungho.component';
import { MnunghoComponent } from './components/admin/mnungho/mnungho.component';
import { UnghoComponent } from './components/ungho/ungho.component';
import {NgxStripeModule} from 'ngx-stripe';
import { MndanhmucSanphamComponent } from './components/admin/mndanhmuc-sanpham/mndanhmuc-sanpham.component';
import { MnchudebaidangComponent } from './components/admin/mnchudebaidang/mnchudebaidang.component';
import { MnsanphamComponent } from './components/admin/mnsanpham/mnsanpham.component';
import { MndiendanComponent } from './components/admin/mndiendan/mndiendan.component';
import { MnhinhthucThanhtoanComponent } from './components/admin/mnhinhthuc-thanhtoan/mnhinhthuc-thanhtoan.component';
import { MntrangthaiDonhangComponent } from './components/admin/mntrangthai-donhang/mntrangthai-donhang.component';
import { SanphamComponent } from './components/sanpham/sanpham.component';
import { SanphamDetailsComponent } from './components/sanpham-details/sanpham-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminGuardGuard } from './adminGuard/admin-guard.guard';
import { AuthGuard } from './auth/auth.guard';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MndonhangComponent } from './components/admin/mndonhang/mndonhang.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { UserOrderComponent } from './components/user/user-order/user-order.component';
import { NhannuoiaoComponent } from './components/nhannuoiao/nhannuoiao.component';
import { ForumComponent,FilterPipe } from './components/forum/forum.component';
import { TinhnguyenvienComponent } from './components/tinhnguyenvien/tinhnguyenvien.component';
import { MngroupComponent } from './components/admin/mngroup/mngroup.component';
import { MntinhnguyenvienComponent } from './components/admin/mntinhnguyenvien/mntinhnguyenvien.component';
import { MnhoatdongtinhnguyenComponent } from './components/admin/mnhoatdongtinhnguyen/mnhoatdongtinhnguyen.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { MnchiphiComponent } from './components/admin/mnchiphi/mnchiphi.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ContentComponent,
    FooterComponent,
    TopbarComponent,
    HeaderComponent,
    MndongvatComponent,
    MngiongComponent,
    MnmausacComponent,
    MnsuckhoeComponent,
    MnloaiComponent,
    DongvatDetailsComponent,
    MnhinhanhComponent,
    DashboardUserComponent,
    EditUserComponent,
    InformationComponent,
    NhannuoiComponent,
    DangkyNhannuoiComponent,
    MnnhannuoiComponent,
    UserNhannuoiComponent,
    MntintucComponent,
    AddTintucComponent,
    TintucComponent,
    MndanhmuctintucComponent,
    TintucDetailsComponent,
    MnhinhthucUnghoComponent,
    MnunghoComponent,
    UnghoComponent,
    MndanhmucSanphamComponent,
    MnchudebaidangComponent,
    MnsanphamComponent,
    MndiendanComponent,
    MnhinhthucThanhtoanComponent,
    MntrangthaiDonhangComponent,
    SanphamComponent,
    SanphamDetailsComponent,
    CartComponent,
    CheckoutComponent,
    MndonhangComponent,
    UserOrderComponent,
    NhannuoiaoComponent,
    ForumComponent,
    FilterPipe,
    TinhnguyenvienComponent,
    MngroupComponent,
    MntinhnguyenvienComponent,
    MnhoatdongtinhnguyenComponent,
    EventDetailsComponent,
    MnchiphiComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgxStripeModule.forRoot('pk_test_51HHmDmGPGP9AJh1XsYmSbxp9nSrMQrSMrcFKw7zLhgyrPCg6Pj4Dlzt1bVMT3eJb3axpby1j8mTDmgTZZ1tGPQvy00vZbBkR81'),
    NgxPaginationModule,
  ],
  providers: [AuthService,DongvatService,AdminGuardGuard,AuthGuard,JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
