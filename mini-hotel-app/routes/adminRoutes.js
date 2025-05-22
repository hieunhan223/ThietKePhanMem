const express = require('express');
const router = express.Router();

const { getRevenueByMonth } = require('../controllers/adminController');
// Đặt các route thật sự ở đây
router.get('/', (req, res) => {
  res.send('Trang quản lý admin');
});

router.get('/revenue', getRevenueByMonth);

module.exports = router;