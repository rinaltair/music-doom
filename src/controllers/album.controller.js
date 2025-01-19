const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { albumService } = require('../services');

const createAlbum = catchAsync(async (req, res) => {
  const album = await albumService.createwithPhoto(req.body, req.file, 'artworkUri');
  res.status(httpStatus.CREATED).json({ success: true, message: 'Album created successfully', data: album });
});

const getAlbumById = catchAsync(async (req, res) => {
  const album = await albumService.getById(req.params.id);
  res.status(httpStatus.OK).json({ success: true, message: 'Album fetched successfully', data: album });
});

const getAllAlbums = catchAsync(async (req, res) => {
  const album = await albumService.getAll();
  res.status(httpStatus.OK).json({ success: true, message: 'Albums fetched successfully', data: album });
});

const updateAlbum = catchAsync(async (req, res) => {
  const album = await albumService.updateByIdWithPhoto(req.params.id, req.body, req.file, 'artworkUri');
  res.status(httpStatus.OK).json({ success: true, message: 'Album updated successfully', data: album });
});

const deleteAlbum = catchAsync(async (req, res) => {
  await albumService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).json({ success: true, message: 'Album deleted successfully' });
});

module.exports = {
  createAlbum,
  getAlbumById,
  getAllAlbums,
  updateAlbum,
  deleteAlbum,
};
