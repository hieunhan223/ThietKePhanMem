const FS = require("fs")
const PATH = require("path")

var Thu_muc_Du_lieu = "./Du_lieu"
var Thu_muc_HTML = PATH.join(Thu_muc_Du_lieu,"HTML")
var Thu_muc_Nhan_vien = PATH.join(Thu_muc_Du_lieu,"Nhan_vien")
class XL_NHAN_VIEN{
    //Xu ly Luu tru
    static Doc_khung_HTML(){
        var Chuoi_HTML=""
        var Duong_dan = PATH.join(Thu_muc_HTML,"Khung.html")
        Chuoi_HTML = FS.readFileSync(Duong_dan,"utf8")
        return Chuoi_HTML
    }

    static Doc_danh_sach_nhan_vien(){
        var Danh_sach =[]
        var Danh_sach_Ten_tap_tin = FS.readdirSync(Thu_muc_Nhan_vien)
        Danh_sach_Ten_tap_tin.forEach(Ten_tap_tin => {
            var Duong_dan = PATH.join(Thu_muc_Nhan_vien,Ten_tap_tin)
            var Chuoi_JSON = FS.readFileSync(Duong_dan,"utf8")
            var Doi_tuong = JSON.parse(Chuoi_JSON)
            Danh_sach.push(Doi_tuong)
        })
        return Danh_sach
    }

    //Xu ly nghiep vu
    static Tra_cuu_nhan_vien (Danh_sach, Chuoi_tra_cuu){
        var Danh_sach_kq =[]
        Chuoi_tra_cuu = Chuoi_tra_cuu.toUpperCase()
        Danh_sach.forEach(Nhan_vien=>{
            var Ho_ten = Nhan_vien.Ho_ten.toUpperCase()
            var Don_vi = Nhan_vien.Don_vi.Ten.toUpperCase()
            const Nam_sinh = Lay_Nam_sinh(Nhan_vien.Ngay_sinh)
            

            var Thoa_dieu_kien_HoTen = Ho_ten.includes(Chuoi_tra_cuu)
            var Thoa_dieu_kien_DonVi = Don_vi.includes(Chuoi_tra_cuu)
            var Thoa_dieu_kien_NamSinh = (Nam_sinh == Chuoi_tra_cuu)
            var Thoa_dieu_kien = Thoa_dieu_kien_HoTen || Thoa_dieu_kien_DonVi || Thoa_dieu_kien_NamSinh
            if (Thoa_dieu_kien)
                Danh_sach_kq.push(Nhan_vien)
        })
        return Danh_sach_kq
    }

    //Xu ly giao dien
    static Tao_chuoi_HTML_Nhap_Chuoi_Tra_cuu_NhanVien(Chuoi_tra_cuu=""){
        var Chuoi_HTML =`<div style="background-color:gray;margin = 10px" >
                            <div class="btn">
                                <form action='/NHAN_VIEN/Tra_cuu' method = 'post'>
                                    <input name='Th_chuoi_TraCuu' value = '${Chuoi_tra_cuu}' autocomplete='off'/>
                                    <button type="submit">Tìm</button>
                                </form>
                            </div>
                        </div>`
        return Chuoi_HTML
    }

    static Tao_chuoi_HTML_DanhSachNhanVien(Danh_sach){
        var Chuoi_HTML_DanhSach = "<div class='row' style = 'margin:10px'>"
        Danh_sach.forEach(Nhan_vien=>{
            var Chuoi_hinh = `<img src='/Media/${Nhan_vien.Ma_so}.png' style ='width:60px; height:60px'/>`
            var Chuoi_thong_tin = `<div class='btn' style ='text-align:left'> ${Nhan_vien.Ho_ten} </div>`
            var Chuoi_HTML =`<div class= 'col-md-3'>${Chuoi_hinh} ${Chuoi_thong_tin}</div>`
            Chuoi_HTML_DanhSach +=Chuoi_HTML
        })
        return Chuoi_HTML_DanhSach
    }
}

function Lay_Nam_sinh (Ngay_sinh){ //Định dạng ngày sinh input: 2-4-1972
    const parts = Ngay_sinh.split("-") // ["2", "4", "1972"]
    const birthYear = parseInt(parts[2]) // 1972
    return birthYear
}
module.exports = XL_NHAN_VIEN