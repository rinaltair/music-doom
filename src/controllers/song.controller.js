const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { songService } = require('../services');
const { Song } = require('../models');

const downloadSong = catchAsync(async (req, res) => {
  const { id } = req.body;
  const song = await songService.downloadSong(id);
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Content-Disposition', 'attachment; filename="song.mp3"');
  res.status(200).send(song);
});

const uploadSong = catchAsync(async (req, res) => {
  const song = new Song(req.body);
  const { file } = req;
  const result = await songService.uploadSong(song, file);
  return res.status(httpStatus.OK).send({ succes: true, message: result });
});

module.exports = {
  downloadSong,
  uploadSong,
};
