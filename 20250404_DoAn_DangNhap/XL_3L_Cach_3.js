const FS=require("fs")
const PATH=require("path")

class XU_LY{
// Xử lý Lưu trữ 
Doc_Khung_HTML(){
    var Chuoi_HTML=""
    var Thu_muc_Du_lieu= "Du_lieu"
    var Thu_muc_HTML=PATH.join(Thu_muc_Du_lieu,"HTML")
    var Duong_dan=PATH.join(Thu_muc_HTML,"Khung.html")
    Chuoi_HTML=FS.readFileSync(Duong_dan,"utf-8")
    return Chuoi_HTML
}

// Xử lý giao diện
Nhap_Tai_khoan(req){
    var Tai_khoan=req.body.Ten_Dang_nhap
    return Tai_khoan
}
Nhap_Mat_khau(req){
    var Mat_khau=req.body.Mat_khau
    return Mat_khau
}
Tao_Chuoi_HTML_Nhap_lieu_Dang_nhap(){
    var Chuoi_HTML=`<form action='/Nhan_vien/Dang_nhap' method='post'  >
                       <div class='form-group' >
                          <label for='Ten_Dang_nhap'>Tên đăng nhập</label>
                          <input name='Ten_Dang_nhap' id='Ten_Dang_nhap' autocomplete= "off" />
                       </div>
                       <div class='form-group' >
                          <label for='Mat_khau'>Mật khẩu</label>
                          <input name='Mat_khau' id='Mat_khau' type="password" autocomplete= "off" />
                       </div>
                       <button type='submit' class='btn btn-danger'>Đăng nhập</button>
                    </form>`
    return Chuoi_HTML
}
Tao_Chuoi_HTML_Chuoi(Chuoi){
    var Chuoi_HTML=`<div class='alert alert-info'>${Chuoi}</div>`
    return Chuoi_HTML
}
Tao_Chuoi_HTML_Loi_chao(Loi_chao){
    var Chuoi_HTML=`<div class='alert alert-info'>${Loi_chao}</div>`
    return Chuoi_HTML
}
// Xử lý Nghiệp vụ
Tao_Loi_chao(Ho_ten){
    var Loi_chao="Xin chào " + Ho_ten
    return Loi_chao
}

}

module.exports=new XU_LY()