const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { artistService } = require('../services');

const createArtist = catchAsync(async (req, res) => {
  await artistService.create(req.body, req.file);
  res.status(httpStatus.CREATED).json({ succes: true, message: 'Artist created successfully' });
});

module.exports = {
  createArtist,
};
