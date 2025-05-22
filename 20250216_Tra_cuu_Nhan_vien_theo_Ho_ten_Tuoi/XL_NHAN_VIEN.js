const FS=require("fs")
const PATH=require("path")
var Thu_muc_Du_lieu= "Du_lieu"
var Thu_muc_HTML=PATH.join(Thu_muc_Du_lieu,"HTML")
var Thu_muc_Nhan_vien=PATH.join(Thu_muc_Du_lieu,"Nhan_vien")
class XL_NHAN_VIEN{
// Xử lý Lưu trữ 
static Doc_Khung_HTML(){
    var Chuoi_HTML=""
    var Duong_dan=PATH.join(Thu_muc_HTML,"Khung.html")
    Chuoi_HTML=FS.readFileSync(Duong_dan,"utf-8")
    return Chuoi_HTML
}
static  Doc_Danh_sach_Nhan_vien(){
    var Danh_sach=[]
    var Danh_sach_Ten_Tap_tin=FS.readdirSync(Thu_muc_Nhan_vien)
    Danh_sach_Ten_Tap_tin.forEach(Ten_Tap_tin=>{
        var Duong_dan=PATH.join(Thu_muc_Nhan_vien,Ten_Tap_tin)
        var Chuoi_JSON=FS.readFileSync(Duong_dan,"utf-8")
        var Nhan_vien=JSON.parse(Chuoi_JSON)
        var M=Nhan_vien.Ngay_sinh.split("-")
        Nhan_vien.Ngaysinh=new Date(`${M[2]}-${M[1]}-${M[0]}`)
        Danh_sach.push(Nhan_vien)
        })
    return Danh_sach
}
// Xử lý Nghiệp vụ
static Tra_cuu_Nhan_vien(Danh_sach,Chuoi_Tra_cuu){
    var Danh_sach_Kq=[]
    var n=parseInt(Chuoi_Tra_cuu)
    if (Chuoi_Tra_cuu == "Chi nhánh A" || Chuoi_Tra_cuu == "Chi nhánh B")
      Danh_sach_Kq=XL_NHAN_VIEN.Tra_cuu_Nhan_vien_theo_Chi_nhanh(Danh_sach,Chuoi_Tra_cuu)  
    else if(isNaN(n) )
       Danh_sach_Kq=XL_NHAN_VIEN.Tra_cuu_Nhan_vien_theo_Ho_ten(Danh_sach,Chuoi_Tra_cuu)
    else 
       Danh_sach_Kq=XL_NHAN_VIEN.Tra_cuu_Nhan_vien_theo_Tuoi(Danh_sach,n)
    return Danh_sach_Kq
}
static Tra_cuu_Nhan_vien_theo_Ho_ten(Danh_sach,Chuoi_Tra_cuu){
    var Danh_sach_Kq=[]
    Chuoi_Tra_cuu=Chuoi_Tra_cuu.toUpperCase()
    Danh_sach.forEach(Nhan_vien=>{
        var Ho_ten=Nhan_vien.Ho_ten.toUpperCase()
        var Thoa_Dieu_kien=Ho_ten.includes(Chuoi_Tra_cuu)
        if ( Thoa_Dieu_kien)
            Danh_sach_Kq.push(Nhan_vien)
    })
    return Danh_sach_Kq
}
static Tra_cuu_Nhan_vien_theo_Tuoi(Danh_sach,n){
    var Danh_sach_Kq=[]
    Danh_sach.forEach(Nhan_vien=>{
        var Tuoi=new Date().getFullYear()-Nhan_vien.Ngaysinh.getFullYear()
        var Thoa_Dieu_kien=n-2<=Tuoi && Tuoi<=n+2
        if ( Thoa_Dieu_kien)
            Danh_sach_Kq.push(Nhan_vien)
    })
    return Danh_sach_Kq
}
static Tra_cuu_Nhan_vien_theo_Chi_nhanh(Danh_sach,Chuoi_Tra_cuu){
    var Danh_sach_Kq=[]
    Chuoi_Tra_cuu=Chuoi_Tra_cuu.toUpperCase()
    Danh_sach.forEach(Nhan_vien=>{
        var Chi_nhanh=Nhan_vien.Don_vi.Chi_nhanh.Ten.toUpperCase()
        var Thoa_Dieu_kien=Chi_nhanh.includes(Chuoi_Tra_cuu)
        if ( Thoa_Dieu_kien)
            Danh_sach_Kq.push(Nhan_vien)
    })
    return Danh_sach_Kq
}
 
// Xử lý giao diện
static Tao_Chuoi_HTML_Nhap_Chuoi_Tra_cuu_Nhan_vien(Chuoi_Tra_cuu=""){
    var Chuoi_HTML=` <div style="background-color:gray;margin:10px" >
                   <div class="btn ">
                       <form action='/NHAN_VIEN/Tra_cuu' method='post' >
                            <input name='Th_Chuoi_Tra_cuu' value='${Chuoi_Tra_cuu}' 
                                 autocomplete='off' />
                      </form>
                  </div>
                </div>`
    return Chuoi_HTML
}
static Tao_Chuoi_HTML_Danh_sach_Nhan_vien(Danh_sach){
    var Chuoi_HTML_Danh_sach ="<div class='row' style='margin:10px' >"
    Danh_sach.forEach(Nhan_vien=>{
        var Chuoi_Hinh=`<img src='/Media/${Nhan_vien.Ma_so}.png' style='width:60px;height:60px' />   `
        var Tuoi=new Date().getFullYear()-Nhan_vien.Ngaysinh.getFullYear()
        var Chuoi_Thong_tin=`<div class='btn' style='text-align:left'>
                            ${Nhan_vien.Ho_ten} 
                            <br />${Tuoi} tuổi
                            <br />${Nhan_vien.Don_vi.Chi_nhanh.Ten} 
                        </div>`
        var Chuoi_HTML=`<div class='col-md-3' >
                       ${Chuoi_Hinh}  ${Chuoi_Thong_tin}
                   </div>`
        Chuoi_HTML_Danh_sach +=Chuoi_HTML
    })
    return Chuoi_HTML_Danh_sach
}


}

module.exports=XL_NHAN_VIEN