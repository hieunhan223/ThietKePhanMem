const { readFile } = require('../utils/fileHandler');

exports.getRevenueReport = async (req, res) => {
  const { from, to } = req.query;
  const rooms = await readFile('data/rooms.json');
  const rentals = await readFile('data/rentals.json');

  let totalRevenue = 0;

  for (const r of rentals) {
    if (r.checkOut >= from && r.checkIn <= to) {
      const room = rooms.find(room => room.id === r.roomId);
      const days = (new Date(r.checkOut) - new Date(r.checkIn)) / (1000 * 60 * 60 * 24);
      totalRevenue += room.price * days;
    }
  }

  res.json({ from, to, totalRevenue });
};

exports.getRevenueByMonth = async (req, res) => {
  const { month } = req.query; // dạng '2025-05'
  const rentals = await readFile('data/rentals.json');
  const rooms = await readFile('data/rooms.json');

  const revenue = {};

  rentals.forEach(rental => {
    if (rental.checkIn.startsWith(month)) {
      const room = rooms.find(r => r.id === rental.roomId);
      const type = room.type;
      const price = room.price;

      const checkIn = new Date(rental.checkIn);
      const checkOut = new Date(rental.checkOut);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

      revenue[type] = (revenue[type] || 0) + price * nights;
    }
  });

  res.json(revenue);
};

