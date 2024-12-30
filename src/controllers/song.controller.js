const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { songService } = require('../services');
const { Song } = require("../models");

const downloadSong = catchAsync(async (req, res) => {
  res.status(200).json({ message: 'aaaaa uploaded successfully' });
});

const uploadSong = catchAsync(async (req, res) => {
  let song = new Song(req.body);
  const file = req.file;
  const result = await songService.uploadSong(song, file);
  return res.status(httpStatus.OK).send({ succes: true, message: result });
});

module.exports = {
  downloadSong,
  uploadSong,
};
