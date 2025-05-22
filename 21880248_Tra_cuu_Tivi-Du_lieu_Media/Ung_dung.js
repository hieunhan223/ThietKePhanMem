// install npm install express

// Khai báo sử dụng thư viện hàm 
const EXPRESS=require("express")
const XL_TV=require("./XL_TV")
// Khai báo và khởi động Ứng dụng 
var Ung_dung=EXPRESS()
Ung_dung.use("/Media",EXPRESS.static("./Media"))
Ung_dung.use(EXPRESS.urlencoded())
Ung_dung.listen(3000)

Ung_dung.get("/",XL_Khoi_dong)
Ung_dung.post("/TV/Tra_cuu",XL_Tra_cuu_Tivi)
// ====== Khai báo biến toàn cục
var Khung_HTML=XL_TV.Doc_Khung_HTML()
var Danh_sach_Tivi=XL_TV.Doc_Danh_sach_Tivi()
// =========Khai báo  hàm xử lý Biến cố
function XL_Khoi_dong(req,res){
    var Chuoi_HTML=XL_TV.Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Tivi()
    Chuoi_HTML=Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
    res.send(Chuoi_HTML)
}
function XL_Tra_cuu_Tivi(req,res){
    var Chuoi_Tra_cuu=req.body.Th_Chuoi_Tra_cuu
    var Danh_sach_Tivi_Xem=XL_TV.Tra_cuu_Tivi(Danh_sach_Tivi,Chuoi_Tra_cuu)
    
    var Chuoi_HTML=XL_TV.Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Tivi(Chuoi_Tra_cuu)
                + XL_TV.Tao_Chuoi_HTML_Danh_sach_Tivi(Danh_sach_Tivi_Xem)
    Chuoi_HTML=Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
    res.send(Chuoi_HTML)
}
 



