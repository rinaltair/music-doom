const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { artistService } = require('../services');

const createArtist = catchAsync(async (req, res) => {
  const artist = await artistService.createArtistWithProfile(req.body, req.file);
  res.status(httpStatus.CREATED).json({ success: true, message: 'Artist created successfully', data: artist });
});

const updateArtist = catchAsync(async (req, res) => {
  const artist = await artistService.updateArtistWithProfile(req.params.id, req.body, req.file);
  res.status(httpStatus.OK).json({ success: true, message: 'Artist updated successfully', data: artist });
});

const getArtistById = catchAsync(async (req, res) => {
  const artist = await artistService.getArtistById(req.params.id);
  res.status(httpStatus.OK).json({ success: true, message: 'Artist fetched successfully', data: artist });
});

module.exports = {
  createArtist,
  updateArtist,
  getArtistById,
};
