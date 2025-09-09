const FS = require("fs");
const PATH = require("path");

var Thu_muc_Du_lieu = "./Du_lieu";
var Thu_muc_HTML = PATH.join(Thu_muc_Du_lieu, "HTML");
var Thu_muc_Khach_san = PATH.join(Thu_muc_Du_lieu, "Khach_san");

class XL_KHACH_SAN {

  // ---------------------------
  // XỬ LÝ LƯU TRỮ
  // ---------------------------
  Doc_Du_lieu() {
    const Duong_dan_Phong = PATH.join(Thu_muc_Khach_san, "Phong.json");
    const Duong_dan_Phieu_thue = PATH.join(Thu_muc_Khach_san, "Phieu_thue_phong.json");
    const Danh_sach_Phong = JSON.parse(FS.readFileSync(Duong_dan_Phong, "utf-8"));
    const Danh_sach_Phieu_thue = JSON.parse(FS.readFileSync(Duong_dan_Phieu_thue, "utf-8"));
    return { Danh_sach_Phong, Danh_sach_Phieu_thue };
  }


  // ---------------------------
  // XỬ LÝ NGHIỆP VỤ
  // ---------------------------

  Tinh_Doanh_thu_Theo_Thang(Thang, Danh_sach_Phong, Danh_sach_Phieu_thue) {
    let Tong_doanh_thu = 0;
    const Chi_tiet = [];

    Danh_sach_Phieu_thue.forEach((phieu) => {
      const checkIn = new Date(phieu.checkIn);
      const checkOut = new Date(phieu.checkOut);
      const Thang_phieu = checkIn.getMonth() + 1; // Tháng trong JS từ 0-11, cộng 1 để đúng định dạng 1-12

      if (Thang_phieu === parseInt(Thang)) {
        const So_ngay_thue = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)); // Tính số ngày thuê
        const Phong = Danh_sach_Phong.find((p) => p.Ma_phong === phieu.Ma_phong);
        if (Phong) {
          const Doanh_thu = So_ngay_thue * Phong.Gia;
          Tong_doanh_thu += Doanh_thu;
          Chi_tiet.push({
            Ma_phong: phieu.Ma_phong,
            Loai_Phong: Phong.Loai_Phong,
            So_ngay_thue,
            Gia: Phong.Gia,
            Doanh_thu,
          });
        }
      }
    });

    return { Tong_doanh_thu, Chi_tiet };
  }

  // ---------------------------
  // XỬ LÝ GIAO DIỆN
  // ---------------------------
 // Tạo giao diện HTML để tra cứu doanh thu
 Tao_Chuoi_HTML_Tra_cuu_Doanh_thu() {
  return `
    <form action='/Nhan_vien/Dang_nhap' method='post' class='form-group'>
      <label for='Thang'>Chọn tháng (1-12):</label>
      <input type='number' name='Thang' id='Thang' min='1' max='12' required />
      <button type='submit' class='btn btn-primary'>Tra cứu doanh thu</button>
    </form>
  `;
}
  Tao_Chuoi_HTML_Thong_ke(Thang, Tong_doanh_thu, Chi_tiet) {
    let Chuoi_HTML = `
      <h2>Doanh thu tháng ${Thang}</h2>
      <table class='table table-bordered'>
        <thead>
          <tr>
            <th>Mã phòng</th>
            <th>Loại phòng</th>
            <th>Số ngày thuê</th>
            <th>Giá (VND)</th>
            <th>Doanh thu (VND)</th>
          </tr>
        </thead>
        <tbody>
    `;

    Chi_tiet.forEach((item) => {
      Chuoi_HTML += `
        <tr>
          <td>${item.Ma_phong}</td>
          <td>${item.Loai_Phong}</td>
          <td>${item.So_ngay_thue}</td>
          <td>${item.Gia.toLocaleString()}</td>
          <td>${item.Doanh_thu.toLocaleString()}</td>
        </tr>
      `;
    });

    Chuoi_HTML += `
        </tbody>
      </table>
      <h3>Tổng doanh thu: ${Tong_doanh_thu.toLocaleString()} VND</h3>
      <a href='/'>Quay lại</a>
    `;

    return Chuoi_HTML;
  }
}

module.exports = new XL_KHACH_SAN();
