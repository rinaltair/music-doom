const httpStatus = require('http-status');
const path = require('path');
const Artist = require('../models/artist.model');
const random = require('../utils/random');
const ApiError = require('../utils/ApiError');
const megaService = require('./mega.service');

const create = async (data, file) => {
  const filename = random.randomFilename(file);
  const profileUri = await megaService.uploadFile('picture', file, filename);
  const object = new Artist({ ...data, profileUri });

  await object.save().catch(async () => {
    await megaService.deleteFile('picture', filename);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Artist cannot be saved');
  });
};

module.exports = {
  create,
};
