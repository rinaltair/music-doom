const { v4: uuid } = require('uuid');

const randFileName = () => {
  const random = uuid();
  return random;
};

module.exports = {
  randFileName,
};
