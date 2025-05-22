//Khai bao va su dung thu vien ham
const PATH = require("path")
const EXPRESS = require("express")
const XL_NHAN_VIEN =require("./XL_NHAN_VIEN")

//Khai bao va khoi dong ung dung
var Ung_dung = EXPRESS()
Ung_dung.use("/Media", EXPRESS.static(PATH.join(__dirname, "Media")))
Ung_dung.use(EXPRESS.urlencoded())
Ung_dung.listen(3000, () => {
    console.log("Server đang chạy tại http://localhost:3000")
})

Ung_dung.get("/",XL_Khoi_dong)
Ung_dung.post("/NHAN_VIEN/Tra_cuu", XL_TraCuu_NhanVien)
var Khung_HTML=XL_NHAN_VIEN.Doc_khung_HTML()
var Danh_sach_NhanVien = XL_NHAN_VIEN.Doc_danh_sach_nhan_vien()

function XL_Khoi_dong(req,res){
    var Chuoi_HTML = XL_NHAN_VIEN.Tao_chuoi_HTML_Nhap_Chuoi_Tra_cuu_NhanVien()
    Chuoi_HTML = Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
    res.send(Chuoi_HTML)
}

function XL_TraCuu_NhanVien(req,res){
    var Chuoi_tra_cuu = req.body.Th_chuoi_TraCuu
    var DanhSach_NhanVien_xem = XL_NHAN_VIEN.Tra_cuu_nhan_vien(Danh_sach_NhanVien,Chuoi_tra_cuu)

    var Chuoi_HTML = XL_NHAN_VIEN.Tao_chuoi_HTML_Nhap_Chuoi_Tra_cuu_NhanVien(Chuoi_tra_cuu) 
                + XL_NHAN_VIEN.Tao_chuoi_HTML_DanhSachNhanVien(DanhSach_NhanVien_xem) 
    Chuoi_HTML = Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
    res.send(Chuoi_HTML)
}