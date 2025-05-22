from pathlib import  Path
from datetime import datetime, date

class XU_LY :
#===============Xử lý Giao diện =========================
    def Nhap_Ho_ten(self,request) :
        Ho_ten=request.form['Th_Ho_ten']
        return Ho_ten
    def Nhap_Ngay_sinh(self,request) :
        Ngay_sinh=request.form['Th_Ngay_sinh']
        Ngay_sinh = datetime.strptime(Ngay_sinh, "%Y-%m-%d").date()
        return Ngay_sinh
    def Tao_Chuoi_HTML_Nhap_lieu_Ho_ten(self,Ho_ten="",Ngay_sinh="") :
        Chuoi_HTML=f"""<form action='/Loi_chao' method='post'  >
                       <div class='form-group' >
                          <label for='Th_Ho_ten'>Họ tên</label>
                          <input name='Th_Ho_ten' id='Th_Ho_ten' value='{Ho_ten}'  autocomplete= "off" />
                       </div>
                       <div class='form-group'>
                            <label for="Th_Ngay_sinh">Ngày sinh</label>
                            <input type="date" name="Th_Ngay_sinh" id="Th_Ngay_sinh" value="${Ngay_sinh}" />
                        </div>
                       <button type='submit' class='btn btn-danger'>Đồng ý</button>
                    </form>
                """
        return Chuoi_HTML

    def Tao_Chuoi_HTML_Loi_chao(self,Loi_chao) :
        Chuoi_HTML=f"""<div class='alert alert-info'>
                        {Loi_chao}
                   </div>
                """
        return Chuoi_HTML
#===============Xử lý Nghiệp vụ====================

    def Tao_Loi_chao(self,Ho_ten,Tuoi) :
        Loi_chao=f"""Xin chào {Ho_ten}, năm nay bạn {Tuoi} tuổi!"""
        return Loi_chao
    def Tinh_Tuoi(self,Ngay_sinh): 
        hom_nay = date.today()
        Tuoi = hom_nay.year -  Ngay_sinh.year
        return Tuoi
#===============Xử lý Lưu trữ ========================
    def Doc_Khung_HTML(self) :
        Chuoi_HTML=""
        Thu_muc_Du_lieu=Path("Du_lieu")
        Thu_muc_HTML=Thu_muc_Du_lieu / "HTML"
        Duong_dan=Thu_muc_HTML / "Khung.html"
        Chuoi_HTML=Duong_dan.read_text("utf-8")
        return Chuoi_HTML


Xu_ly=XU_LY()