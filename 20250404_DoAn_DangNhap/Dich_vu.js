const EXPRESS=require("express")
const PORT=1000
const XL_CONG_TY=require("./XL_CONG_TY")
const XL_NHAN_VIEN=require("./XL_NHAN_VIEN")
const XL_DON_VI=require("./XL_DON_VI")
const XL_CHI_NHANH=require("./XL_CHI_NHANH")
//===== Khai báo và Cấu hình Dịch vụ ====
const Dich_vu=EXPRESS()
Dich_vu.use("/Media",EXPRESS.static('Media'))
Dich_vu.use(EXPRESS.json())
Dich_vu.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin", '*')
   res.setHeader("Access-Control-Allow-Headers", 'origin,Content-Type,Accept')
   next()
 })
//===== Khai báo và Cấu hình Dịch vụ ====

//===== Khởi động Dữ liệu ====
var Du_lieu=XL_CONG_TY.Doc_Du_lieu()
var Danh_sach_Nhan_vien=Du_lieu.Danh_sach_Nhan_vien
var Danh_sach_Quan_ly_Don_vi=Du_lieu.Danh_sach_Quan_ly_Don_vi
var Danh_sach_Quan_ly_Chi_nhanh=Du_lieu.Danh_sach_Quan_ly_Chi_nhanh

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
   }
   var Chuoi_JSON=JSON.stringify(Doi_tuong_B)
   res.send(Chuoi_JSON)
})

//===== Dịch vụ của Quản lý Đơn vị ====
Dich_vu.post("/Quan_ly_Don_vi/Dang_nhap",(req,res)=>{
   var Doi_tuong_A=req.body
   var Doi_tuong_B={Kq:'NOT_OK'}
   var Quan_ly= XL_CONG_TY.Dang_nhap(Doi_tuong_A,Danh_sach_Quan_ly_Don_vi)
   if (Quan_ly){
      Doi_tuong_B=JSON.parse(JSON.stringify(Quan_ly))
      Doi_tuong_B.Kq='OK'
      Doi_tuong_B.Dia_chi_Media=`http://localhost:${PORT}/Media`   
      Doi_tuong_B.Danh_sach_Nhan_vien=Danh_sach_Nhan_vien.filter(x=>
             x.Don_vi.Ma_so==Quan_ly.Don_vi.Ma_so)
   }
   var Chuoi_JSON=JSON.stringify(Doi_tuong_B)
   res.send(Chuoi_JSON)
})
//===== Dịch vụ của Quản lý Chi nhánh ====
Dich_vu.post("/Quan_ly_Chi_nhanh/Dang_nhap",(req,res)=>{
   var Doi_tuong_A=req.body
   var Doi_tuong_B={Kq:'NOT_OK'}
   var Quan_ly= XL_CONG_TY.Dang_nhap(Doi_tuong_A,Danh_sach_Quan_ly_Chi_nhanh)
   if (Quan_ly){
      Doi_tuong_B=JSON.parse(JSON.stringify(Quan_ly))
      Doi_tuong_B.Kq='OK'
      Doi_tuong_B.Dia_chi_Media=`http://localhost:${PORT}/Media`   
      Doi_tuong_B.Danh_sach_Nhan_vien=Danh_sach_Nhan_vien.filter(x=>
             x.Don_vi.Chi_nhanh.Ma_so==Quan_ly.Chi_nhanh.Ma_so)
   }
   var Chuoi_JSON=JSON.stringify(Doi_tuong_B)
   res.send(Chuoi_JSON)
})

// Route mặc định để kiểm tra server
Dich_vu.get("/", (req, res) => {
   res.send("Server is running. Use POST /Nhan_vien/Dang_nhap etc.")
})
// Bắt đầu server 
Dich_vu.listen(PORT)