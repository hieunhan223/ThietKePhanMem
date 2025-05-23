const EXPRESS=require("express")
const SESSION = require("express-session");
const PORT=1000
const XL_CONG_TY=require("./XL_CONG_TY")
const XL_NHAN_VIEN=require("./XL_NHAN_VIEN")
const XL_KHACH_SAN=require("./XL_KHACH_SAN")
const Xu_ly=require("./XL_3L_Cach_3")
// const XL_DON_VI=require("./XL_DON_VI")
// const XL_CHI_NHANH=require("./XL_CHI_NHANH")
//===== Khai báo và Cấu hình Dịch vụ ====
const Dich_vu=EXPRESS()
Dich_vu.use("/Media",EXPRESS.static('Media'))
Dich_vu.use(EXPRESS.urlencoded())
Dich_vu.use(EXPRESS.json())
Dich_vu.use(
   SESSION({
     secret: "123", // Thay bằng chuỗi bí mật an toàn
     resave: false,
     saveUninitialized: false,
   })
 );
Dich_vu.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin", '*')
   res.setHeader("Access-Control-Allow-Headers", 'origin,Content-Type,Accept')
   next()
 })
// ====== Khai báo biến toàn cục và Khởi động Dữ liệu
var Khung_HTML=Xu_ly.Doc_Khung_HTML()
var Du_lieu=XL_CONG_TY.Doc_Du_lieu()
var Danh_sach_Nhan_vien=Du_lieu.Danh_sach_Nhan_vien
// var Danh_sach_Quan_ly_Don_vi=Du_lieu.Danh_sach_Quan_ly_Don_vi
// var Danh_sach_Quan_ly_Chi_nhanh=Du_lieu.Danh_sach_Quan_ly_Chi_nhanh
// =========Khai báo hàm xử lý Biến cố
function XL_Khoi_dong(req,res){
   var Chuoi_HTML=XL_KHACH_SAN.Tao_Chuoi_HTML_Man_hinh_chinh()
   Chuoi_HTML=Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
   res.send(Chuoi_HTML)
}
function XL_Dang_nhap_GET(req, res) {
   let Chuoi_HTML;
   if (req.session.Nhan_vien) {
     // Nếu đã đăng nhập, hiển thị giao diện tra cứu doanh thu
     const Nhan_vien = req.session.Nhan_vien;
     const Chuoi_Hinh = `<img src='/Media/${Nhan_vien.Ma_so}.png' style='width:60px;height:60px' />`;
     const Loi_chao = Xu_ly.Tao_Loi_chao(Nhan_vien.Ho_ten);
     const Chuoi_Loi_chao = Xu_ly.Tao_Chuoi_HTML_Chuoi(Loi_chao);
     const Chuoi_HTML_Tra_cuu = XL_KHACH_SAN.Tao_Chuoi_HTML_Tra_cuu_Doanh_thu();
     Chuoi_HTML = Chuoi_Hinh + Chuoi_Loi_chao + Chuoi_HTML_Tra_cuu;
   } else {
     // Nếu chưa đăng nhập, hiển thị form đăng nhập
     Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Nhap_lieu_Dang_nhap();
   }
   Chuoi_HTML = Khung_HTML.replace("Chuoi_HTML", Chuoi_HTML);
   res.send(Chuoi_HTML);
 }
 function XL_Dang_nhap_POST(req, res) {
   let Chuoi_HTML;
 
   // Kiểm tra nếu có tham số Thang (tức là tra cứu doanh thu)
   if (req.body.Thang && req.session.Nhan_vien) {
     const Thang = req.body.Thang;
     const Du_lieu = XL_KHACH_SAN.Doc_Du_lieu();
     const { Tong_doanh_thu, Chi_tiet } = XL_KHACH_SAN.Tinh_Doanh_thu_Theo_Thang(
       Thang,
       Du_lieu.Danh_sach_Phong,
       Du_lieu.Danh_sach_Phieu_thue
     );
 
     const Nhan_vien = req.session.Nhan_vien;
     const Chuoi_Hinh = `<img src='/Media/${Nhan_vien.Ma_so}.png' style='width:60px;height:60px' />`;
     const Loi_chao = Xu_ly.Tao_Loi_chao(Nhan_vien.Ho_ten);
     const Chuoi_Loi_chao = Xu_ly.Tao_Chuoi_HTML_Chuoi(Loi_chao);
     const Chuoi_HTML_Tra_cuu = XL_KHACH_SAN.Tao_Chuoi_HTML_Tra_cuu_Doanh_thu();
 
     if (Chi_tiet.length === 0) {
       Chuoi_HTML = `
         ${Chuoi_Hinh}
         ${Chuoi_Loi_chao}
         ${Chuoi_HTML_Tra_cuu}
         <h2>Không có dữ liệu doanh thu cho tháng ${Thang}</h2>
       `;
     } else {
       const Chuoi_Thong_ke = XL_KHACH_SAN.Tao_Chuoi_HTML_Thong_ke(Thang, Tong_doanh_thu, Chi_tiet);
       Chuoi_HTML = `
         ${Chuoi_Hinh}
         ${Chuoi_Loi_chao}
         ${Chuoi_HTML_Tra_cuu}
         ${Chuoi_Thong_ke}
       `;
     }
   } else {
     // Xử lý đăng nhập
     var Doi_tuong_A = req.body;
     var Nhan_vien = XL_CONG_TY.Dang_nhap(Doi_tuong_A, Danh_sach_Nhan_vien);
     if (Nhan_vien) {
       // Lưu thông tin nhân viên vào session
       req.session.Nhan_vien = {
         Ma_so: Nhan_vien.Ma_so,
         Ho_ten: Nhan_vien.Ho_ten,
         Kq: "OK",
         Dia_chi_Media: `http://localhost:${PORT}/Media`
       };
 
       const Chuoi_Hinh = `<img src='/Media/${Nhan_vien.Ma_so}.png' style='width:60px;height:60px' />`;
       const Loi_chao = Xu_ly.Tao_Loi_chao(Nhan_vien.Ho_ten);
       const Chuoi_Loi_chao = Xu_ly.Tao_Chuoi_HTML_Chuoi(Loi_chao);
       const Chuoi_HTML_Tra_cuu = XL_KHACH_SAN.Tao_Chuoi_HTML_Tra_cuu_Doanh_thu();
       Chuoi_HTML = Chuoi_Hinh + Chuoi_Loi_chao + Chuoi_HTML_Tra_cuu;
     } else {
       Chuoi_HTML = `
         <h2>Đăng nhập thất bại</h2>
         <p>Tài khoản hoặc mật khẩu không đúng.</p>
         <a href="/Nhan_vien/Dang_nhap">Thử lại</a>
       `;
     }
   }
 
   Chuoi_HTML = Khung_HTML.replace("Chuoi_HTML", Chuoi_HTML);
   res.send(Chuoi_HTML);
 }
