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
    const Phong_Thong_ke = {};    

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

          // Aggregate data for the room
          if (!Phong_Thong_ke[phieu.Ma_phong]) {
            Phong_Thong_ke[phieu.Ma_phong] = {
              Ma_phong: phieu.Ma_phong,
              Loai_Phong: Phong.Loai_Phong,
              Gia: Phong.Gia,
              So_ngay_thue: 0,
              Doanh_thu: 0,
            };
          }
          Phong_Thong_ke[phieu.Ma_phong].So_ngay_thue += So_ngay_thue;
          Phong_Thong_ke[phieu.Ma_phong].Doanh_thu += Doanh_thu;
        }
      }
    });
    const Chi_tiet = Object.values(Phong_Thong_ke);
    return { Tong_doanh_thu, Chi_tiet };
  }
  // Kiểm tra phòng trống
  Kiem_tra_Phong_trong(CheckIn, CheckOut, Danh_sach_Phong, Danh_sach_Phieu_thue) {
    const Ngay_check_in = new Date(CheckIn);
    const Ngay_check_out = new Date(CheckOut);

    // Kiểm tra ngày hợp lệ
    if (Ngay_check_out <= Ngay_check_in) {
      return { Phong_trong: [], Loi: "Ngày trả phòng phải sau ngày nhận phòng" };
    }

    // Lọc các phòng trống
    const Phong_trong = Danh_sach_Phong.filter((phong) => {
      const Phieu_thue = Danh_sach_Phieu_thue.filter((phieu) => phieu.Ma_phong === phong.Ma_phong);
      return !Phieu_thue.some((phieu) => {
        const CheckIn_hien_tai = new Date(phieu.checkIn);
        const CheckOut_hien_tai = new Date(phieu.checkOut);
        // Phòng bị chiếm nếu khoảng thời gian yêu cầu trùng lặp với phiếu thuê
        return (
          (Ngay_check_in >= CheckIn_hien_tai && Ngay_check_in < CheckOut_hien_tai) ||
          (Ngay_check_out > CheckIn_hien_tai && Ngay_check_out <= CheckOut_hien_tai) ||
          (Ngay_check_in <= CheckIn_hien_tai && Ngay_check_out >= CheckOut_hien_tai)
        );
      });
    });

    return { Phong_trong, Loi: null };
  }
  // Tra cứu phiếu thuê theo tiêu chí
  Tra_cuu_Phieu_thue(Ma_phong, Ngay_thue, Ten_khach, Danh_sach_Phieu_thue, Danh_sach_Phong) {
    let Ket_qua = Danh_sach_Phieu_thue;

    // Lọc theo Mã phòng (nếu có)
    if (Ma_phong) {
      Ket_qua = Ket_qua.filter((phieu) => phieu.Ma_phong.toLowerCase().includes(Ma_phong.toLowerCase()));
    }

    // Lọc theo Ngày thuê (nếu có)
    if (Ngay_thue) {
      const Ngay_tra_cuu = new Date(Ngay_thue);
      Ket_qua = Ket_qua.filter((phieu) => {
        const CheckIn = new Date(phieu.checkIn);
        const CheckOut = new Date(phieu.checkOut);
        return Ngay_tra_cuu >= CheckIn && Ngay_tra_cuu <= CheckOut;
      });
    }

    // Lọc theo Tên khách hàng (nếu có)
    if (Ten_khach) {
      Ket_qua = Ket_qua.filter((phieu) =>
        phieu.Khach_hang.some((kh) => kh.Ten.toLowerCase().includes(Ten_khach.toLowerCase()))
      );
    }

    // Thêm thông tin phòng vào kết quả
    Ket_qua = Ket_qua.map((phieu) => {
      const Phong = Danh_sach_Phong.find((p) => p.Ma_phong === phieu.Ma_phong);
      return {
        Ma_phong: phieu.Ma_phong,
        Loai_Phong: Phong ? Phong.Loai_Phong : "Không xác định",
        CheckIn: phieu.checkIn,
        CheckOut: phieu.checkOut,
        Khach_hang: phieu.Khach_hang.map((kh) => kh.Ten).join(", "),
      };
    });

    return Ket_qua;
  }
  // ---------------------------
  // XỬ LÝ GIAO DIỆN
  // ---------------------------
  // Tạo giao diện HTML màn hình chính
  Tao_Chuoi_HTML_Man_hinh_chinh() {
    return `
      <div class='container text-center'>
        <h2>Chào mừng đến với Khách sạn</h2>
        <p>Vui lòng chọn vai trò của bạn:</p>
        <div class='btn-group'>
          <a href='/Khach_hang' class='btn btn-primary'>Khách hàng</a>
          <a href='/Nhan_vien/Dang_nhap' class='btn btn-success'>Nhân viên</a>
        </div>
      </div>
    `;
  }
  // Tạo giao diện HTML để kiểm tra phòng trống
  Tao_Chuoi_HTML_Kiem_tra_Phong_trong() {
    const homNay = new Date();
    const yyyy = homNay.getFullYear();
    const mm = String(homNay.getMonth() + 1).padStart(2, '0');
    const dd = String(homNay.getDate()).padStart(2, '0');
    const ngayHienTai = `${yyyy}-${mm}-${dd}`;
    return `
      <div class='container'>
        <h2>Kiểm tra phòng trống</h2>
        <form action='/Khach_hang' method='post' class='form-group'>
          <div class='form-group'>
            <label for='CheckIn'>Ngày nhận phòng (YYYY-MM-DD):</label>
            <input type='date' name='CheckIn' id='CheckIn' value='${ngayHienTai}' required />
          </div>
          <div class='form-group'>
            <label for='CheckOut'>Ngày trả phòng (YYYY-MM-DD):</label>
            <input type='date' name='CheckOut' id='CheckOut' value='${ngayHienTai}' required />
          </div>
          <button type='submit' class='btn btn-primary'>Kiểm tra</button>
        </form>
      </div>
    `;
  }
  // Tạo giao diện HTML để tra cứu doanh thu
  Tao_Chuoi_HTML_Tra_cuu_Doanh_thu() {
    return `
      <form action='/Nhan_vien/Dang_nhap' method='post' class='form-group'>
        <div class='container'>
            <label for='Thang'>Chọn tháng (1-12):</label>
            <input type='number' name='Thang' id='Thang' min='1' max='12' required />
            <button type='submit' class='btn btn-primary'>Tra cứu doanh thu</button>
        </div>        
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
    return Chuoi_HTML;
  }
  // Tạo chuỗi HTML hiển thị danh sách phòng trống
  Tao_Chuoi_HTML_Danh_sach_Phong_trong(Phong_trong, CheckIn, CheckOut, Loi) {
    let Chuoi_HTML = `
      <div class='container'>
        <h2>Phòng trống từ ${CheckIn} đến ${CheckOut}</h2>
    `;

    if (Loi) {
      Chuoi_HTML += `
        <div class='alert alert-danger'>${Loi}</div>
        <a href='/Khach_hang' class='btn btn-secondary'>Quay lại</a>
      `;
    } else if (Phong_trong.length === 0) {
      Chuoi_HTML += `
        <div class='alert alert-warning'>Không có phòng trống trong khoảng thời gian này.</div>
        <a href='/Khach_hang' class='btn btn-secondary'>Quay lại</a>
      `;
    } else {
      Chuoi_HTML += `
        <table class='table table-bordered'>
          <thead>
            <tr>
              <th>Mã phòng</th>
              <th>Loại phòng</th>
              <th>Số khách tối đa</th>
              <th>Giá (VND/đêm)</th>
              <th>Tiện nghi</th>
            </tr>
          </thead>
          <tbody>
      `;
      Phong_trong.forEach((phong) => {
        Chuoi_HTML += `
          <tr>
            <td>${phong.Ma_phong}</td>
            <td>${phong.Loai_Phong}</td>
            <td>${phong.Khach_toi_da}</td>
            <td>${phong.Gia.toLocaleString()}</td>
            <td>${phong.Tien_nghi.join(", ")}</td>
          </tr>
        `;
      });
      
    }

    Chuoi_HTML += `</div>`;
    return Chuoi_HTML;
  }
  // Tạo giao diện HTML để tra cứu phiếu thuê
  Tao_Chuoi_HTML_Tra_cuu_Phieu_thue() {
    const homNay = new Date();
    const yyyy = homNay.getFullYear();
    const mm = String(homNay.getMonth() + 1).padStart(2, '0');
    const dd = String(homNay.getDate()).padStart(2, '0');
    const ngayHienTai = `${yyyy}-${mm}-${dd}`;
    return `
      <div class='container'>        
        <form action='/Nhan_vien/Dang_nhap' method='post' class='form-group'>
          <div class='form-group'>
            <label for='Ma_phong'>Mã phòng:</label>
            <input type='text' name='Ma_phong' id='Ma_phong' placeholder='Nhập mã phòng (VD: 101)' />
          </div>
          <div class='form-group'>
            <label for='Ngay_thue'>Ngày thuê:</label>
            <input type='date' name='Ngay_thue' id='Ngay_thue' />
          </div>
          <div class='form-group'>
            <label for='Ten_khach'>Tên khách hàng:</label>
            <input type='text' name='Ten_khach' id='Ten_khach' placeholder='Nhập tên khách hàng' />
          </div>
          <button type='submit' class='btn btn-primary'>Tra cứu</button>
        </form>
      </div>
    `;
  }
  // Tạo chuỗi HTML hiển thị kết quả tra cứu phiếu thuê
  Tao_Chuoi_HTML_Ket_qua_Tra_cuu_Phieu_thue(Ket_qua) {
    let Chuoi_HTML = `
      <div class='container'>
        <h2>Kết quả tra cứu phiếu thuê</h2>
    `;

    if (Ket_qua.length === 0) {
      Chuoi_HTML += `
        <div class='alert alert-warning'>Không tìm thấy phiếu thuê phù hợp.</div>        
      `;
    } else {
      Chuoi_HTML += `
        <table class='table table-bordered'>
          <thead>
            <tr>
              <th>Mã phòng</th>
              <th>Loại phòng</th>
              <th>Ngày nhận phòng</th>
              <th>Ngày trả phòng</th>
              <th>Khách hàng</th>
            </tr>
          </thead>
          <tbody>
      `;
      Ket_qua.forEach((phieu) => {
        Chuoi_HTML += `
          <tr>
            <td>${phieu.Ma_phong}</td>
            <td>${phieu.Loai_Phong}</td>
            <td>${phieu.CheckIn}</td>
            <td>${phieu.CheckOut}</td>
            <td>${phieu.Khach_hang}</td>
          </tr>
        `;
      });
      Chuoi_HTML += `
          </tbody>
        </table>        
      `;
    }

    Chuoi_HTML += `</div>`;
    return Chuoi_HTML;
  }
}


module.exports = new XL_KHACH_SAN();
