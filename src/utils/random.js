const uniqueFileName = require('unique-filename');

const randFileName = (filename) => {
  const random = uniqueFileName(filename);
  return random;
};

module.exports = {
  randFileName,
};
