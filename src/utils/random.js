const { v4: uuid } = require('uuid');
const path = require('node:path');

const randFileName = () => {
  const random = uuid();
  return random;
};

const randomFilename = (file) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const random = uuid();

  const filename = `${random}${extension}`;
  return filename;
};

module.exports = {
  randFileName,
  randomFilename,
};
