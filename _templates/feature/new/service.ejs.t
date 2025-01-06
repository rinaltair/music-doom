---
to: src/services/<%= name.toLowerCase() %>.service.js
---

const httpStatus = require('http-status');
const Logger = require('../config/logger');
const Artist = require('../models/<%= name.toLowerCase() %>.model');
const crud = require('./crud.service');
const random = require('../utils/random');
const ApiError = require('../utils/ApiError');

const baseService = crud(Artist);


module.exports = {
  ...baseService,
};
