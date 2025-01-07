const httpStatus = require('http-status');
const Logger = require('../config/logger');
const Artist = require('../models/artist.model');
const crud = require('./crud.service');
// const { megaService } = require('./index');
const megaService = require('./mega.service');
const random = require('../utils/random');
const ApiError = require('../utils/ApiError');

const baseService = crud(Artist);

const getArtistById = async (artistId) => {
  const artist = await baseService.getById(artistId);
  if (!artist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Artist not found');
  }
  return artist;
};

const deleteArtistById = async (artistId) => {
  const artist = await baseService.getById(artistId);
  if (!artist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Artist not found');
  }
  await baseService.deleteById(artistId);
  return artist;
};

module.exports = {
  ...baseService,
  getArtistById,
  deleteArtistById,
};
