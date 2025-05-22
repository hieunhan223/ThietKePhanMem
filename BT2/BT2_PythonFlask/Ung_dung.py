
# Khai báo sử dụng thư viện hàm 
from flask import  Flask,request
from XL_3L_Cach_3_BT2 import Xu_ly
# Khai báo và khởi động Ứng dụng 
Ung_dung=Flask(__name__,static_url_path="/Media",static_folder="Media")
# Khai báo Biến Toàn cục 
Khung_HTML=Xu_ly.Doc_Khung_HTML()
@Ung_dung.route("/")
def XL_Khoi_dong() :
    Chuoi_HTML=Xu_ly.Tao_Chuoi_HTML_Nhap_lieu_Ho_ten()
    Chuoi_HTML=Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
    return Chuoi_HTML
@Ung_dung.route("/Loi_chao",methods=["POST"])
def XL_Tao_Loi_chao() :
    Ho_ten=Xu_ly.Nhap_Ho_ten(request)
    Ngay_sinh=Xu_ly.Nhap_Ngay_sinh(request)
    Tuoi = Xu_ly.Tinh_Tuoi(Ngay_sinh)
    Loi_chao=Xu_ly.Tao_Loi_chao(Ho_ten,Tuoi)
    
    Chuoi_HTML= Xu_ly.Tao_Chuoi_HTML_Nhap_lieu_Ho_ten(Ho_ten) \
              + Xu_ly.Tao_Chuoi_HTML_Loi_chao(Loi_chao)
    Chuoi_HTML=Khung_HTML.replace("Chuoi_HTML",Chuoi_HTML)
    return Chuoi_HTML
if __name__ == "__main__":
    Ung_dung.run(debug=True)
