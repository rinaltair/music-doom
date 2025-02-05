const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { artistService } = require('../services');

const createArtist = catchAsync(async (req, res) => {
  const artist = await artistService.createwithPhoto(req.body, req.file, 'profileUri');
  res.status(httpStatus.CREATED).json({ success: true, message: 'Artist created successfully', data: artist });
});

const updateArtist = catchAsync(async (req, res) => {
  const artist = await artistService.updateByIdWithPhoto(req.params.id, req.body, req.file, 'profileUri');
  res.status(httpStatus.OK).json({ success: true, message: 'Artist updated successfully', data: artist });
});

const getArtistById = catchAsync(async (req, res) => {
  const artist = await artistService.getById(req.params.id);
  res.status(httpStatus.OK).json({ success: true, message: 'Artist fetched successfully', data: artist });
});

const getAllArtist = catchAsync(async (req, res) => {
  const artist = await artistService.getAll();
  res.status(httpStatus.OK).json({ success: true, message: 'Artist fetched successfully', data: artist });
});

const deleteArtist = catchAsync(async (req, res) => {
  const artist = await artistService.deleteById(req.params.id);
  res.status(httpStatus.OK).json({ success: true, message: 'Artist deleted successfully', data: artist });
});

module.exports = {
  createArtist,
  updateArtist,
  getArtistById,
  getAllArtist,
  deleteArtist,
};
