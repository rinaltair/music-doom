const httpStatus = require('http-status');
const { Song } = require('../models');
const { megaService } = require('./index');
const ApiError = require('../utils/ApiError');

const uploadSong = async (song, file) => {
  // Upload file to cloud storage
  const result = await megaService.uploadFile('song', file);
  if (!result) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'File upload failed');
  }
  // Save the data to database
  song.uri = result.filename;
  song.size = file.size;
  await song.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  });
  return result.message;
};

module.exports = {
  uploadSong,
};
