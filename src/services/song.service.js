const httpStatus = require('http-status');
const { Song } = require('../models');
const { megaService } = require('./index');
const ApiError = require('../utils/ApiError');
const random = require('../utils/random');

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
};
