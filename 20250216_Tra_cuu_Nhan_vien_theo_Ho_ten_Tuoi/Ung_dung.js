// install npm install express

// Khai báo sử dụng thư viện hàm 
const EXPRESS=require("express")
const XL_NHAN_VIEN=require("./XL_NHAN_VIEN")
// Khai báo và khởi động Ứng dụng 
var Ung_dung=EXPRESS()
Ung_dung.use("/Media",EXPRESS.static("./Media"))
Ung_dung.use(EXPRESS.urlencoded())
Ung_dung.listen(3000)

Ung_dung.get("/",XL_Khoi_dong)
Ung_dung.post("/NHAN_VIEN/Tra_cuu",XL_Tra_cuu_Nhan_vien)
// ====== Khai báo biến toàn cục
var Khung_HTML=XL_NHAN_VIEN.Doc_Khung_HTML()
var Danh_sach_Nhan_vien=XL_NHAN_VIEN.Doc_Danh_sach_Nhan_vien()
// =========Khai báo  hàm xử lý Biến cố
function XL_Khoi_dong(req,res){
    var Chuoi_HTML=XL_NHAN_VIEN.Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Nhan_vien()
    Chuoi_HTML=Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
    res.send(Chuoi_HTML)
}
function XL_Tra_cuu_Nhan_vien(req,res){
    var Chuoi_Tra_cuu=req.body.Th_Chuoi_Tra_cuu
    var Danh_sach_Nhan_vien_Xem=XL_NHAN_VIEN.Tra_cuu_Nhan_vien(Danh_sach_Nhan_vien,Chuoi_Tra_cuu)
    
    var Chuoi_HTML=XL_NHAN_VIEN.Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Nhan_vien(Chuoi_Tra_cuu)
                + XL_NHAN_VIEN.Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach_Nhan_vien_Xem)
    Chuoi_HTML=Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
    res.send(Chuoi_HTML)
}
 



