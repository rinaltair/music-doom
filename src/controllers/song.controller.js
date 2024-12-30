const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { authService, userService, tokenService, emailService, megaService } = require('../services');
const { Song } = require("../models");

const downloadSong = catchAsync(async (req, res) => {
  res.status(200).json({ message: 'aaaaa uploaded successfully' });
});

const uploadSong = catchAsync(async (req, res) => {
  const song = new Song(req.body);
  const file = req.file;

  // Upload file to cloud storage
  const result = await megaService.uploadFile('song', file);
  if (!result) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'File upload failed');
  }

  // TODO : save it to the database
  // Save the data to database
  song.uri = result.filename;
  song.size = file.size;
  await song.save();

  res.status(httpStatus.OK).send({ succes: true, message: result });
});

module.exports = {
  downloadSong,
  uploadSong,
};
