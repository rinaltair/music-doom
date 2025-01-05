const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { artistService, megaService } = require('../services');
const random = require('../utils/random');
const ApiError = require('../utils/ApiError');

const createArtist = catchAsync(async (req, res) => {
  const filename = random.randomFilename(req.file);
  const profileUri = await megaService.uploadFile('picture', req.file, filename);

  try {
    await artistService.create({ ...req.body, profileUri });
    res.status(httpStatus.CREATED).json({ succes: true, message: 'Artist created successfully' });
  } catch (error) {
    await megaService.deleteFile('picture', filename);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Artist cannot be saved');
  }
});

module.exports = {
  createArtist,
};
