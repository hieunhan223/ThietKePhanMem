const FS=require("fs")
const PATH=require("path")

class XU_LY{
// Xử lý Lưu trữ 
Doc_Khung_HTML(){
    var Chuoi_HTML=""
    var Thu_muc_Du_lieu = PATH.join(__dirname, "Du_Lieu");
    var Thu_muc_HTML=PATH.join(Thu_muc_Du_lieu,"HTML")
    var Duong_dan=PATH.join(Thu_muc_HTML,"Khung.html")
    Chuoi_HTML=FS.readFileSync(Duong_dan,"utf-8")
    return Chuoi_HTML
}

// Xử lý giao diện
Nhap_Ho_ten(req){
    var Ho_ten=req.body.Th_Ho_ten
    return Ho_ten
}
Nhap_Ngay_sinh(req) {
    var Ngay_sinh = req.body.Th_Ngay_sinh;
    return Ngay_sinh;
  }

Tao_Chuoi_HTML_Nhap_lieu_Ho_ten(Ho_ten="",Ngay_sinh=""){
    var Chuoi_HTML=`<form action='/Loi_chao' method='post'  >
                       <div class='form-group' >
                            <label label for='Th_Ho_ten'>Họ tên</label>
                            <input name='Th_Ho_ten' id='Th_Ho_ten' value='${Ho_ten}'  autocomplete= "off" />
                       </div>
                       <div class='form-group'>
                            <label for="Th_Ngay_sinh">Ngày sinh</label>
                            <input type="date" name="Th_Ngay_sinh" id="Th_Ngay_sinh" value="${Ngay_sinh}" />
                        </div>
                       <button type='submit' class='btn btn-danger'>Đồng ý</button>
                    </form>`
    return Chuoi_HTML
}

Tao_Chuoi_HTML_Loi_chao(Loi_chao){
    var Chuoi_HTML=`<div class='alert alert-info'>${Loi_chao}</div>`
    return Chuoi_HTML
}
// Xử lý Nghiệp vụ
Tao_Loi_chao(Ho_ten,Tuoi){
    var Loi_chao = `Xin chào ${Ho_ten}, bạn sinh năm ${Tuoi.year}, năm nay bạn ${Tuoi.age} tuổi!`;
    return Loi_chao;
}

Tinh_Tuoi(Ngay_sinh) {
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(Ngay_sinh).getFullYear();
    const age = currentYear - birthYear;
    return {
      year: birthYear,
      age: age
    };
  }

}

module.exports=new XU_LY()