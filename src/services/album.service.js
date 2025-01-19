const httpStatus = require('http-status');
const Logger = require('../config/logger');
const crud = require('./crud.service');
const random = require('../utils/random');
const ApiError = require('../utils/ApiError');
const { megaService } = require('./index');
const { Album } = require('../models');

const baseService = crud(Album);

module.exports = {
  ...baseService,
};
