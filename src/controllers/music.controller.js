const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { authService, userService, tokenService, emailService, megaService } = require('../services');

const getMusic = catchAsync(async (req, res) => {
  res.status(200).json({ message: 'aaaaa uploaded successfully' });
});

const postMusic = catchAsync(async (req, res) => {
  const music = req.file;
  const result = await megaService.uploadMusic(music);
  if (!result) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'File upload failed');
  }
  res.status(httpStatus.OK).send({ succes: true, message: result });
});

module.exports = {
  getMusic,
  postMusic,
};
