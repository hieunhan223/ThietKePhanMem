const FS=require("fs")
const PATH=require("path")
var Thu_muc_Du_lieu= "Du_lieu"
var Thu_muc_HTML=PATH.join(Thu_muc_Du_lieu,"HTML")
var Thu_muc_Tivi=PATH.join(Thu_muc_Du_lieu,"Tivi")
class XL_TV{
// Xử lý Lưu trữ 
static Doc_Khung_HTML(){
    var Chuoi_HTML=""
    var Duong_dan=PATH.join(Thu_muc_HTML,"Khung.html")
    Chuoi_HTML=FS.readFileSync(Duong_dan,"utf-8")
    return Chuoi_HTML
}
static  Doc_Danh_sach_Tivi(){
    var Danh_sach=[]
    var Danh_sach_Ten_Tap_tin=FS.readdirSync(Thu_muc_Tivi)
    Danh_sach_Ten_Tap_tin.forEach(Ten_Tap_tin=>{
        var Duong_dan=PATH.join(Thu_muc_Tivi,Ten_Tap_tin)
        var Chuoi_JSON=FS.readFileSync(Duong_dan,"utf-8")
        var Tivi=JSON.parse(Chuoi_JSON)
        // var M=Tivi.Danh_sach_Nhap_hang.Ngay.split("-")
        // Tivi.Ngaynhap=new Date(`${M[2]}-${M[1]}-${M[0]}`)
        Danh_sach.push(Tivi)
        })
    return Danh_sach
}
// Xử lý Nghiệp vụ
static Tra_cuu_Tivi(Danh_sach,Chuoi_Tra_cuu){
    var Danh_sach_Kq=[]    
    Danh_sach_Kq=XL_TV.Tra_cuu_Tivi_theo_Ten(Danh_sach,Chuoi_Tra_cuu)
    return Danh_sach_Kq
}
static Tra_cuu_Tivi_theo_Ten(Danh_sach,Chuoi_Tra_cuu){
    var Danh_sach_Kq=[]
    Chuoi_Tra_cuu=Chuoi_Tra_cuu.toUpperCase()
    Danh_sach.forEach(Tivi=>{
        var Ten=Tivi.Ten.toUpperCase()
        var Thoa_Dieu_kien=Ten.includes(Chuoi_Tra_cuu)
        if ( Thoa_Dieu_kien)
            Danh_sach_Kq.push(Tivi)
    })
    return Danh_sach_Kq
}

 
// Xử lý giao diện
static Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Tivi(Chuoi_Tra_cuu=""){
    var Chuoi_HTML=` <div style="background-color:gray;margin:10px" >
                   <div class="btn ">
                       <form action='/TV/Tra_cuu' method='post' >
                            <input name='Th_Chuoi_Tra_cuu' value='${Chuoi_Tra_cuu}' 
                                 autocomplete='off' />
                      </form>
                  </div>
                </div>`
    return Chuoi_HTML
}
static Tao_Chuoi_HTML_Danh_sach_Tivi(Danh_sach){
    var Chuoi_HTML_Danh_sach ="<div class='row' style='margin:10px' >"
    Danh_sach.forEach(Tivi=>{
        var Chuoi_Hinh=`<img src='/Media/${Tivi.Ma_so}.png' style='width:60px;height:60px' />   `       
        var Chuoi_Thong_tin=`<div class='btn' style='text-align:left'>
                            ${Tivi.Ten} 
                            <br />${Tivi.Don_gia_Ban} VND                            
                        </div>`
        var Chuoi_HTML=`<div class='col-md-3' >
                       ${Chuoi_Hinh}  ${Chuoi_Thong_tin}
                   </div>`
        Chuoi_HTML_Danh_sach +=Chuoi_HTML
    })
    return Chuoi_HTML_Danh_sach
}


}

module.exports=XL_TV