// install npm install express

// Khai báo sử dụng thư viện hàm 
const EXPRESS=require("express")
const Xu_ly=require("./XL_3L_Cach_3_BT2")
// Khai báo và khởi động Ứng dụng 
var Ung_dung=EXPRESS()
Ung_dung.use("/Media",EXPRESS.static("Media"))
Ung_dung.use(EXPRESS.urlencoded())
Ung_dung.listen(3000)

Ung_dung.get("/",XL_Khoi_dong)
Ung_dung.post("/Loi_chao",XL_Tao_Loi_chao)
// ====== Khai báo biến toàn cục
var Khung_HTML=Xu_ly.Doc_Khung_HTML()
// =========Khai báo  hàm xử lý Biến cố
function XL_Khoi_dong(req,res){
    var Chuoi_HTML=Xu_ly.Tao_Chuoi_HTML_Nhap_lieu_Ho_ten()
    Chuoi_HTML=Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
    res.send(Chuoi_HTML)
}
function XL_Tao_Loi_chao(req,res){
    var Ho_ten=Xu_ly.Nhap_Ho_ten(req)
    // var Ngay_sinh = Xu_ly.Nhap_Ngay_sinh(req);
    var Tuoi = Xu_ly.Tinh_Tuoi(Ngay_sinh);
    var Loi_chao=Xu_ly.Tao_Loi_chao(Ho_ten,Tuoi)
    
    
    var Chuoi_HTML = Xu_ly.Tao_Chuoi_HTML_Nhap_lieu_Ho_ten(Ho_ten,Ngay_sinh) + Xu_ly.Tao_Chuoi_HTML_Loi_chao(Loi_chao);
    Chuoi_HTML = Khung_HTML.replace("Chuoi_HTML", Chuoi_HTML);
    res.send(Chuoi_HTML)
}
 



