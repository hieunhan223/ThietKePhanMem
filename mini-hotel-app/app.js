const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

const rentalsFile = path.join(__dirname, 'data/rentals.json'); // đảm bảo đúng đường dẫn file
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use('/customer', customerRoutes);

app.get('/admin/rentals/search', (req, res) => {
  const { roomId, rentalDate, customerName } = req.query;

  fs.readFile(rentalsFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Lỗi đọc dữ liệu' });
    }

    let rentals = JSON.parse(data);

    // Lọc theo roomId nếu có
    if (roomId) {
      rentals = rentals.filter(r => r.roomId === roomId);
    }

    // Lọc theo ngày thuê nằm giữa check-in và check-out
    if (rentalDate) {
      const date = new Date(rentalDate);
      rentals = rentals.filter(r => {
        const checkIn = new Date(r.checkIn);
        const checkOut = new Date(r.checkOut);
        return date >= checkIn && date <= checkOut;
      });
    }

    // Lọc theo tên khách hàng nếu có
    if (customerName) {
      const nameLower = customerName.toLowerCase();
      rentals = rentals.filter(r =>
        r.customers.some(c => c.name.toLowerCase().includes(nameLower))
      );
    }

    res.json(rentals);
  });
});

app.listen(3000, () => {
  console.log('🌐 Server chạy tại http://localhost:3000');
});
