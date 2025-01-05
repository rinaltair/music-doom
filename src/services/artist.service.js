const Artist = require('../models/artist.model');
const crud = require('./crud.service');

module.exports = {
  ...crud(Artist),
};
