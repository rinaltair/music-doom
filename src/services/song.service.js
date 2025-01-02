const httpStatus = require('http-status');
const { Song } = require('../models');
const { megaService } = require('./index');
const ApiError = require('../utils/ApiError');
const Logger = require('../config/logger');
const random = require('../utils/random');

const downloadSong = async (id) => {
  const song = await Song.findById(id).catch((error) => {
    Logger.error(error);
    throw new ApiError(httpStatus.NOT_FOUND, 'Song not found');
  });
  const file = megaService.downloadFile('song', `${song.uri}`).catch((error) => {
    Logger.error(error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'File download failed');
  });

  return file;
};

const uploadSong = async (song, file) => {
  // Upload file to cloud storage
  const filename = `${random.randFileName()}.mp3`;
  const result = await megaService.uploadFile('song', file, filename);
  if (!result) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'File upload failed');
  }
  // Save the data to database
  song.uri = filename;
  song.size = file.size;
  await song.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  });
  return result;
};

module.exports = {
  uploadSong,
  downloadSong,
};
