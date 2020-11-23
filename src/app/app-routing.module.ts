import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import {AuthGuard} from './auth/auth.guard';
import { MndongvatComponent } from './components/admin/mndongvat/mndongvat.component';
import { MngiongComponent } from './components/admin/mngiong/mngiong.component';
import { MnmausacComponent } from './components/admin/mnmausac/mnmausac.component';
import { MnsuckhoeComponent } from './components/admin/mnsuckhoe/mnsuckhoe.component';
import { MnloaiComponent } from './components/admin/mnloai/mnloai.component';
import { DongvatDetailsComponent } from './components/dongvat-details/dongvat-details.component';
import { MnhinhanhComponent } from './components/admin/mnhinhanh/mnhinhanh.component';
import {DashboardUserComponent} from './components/user/dashboard-user/dashboard-user.component';
import {AdminGuardGuard} from './adminGuard/admin-guard.guard';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { InformationComponent } from './components/user/information/information.component';
import { NhannuoiComponent } from './components/nhannuoi/nhannuoi.component';
import { DangkyNhannuoiComponent } from './components/dangky-nhannuoi/dangky-nhannuoi.component';
import { MnnhannuoiComponent } from './components/admin/mnnhannuoi/mnnhannuoi.component';
import { UserNhannuoiComponent } from './components/user/user-nhannuoi/user-nhannuoi.component';
import { MntintucComponent } from './components/admin/mntintuc/mntintuc.component';
import { AddTintucComponent } from './components/admin/add-tintuc/add-tintuc.component';
import { TintucComponent } from './components/tintuc/tintuc.component';
import { MndanhmuctintucComponent } from './components/admin/mndanhmuctintuc/mndanhmuctintuc.component';
import { TintucDetailsComponent } from './components/tintuc-details/tintuc-details.component';
import { MnhinhthucUnghoComponent } from './components/admin/mnhinhthuc-ungho/mnhinhthuc-ungho.component';
import { MnunghoComponent } from './components/admin/mnungho/mnungho.component';
import { UnghoComponent } from './components/ungho/ungho.component';
import { MndanhmucSanphamComponent } from './components/admin/mndanhmuc-sanpham/mndanhmuc-sanpham.component';
import { MnchudebaidangComponent } from './components/admin/mnchudebaidang/mnchudebaidang.component';
import { MnsanphamComponent } from './components/admin/mnsanpham/mnsanpham.component';
import { MnhinhthucThanhtoanComponent } from './components/admin/mnhinhthuc-thanhtoan/mnhinhthuc-thanhtoan.component';
import { MntrangthaiDonhangComponent } from './components/admin/mntrangthai-donhang/mntrangthai-donhang.component';
import { SanphamComponent } from './components/sanpham/sanpham.component';
import { SanphamDetailsComponent } from './components/sanpham-details/sanpham-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MndonhangComponent } from './components/admin/mndonhang/mndonhang.component';
import { UserOrderComponent } from './components/user/user-order/user-order.component';
import { NhannuoiaoComponent } from './components/nhannuoiao/nhannuoiao.component';
import { ForumComponent } from './components/forum/forum.component';
import { TinhnguyenvienComponent } from './components/tinhnguyenvien/tinhnguyenvien.component';
import { MngroupComponent } from './components/admin/mngroup/mngroup.component';
import { MntinhnguyenvienComponent } from './components/admin/mntinhnguyenvien/mntinhnguyenvien.component';
import { MnhoatdongtinhnguyenComponent } from './components/admin/mnhoatdongtinhnguyen/mnhoatdongtinhnguyen.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { MnchiphiComponent } from './components/admin/mnchiphi/mnchiphi.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    children:[{path:'register',component:RegisterComponent}]
  },
  {
    path:'admin',
    component:AdminComponent,
    canActivate:[AdminGuardGuard],
    children:[
      {
        path:'',
        redirectTo:'manage-dongvat',
        pathMatch:'full'
      },
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
      path:'manage-dongvat',component:MndongvatComponent
    },
    {path:'manage-loai',component:MngiongComponent},
    {path:'manage-mau',component:MnmausacComponent},
    {path:'manage-suckhoe',component:MnsuckhoeComponent},
    {path:'manage-giong',component:MnloaiComponent},
    {path:'manage-hinhanh/:id',component:MnhinhanhComponent},
    {path:'manage-nhannuoi',component:MnnhannuoiComponent},
    {path:'manage-tintuc',component:MntintucComponent},
    {path:'add-tintuc/:id',component:AddTintucComponent},
    {path:'manage-danhmuctintuc',component:MndanhmuctintucComponent},
    {path:'manage-hinhthuc-ungho',component:MnhinhthucUnghoComponent},
    {path:'manage-ungho',component:MnunghoComponent},
    {path:'manage-danhmuc-sanpham',component:MndanhmucSanphamComponent},
    {path:'manage-chude',component:MnchudebaidangComponent},
    {path:'manage-sanpham',component:MnsanphamComponent},
    {path:'manage-hinhthuc-thanhtoan',component:MnhinhthucThanhtoanComponent},
    {path:'manage-trangthai-donhang',component:MntrangthaiDonhangComponent},
    {path:'manage-donhang',component:MndonhangComponent},
    {path:'manage-nhomtinhnguyen',component:MngroupComponent},
    {path:'manage-tinhnguyenvien',component:MntinhnguyenvienComponent},
    {path:'manage-hoatdong',component:MnhoatdongtinhnguyenComponent},
    {path:'manage-chiphi/:id',component:MnchiphiComponent},
  ]
  },
  {
    path:'dongvat-details/:id',
    component:DongvatDetailsComponent
  },
  {
    path:'user-dashboard',
    component:DashboardUserComponent,
    children:[
      {
        path:'information',
        component:InformationComponent
      }
      ,{
      path:'edit-user',
      component:EditUserComponent
    },
    {
      path:'user-nhannuoi',
      component:UserNhannuoiComponent
    },
    {
      path:'user-order',
      component:UserOrderComponent
    }
  ]
  },
  {
    path:'nhannuoi',
    component:NhannuoiComponent
  },
  {
    path:'dangky-nhannuoi/:id',
    component:DangkyNhannuoiComponent,
  },
  {
    path:'tintuc',
    component:TintucComponent
  },
  {
    path:'tintuc-details/:id',
    component:TintucDetailsComponent
  },
  {
    path:'ungho',
    component:UnghoComponent
  },
  {
    path:'sanpham',
    component:SanphamComponent
  },
  {
    path:'sanpham-details/:id',
    component:SanphamDetailsComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  {path:'nhannuoiao',
    component:NhannuoiaoComponent
},
  {
    path:'forum',
    component:ForumComponent
  },
  {
    path:'tinhnguyenvien',
    component:TinhnguyenvienComponent
  },
  {
    path:'event-details/:id',
    component:EventDetailsComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
