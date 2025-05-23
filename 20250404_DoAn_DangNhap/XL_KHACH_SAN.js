const FS = require("fs");
const PATH = require("path");

var Thu_muc_Du_lieu = "./Du_lieu";
var Thu_muc_HTML = PATH.join(Thu_muc_Du_lieu, "HTML");
var Thu_muc_Khach_san = PATH.join(Thu_muc_Du_lieu, "Khach_san");

class XL_KHACH_SAN {

  // ---------------------------
  // XỬ LÝ LƯU TRỮ
  // ---------------------------

  static Doc_Khung_HTML() {
    const Duong_dan = PATH.join(Thu_muc_HTML, "Khung.html");
    const Chuoi_HTML = FS.readFileSync(Duong_dan, "utf-8");
    return Chuoi_HTML;
  }

  static Doc_Danh_sach_Phong() {
    const Duong_dan = PATH.join(Thu_muc_Khach_san, "Phong.json");
    const Chuoi = FS.readFileSync(Duong_dan, "utf-8");
    return JSON.parse(Chuoi);
  }

  static Doc_Danh_sach_Phieu_thue() {
    const Duong_dan = PATH.join(Thu_muc_Khach_san, "Phieu_thue_phong.json");
    const Chuoi = FS.readFileSync(Duong_dan, "utf-8");
    return JSON.parse(Chuoi);
  }

  // ---------------------------
  // XỬ LÝ NGHIỆP VỤ
  // ---------------------------

  static Tra_cuu_Phong_Trong(dsPhong, ngay) {
    return dsPhong.filter(phong => {
      return !phong.lichThue.some(p => p.ngay === ngay);
    });
  }

  static Thong_ke_Doanh_thu(dsPhieu, thang) {
    const ketQua = {};
    dsPhieu.forEach(phieu => {
      const thangPhieu = phieu.ngayNhan?.substring(0, 7);
      if (thangPhieu === thang) {
        const loai = phieu.loaiPhong;
        if (!ketQua[loai]) ketQua[loai] = 0;
        ketQua[loai] += phieu.tien;
      }
    });
    return ketQua;
  }

  static Tra_cuu_Phieu_Thue(dsPhieu, query) {
    return dsPhieu.filter(phieu => {
      const dk1 = !query.roomId || phieu.soPhong.toString() === query.roomId;
      const dk2 = !query.rentalDate || phieu.ngayNhan === query.rentalDate;
      const dk3 = !query.customerName || phieu.khachHang.toLowerCase().includes(query.customerName.toLowerCase());
      return dk1 && dk2 && dk3;
    });
  }


  // XỬ LÝ GIAO DIỆN
  static Tao_HTML_Danh_sach_Phong(dsPhong) {
    return dsPhong.map(p =>
      `<li>Phòng ${p.soPhong} - ${p.loai} - ${p.tinhTrang}</li>`
    ).join("\n");
  }

  static Tao_HTML_Doanh_thu(doi_tuong_doanh_thu) {
    return Object.entries(doi_tuong_doanh_thu).map(([loai, tien]) =>
      `<li>Loại: ${loai} - Doanh thu: ${tien.toLocaleString()} VND</li>`
    ).join("\n");
  }
}

module.exports = XL_KHACH_SAN;
