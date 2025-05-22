const XL_NHAN_VIEN = require("./XL_NHAN_VIEN")
var File = require("fs")
var Thu_muc_Du_lieu="Du_lieu"
class XL_CONG_TY{
    static Doc_Du_lieu(){
        var Du_lieu={}
        Du_lieu.Cong_ty=XL_CONG_TY.Doc_Cong_ty()
        Du_lieu.Danh_sach_Quan_ly_Don_vi=XL_CONG_TY.Doc_Danh_sach_Quan_ly_Don_vi()
        Du_lieu.Danh_sach_Quan_ly_Chi_nhanh=XL_CONG_TY.Doc_Danh_sach_Quan_ly_Chi_nhanh()
        Du_lieu.Danh_sach_Nhan_vien=XL_NHAN_VIEN.Doc_Danh_sach_Nhan_vien()
        return Du_lieu
      }
    static Doc_Cong_ty(){
        var Duong_dan=Thu_muc_Du_lieu +`//Cong_ty/CT_1.json`
        var Chuoi_JSON = File.readFileSync(Duong_dan, "UTF-8")
        var Cong_ty = JSON.parse(Chuoi_JSON) 
        return Cong_ty
      }
    static Doc_Danh_sach_Quan_ly_Don_vi(){
        var Danh_sach = []
        var Thu_muc=Thu_muc_Du_lieu +`//Quan_ly_Don_vi`
        var Danh_sach_Ten = File.readdirSync(
                       Thu_muc, "UTF-8")
        Danh_sach_Ten.forEach(Ten => {
          var La_Ten_Tap_tin_Json =Ten.toUpperCase().endsWith(".JSON")
          if (La_Ten_Tap_tin_Json){
            var Duong_dan=Thu_muc +"//" + Ten
            var Chuoi_JSON = File.readFileSync(Duong_dan, "UTF-8")
            var Quan_ly = JSON.parse(Chuoi_JSON)    
            Danh_sach.push(Quan_ly)
           }  
        })
        return Danh_sach
      }
    static Doc_Danh_sach_Quan_ly_Chi_nhanh(){
        var Danh_sach = []
        var Thu_muc=Thu_muc_Du_lieu +`//Quan_ly_Chi_nhanh`
        var Danh_sach_Ten = File.readdirSync(
                       Thu_muc, "UTF-8")
        Danh_sach_Ten.forEach(Ten => {
          var La_Ten_Tap_tin_Json =Ten.toUpperCase().endsWith(".JSON")
          if (La_Ten_Tap_tin_Json){
            var Duong_dan=Thu_muc +"//" + Ten
            var Chuoi_JSON = File.readFileSync(Duong_dan, "UTF-8")
            var Quan_ly = JSON.parse(Chuoi_JSON)    
            Danh_sach.push(Quan_ly)
           }  
        })
        return Danh_sach
      }
    static Dang_nhap(Doi_tuong_A,Danh_sach){
        var Nguoi_dung=Danh_sach.find(x=>
              x.Ten_Dang_nhap==Doi_tuong_A.Ten_Dang_nhap
              && x.Mat_khau==Doi_tuong_A.Mat_khau)
         return Nguoi_dung
      }
     

  }
  

  module.exports = XL_CONG_TY