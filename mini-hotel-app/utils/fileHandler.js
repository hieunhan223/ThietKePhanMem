const fs = require('fs').promises;
const path = require('path');

exports.readFile = async (filePath) => {
  const data = await fs.readFile(path.join(__dirname, '..', filePath));
  return JSON.parse(data);
};

exports.writeFile = async (filePath, data) => {
  await fs.writeFile(path.join(__dirname, '..', filePath), JSON.stringify(data, null, 2));
};
