import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {environment} from '../../../environments/environment';
const url=environment.url;
@Injectable({
  providedIn: 'root'
})
export class DongvatService {
  private messageSource = new BehaviorSubject('0');
  currentMessage = this.messageSource.asObservable();
  constructor(private http:HttpClient) { }
  //----------------------------LOAI------------------------//
  getlistGiong(){
    return this.http.get(url+'giong');
  }
  addGiong(tengiong){
    return this.http.post(url+'giong',{giong_ten:tengiong});
  }
  giongbyID(id){
    return this.http.get(url+'giong/'+id);
  }
  editGiong(id,tengiong){
    return this.http.put(url+'giong/'+id,{giong_ten:tengiong});
  }
  deleteGiong(id){
    return this.http.delete(url+'giong/'+id);
  }
  //-------------------------------MAU SAC------------------------------//
  getlistMausac(){
    return this.http.get(url+'mau');
  }
  addMausac(tenmau){
    return this.http.post(url+'mau',{mau_ten:tenmau});
  }
  mausacbyID(id){
    return this.http.get(url+'mau/'+id);
  }
  editMausac(id,tenmau){
    return this.http.put(url+'mau/'+id,{mau_ten:tenmau});
  }
  deleteMausac(id){
    return this.http.delete(url+'mau/'+id);
  }
  //---------------------------TINH TRANG SUC KHOE-----------------------------//
  getlistSuckhoe(){
    return this.http.get(url+'suckhoe');
  }
  addSuckhoe(tentinhtrang){
    return this.http.post(url+'suckhoe',{ttsk_tentinhtrang:tentinhtrang});
  }
  suckhoebyID(id){
    return this.http.get(url+'suckhoe/'+id);
  }
  editSuckhoe(id,tentinhtrang){
    return this.http.put(url+'suckhoe/'+id,{ttsk_tentinhtrang:tentinhtrang});
  }
  deleteSuckhoe(id){
    return this.http.delete(url+'suckhoe/'+id);
  }
  //---------------------------------LOAI----------------------------------//
  getlistLoai(){
    return this.http.get(url+'loai');
  }
  addLoai(tengiong,loai){
    return this.http.post(url+'loai',{loai_ten:tengiong,giong_id:loai});
  }
  loaibyID(id){
    return this.http.get(url+'loai/'+id);
  }
  editLoai(id,tengiong,loai){
    return this.http.put(url+'loai/'+id,{loai_ten:tengiong,giong_id:loai});
  }
  deleteLoai(id){
    return this.http.delete(url+'loai/'+id);
  }
  getgiongbyLoai(id){
    return this.http.post(url+'giongbyloai',{giong_id:id});
  }
  //-----------------------DONG VAT----------------------------------//
  getlistDongvat(){
    return this.http.get(url+'dongvat');
  }
  addDongvat(data){
    return this.http.post(url+'dongvat',data);
  }
  editDongvat(id,data){
    return this.http.put(url+'dongvat/'+id,data);
  }
  dongvatbyId(id){
    return this.http.get(url+'dongvat/'+id);
  }
  deleteDongvat(id){
    return this.http.delete(url+'dongvat/'+id);
  }
  getlistBengoan(){
    return this.http.get(url+'bengoan');
  }
  //-------------------------------HINH ANH-----------------------------//
  getHinhanh(id){
    return this.http.post(url+'hinhanh/byDongvat',{dv_id:id});
  }
  addHinhanh(data){
    return this.http.post(url+'hinhanh',data);
  }
  deleteHinhanh(id){
    return this.http.delete(url+'hinhanh/'+id);
  }
  findDongvat(data){
    return this.http.post(url+'dongvat/find',data);
  }
  upload(data){
    return this.http.post(url+'upload',data,{responseType: 'text'});
  }
  //-----------------------------------NHAN NUOI-------------------------------//
  addNhannuoi(data){
    return this.http.post(url+'nhannuoi',data);
  }
  getNhannuoi(){
    return this.http.get(url+'nhannuoi');
  }
  editNhannuoi(id,data){
    return this.http.put(url+'nhannuoi/'+id,data);
  }
  getNhannuoibyId(id){
    return this.http.get(url+'nhannuoi/'+id);
  }
  //------------------------------------------TIN TUC-------------------------------------//
  addTintuc(data){
    return this.http.post(url+'tintuc',data);
  }
  getlistTintuc(){
    return this.http.get(url+'tintuc');
  }
  editTintuc(id,data){
    return this.http.put(url+'tintuc/'+id,data);
  }
  deleteTintuc(id){
    return this.http.delete(url+'tintuc/'+id);
  }
  //-------------------------------------------DANH MUC TIN TUC--------------------------------//
  addDanhmucTT(data){
    return this.http.post(url+'danhmuctintuc',data);
  }
  getlistDanhmucTT(){
    return this.http.get(url+'danhmuctintuc');
  }
  editdanhmucTT(id,data){
    return this.http.put(url+'danhmuctintuc/'+id,data);
  }
  deletedanhmucTT(id){
    return this.http.delete(url+'danhmuctintuc/'+id);
  }
  //----------------------------------HINH THUC UNG HO---------------------------------------//
  addHinhthucUh(data){
    var headers = new HttpHeaders().set("Authorization", localStorage.getItem('AccessToken'));
    return this.http.post(url+'hinhthucungho',data,{headers:headers});
  }
  editHinhthucUh(id,data){
    return this.http.put(url+'hinhthucungho/'+id,data);
  }
  getlistHinhthucUh(){
    return this.http.get(url+'hinhthucungho');
  }
  deleteHinhthucUh(id){
    return this.http.delete(url+'hinhthucungho/'+id);
  }
  //-------------------------------PAYMENT STRIPE--------------------------//
  paymentStripe(data){
    return this.http.post(url+'stripe',data);
  }
  //---------------------------------UNG HO----------------------------//
  addUngho(data){
    return this.http.post(url+'ungho',data);
  }
  editUngho(id,data){
    return this.http.put(url+'ungho/'+id,data);
  }
  getlistUngho(){
    return this.http.get(url+'ungho');
  }
  deleteUngho(id){
    return this.http.delete(url+'ungho/'+id);
  }
  //--------------------------DANH MUC SAN PHAM-------------------------//
  createDanhmucSp(data){
    return this.http.post(url+'danhmuc',data);
  }
  editDanhmuc(id,data){
    return this.http.put(url+'danhmuc/'+id,data);
  }
  getlistDanhmuc(){
    return this.http.get(url+'danhmuc');
  }
  deleteDanhmuc(id){
    return this.http.delete(url+'danhmuc/'+id);
  }
  //-------------------------CHU DE BAI DANG----------------------------//
  addChude(data){
    return this.http.post(url+'chude',data);
  }
  editChude(id,data){
    return this.http.put(url+'chude/'+id,data);
  }
  getlistChude(){
    return this.http.get(url+'chude');
  }
  deleteChude(id){
    return this.http.delete(url+'chude/'+id);
  }
  //-----------------------------SAN PHAM----------------------------//
  addSanpham(data){
    return this.http.post(url+'sanpham',data);
  }
  editSanpham(id,data){
    return this.http.put(url+'sanpham/'+id,data);
  }
  getlistSanpham(){
    return this.http.get(url+'sanpham');
  }
  deleteSanpham(id){
    return this.http.delete(url+'sanpham/'+id);
  }
  //--------------------------HINH THUC THANH TOAN-------------------------------//
  addHinhthucTT(data){
    return this.http.post(url+'hinhthucthanhtoan',data);
  }
  getlistHinhthucTT(){
    return this.http.get(url+'hinhthucthanhtoan');
  }
  editHinhthucTT(id,data){
    return this.http.put(url+'hinhthucthanhtoan/'+id,data);
  }
  deleteHinhthucTT(id){
    return this.http.delete(url+'hinhthucthanhtoan/'+id);
  }
  //--------------------------TRANG THAI DON HANG-------------------------------//
  addtrangthaiDH(data){
    return this.http.post(url+'trangthaidonhang',data);
  }
  getlisttrangthaiDH(){
    return this.http.get(url+'trangthaidonhang');
  }
  edittrangthaiDH(id,data){
    return this.http.put(url+'trangthaidonhang/'+id,data);
  }
  deletetrangthaiDH(id){
    return this.http.delete(url+'trangthaidonhang/'+id);
  }
  findSanpham(data){
    return this.http.post(url+'sanpham/find',data);
  }
  //---------------------GET CART-------------------//
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  //---------------------------- CHI PHI --------------------------------//
  getlistChiphi(){
    return this.http.get(url+'chiphi');
  }
  addChiphi(data){
    return this.http.post(url+'chiphi',data);
  }
  editChiphi(id,data){
    return this.http.put(url+'chiphi/'+id,data);
  }
  deleteChiphi(id){
    return this.http.delete(url+'chiphi/'+id);
  }
  
}


