const httpStatus = require('http-status');
const Logger = require('../config/logger');
const Artist = require('../models/artist.model');
const crud = require('./crud.service');
// const { megaService } = require('./index');
const megaService = require('./mega.service');
const random = require('../utils/random');
const ApiError = require('../utils/ApiError');

const baseService = crud(Artist);

module.exports = {
  ...baseService,
};
