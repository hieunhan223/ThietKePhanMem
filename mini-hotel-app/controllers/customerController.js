const { readFile } = require('../utils/fileHandler');

exports.getAvailableRooms = async (req, res) => {
  const { date } = req.query;
  const rooms = await readFile('data/rooms.json');
  const rentals = await readFile('data/rentals.json');

  const occupied = rentals
    .filter(r => date >= r.checkIn && date < r.checkOut)
    .map(r => r.roomId);

  const available = rooms.filter(r => !occupied.includes(r.id));
  res.json(available);
};
