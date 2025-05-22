const EXPRESS=require("express")
const PORT=1000
const XL_CONG_TY=require("./XL_CONG_TY")
const XL_NHAN_VIEN=require("./XL_NHAN_VIEN")
const Xu_ly=require("./XL_3L_Cach_3")
// const XL_DON_VI=require("./XL_DON_VI")
// const XL_CHI_NHANH=require("./XL_CHI_NHANH")
//===== Khai báo và Cấu hình Dịch vụ ====
const Dich_vu=EXPRESS()
Dich_vu.use("/Media",EXPRESS.static('Media'))
Dich_vu.use(EXPRESS.urlencoded())
Dich_vu.use(EXPRESS.json())
Dich_vu.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin", '*')
   res.setHeader("Access-Control-Allow-Headers", 'origin,Content-Type,Accept')
   next()
 })
// ====== Khai báo biến toàn cục
var Khung_HTML=Xu_ly.Doc_Khung_HTML()
// =========Khai báo  hàm xử lý Biến cố
function XL_Khoi_dong(req,res){
   var Chuoi_HTML=Xu_ly.Tao_Chuoi_HTML_Nhap_lieu_Dang_nhap()
   Chuoi_HTML=Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
   res.send(Chuoi_HTML)
}
function XL_Tao_Loi_chao(req,res){
   var Ho_ten=Xu_ly.Nhap_Ho_ten(req)

   var Loi_chao=Xu_ly.Tao_Loi_chao(Ho_ten)
   
   var Chuoi_HTML=Xu_ly.Tao_Chuoi_HTML_Nhap_lieu_Ho_ten(Ho_ten) 
               + Xu_ly.Tao_Chuoi_HTML_Loi_chao(Loi_chao)
   Chuoi_HTML=Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
   res.send(Chuoi_HTML)
}

//===== Khởi động Dữ liệu ====
var Du_lieu=XL_CONG_TY.Doc_Du_lieu()
var Danh_sach_Nhan_vien=Du_lieu.Danh_sach_Nhan_vien
// var Danh_sach_Quan_ly_Don_vi=Du_lieu.Danh_sach_Quan_ly_Don_vi
// var Danh_sach_Quan_ly_Chi_nhanh=Du_lieu.Danh_sach_Quan_ly_Chi_nhanh

//=================

//===== Dịch vụ của Nhân viên ====
Dich_vu.post("/Nhan_vien/Dang_nhap",(req,res)=>{
   var Doi_tuong_A=req.body
   var Doi_tuong_B={Kq:'NOT_OK'}
   var Nhan_vien= XL_CONG_TY.Dang_nhap(Doi_tuong_A,Danh_sach_Nhan_vien)
   if (Nhan_vien){
      Doi_tuong_B=JSON.parse(JSON.stringify(Nhan_vien))
      Doi_tuong_B.Kq='OK'
      Doi_tuong_B.Dia_chi_Media=`http://localhost:${PORT}/Media`  
      
      var Chuoi_Hinh=`<img src='/Media/${Doi_tuong_B.Ma_so}.png' style='width:60px;height:60px' />   `
      var Chuoi_HTML=Xu_ly.Tao_Loi_chao(Doi_tuong_B.Ho_ten)
      
   }
   else {
      // Nếu sai tài khoản/mật khẩu thì báo lỗi
      var Chuoi_HTML = `
         <h2>Đăng nhập thất bại</h2>
         <p>Tài khoản hoặc mật khẩu không đúng.</p>
         <a href="/">Thử lại</a>
      `;
      
   }
   Chuoi_HTML=Xu_ly.Tao_Chuoi_HTML_Chuoi(Chuoi_HTML)+Chuoi_Hinh
   Chuoi_HTML=Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
   res.send(Chuoi_HTML)
   var Chuoi_JSON=JSON.stringify(Doi_tuong_B)
   res.send(Chuoi_JSON)
})

// //===== Dịch vụ của Quản lý Đơn vị ====
// Dich_vu.post("/Quan_ly_Don_vi/Dang_nhap",(req,res)=>{
//    var Doi_tuong_A=req.body
//    var Doi_tuong_B={Kq:'NOT_OK'}
//    var Quan_ly= XL_CONG_TY.Dang_nhap(Doi_tuong_A,Danh_sach_Quan_ly_Don_vi)
//    if (Quan_ly){
//       Doi_tuong_B=JSON.parse(JSON.stringify(Quan_ly))
//       Doi_tuong_B.Kq='OK'
//       Doi_tuong_B.Dia_chi_Media=`http://localhost:${PORT}/Media`   
//       Doi_tuong_B.Danh_sach_Nhan_vien=Danh_sach_Nhan_vien.filter(x=>
//              x.Don_vi.Ma_so==Quan_ly.Don_vi.Ma_so)
//    }
//    var Chuoi_JSON=JSON.stringify(Doi_tuong_B)
//    res.send(Chuoi_JSON)
// })
// //===== Dịch vụ của Quản lý Chi nhánh ====
// Dich_vu.post("/Quan_ly_Chi_nhanh/Dang_nhap",(req,res)=>{
//    var Doi_tuong_A=req.body
//    var Doi_tuong_B={Kq:'NOT_OK'}
//    var Quan_ly= XL_CONG_TY.Dang_nhap(Doi_tuong_A,Danh_sach_Quan_ly_Chi_nhanh)
//    if (Quan_ly){
//       Doi_tuong_B=JSON.parse(JSON.stringify(Quan_ly))
//       Doi_tuong_B.Kq='OK'
//       Doi_tuong_B.Dia_chi_Media=`http://localhost:${PORT}/Media`   
//       Doi_tuong_B.Danh_sach_Nhan_vien=Danh_sach_Nhan_vien.filter(x=>
//              x.Don_vi.Chi_nhanh.Ma_so==Quan_ly.Chi_nhanh.Ma_so)
//    }
//    var Chuoi_JSON=JSON.stringify(Doi_tuong_B)
//    res.send(Chuoi_JSON)
// })
// Khai báo và khởi động Ứng dụng 
Dich_vu.get("/",XL_Khoi_dong)
// Bắt đầu server 
Dich_vu.listen(PORT)