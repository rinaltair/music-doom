const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { authService, userService, tokenService, emailService, megaService } = require('../services');
const { Track } = require("../models");

const downloadTrack = catchAsync(async (req, res) => {
  res.status(200).json({ message: 'aaaaa uploaded successfully' });
});

const upploadTrack = catchAsync(async (req, res) => {
  const song = new Track(req.body);
  const file = req.file;

  // Upload file to cloud storage
  const result = await megaService.uploadFile('song', file);
  if (!result) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'File upload failed');
  }

  // TODO : save it to the database
  // Save the data to database

  res.status(httpStatus.OK).send({ succes: true, message: result });
});

module.exports = {
  downloadTrack,
  upploadTrack,
};