function XL_Thong_ke_Doanh_thu(req, res) {
   const Thang = req.body.Thang;
   const Du_lieu = XL_KHACH_SAN.Doc_Du_lieu();
   const { Tong_doanh_thu, Chi_tiet } = XL_KHACH_SAN.Tinh_Doanh_thu_Theo_Thang(
     Thang,
     Du_lieu.Danh_sach_Phong,
     Du_lieu.Danh_sach_Phieu_thue
   );
 
   let Chuoi_HTML;
   if (Chi_tiet.length === 0) {
     Chuoi_HTML = `
       <h2>Không có dữ liệu doanh thu cho tháng ${Thang}</h2>
       <a href='/Nhan_vien/Dang_nhap'>Quay lại</a>
     `;
   } else {
     Chuoi_HTML = XL_KHACH_SAN.Tao_Chuoi_HTML_Thong_ke(Thang, Tong_doanh_thu, Chi_tiet);
   }
 
   Chuoi_HTML = Khung_HTML.replace("Chuoi_HTML", Chuoi_HTML);
   res.send(Chuoi_HTML);
 }
 function XL_Khach_hang_GET(req, res) {
   let Chuoi_HTML = XL_KHACH_SAN.Tao_Chuoi_HTML_Kiem_tra_Phong_trong();
   Chuoi_HTML = Khung_HTML.replace("Chuoi_HTML", Chuoi_HTML);
   res.send(Chuoi_HTML);
 }
 function XL_Khach_hang_POST(req, res) {
   const { CheckIn, CheckOut } = req.body;
   const Du_lieu = XL_KHACH_SAN.Doc_Du_lieu();
   const { Phong_trong, Loi } = XL_KHACH_SAN.Kiem_tra_Phong_trong(
     CheckIn,
     CheckOut,
     Du_lieu.Danh_sach_Phong,
     Du_lieu.Danh_sach_Phieu_thue
   );
 
   let Chuoi_HTML = XL_KHACH_SAN.Tao_Chuoi_HTML_Kiem_tra_Phong_trong();
   const Chuoi_Ket_qua = XL_KHACH_SAN.Tao_Chuoi_HTML_Danh_sach_Phong_trong(Phong_trong, CheckIn, CheckOut, Loi);
   Chuoi_HTML = `
     ${Chuoi_HTML}
     ${Chuoi_Ket_qua}
   `;
   Chuoi_HTML = Khung_HTML.replace("Chuoi_HTML", Chuoi_HTML);
   res.send(Chuoi_HTML);
 }
 function XL_Trang_chu(req,res){
   req.session.destroy(err => {
      if (err) {
        console.log("Không thể hủy session:", err);
        return res.redirect('/');
      }
      res.redirect('/');
    });
 }

// ========== Giao diện trang chủ ==========
Dich_vu.get("/", XL_Khoi_dong);
Dich_vu.get("/Trang_chu", XL_Trang_chu);
//===== Dịch vụ của Nhân viên ====
Dich_vu.get("/Nhan_vien/Dang_nhap", XL_Dang_nhap_GET);
Dich_vu.post("/Nhan_vien/Dang_nhap", XL_Dang_nhap_POST);
// ===== Dịch vụ của Khách hàng ====
Dich_vu.get("/Khach_hang", XL_Khach_hang_GET);
Dich_vu.post("/Khach_hang", XL_Khach_hang_POST);
// Bắt đầu server 
Dich_vu.listen(PORT)