const httpStatus = require('http-status');
const Logger = require('../config/logger');
const Artist = require('../models/artist.model');
const crud = require('./crud.service');
// const { megaService } = require('./index');
const megaService = require('./mega.service');
const random = require('../utils/random');
const ApiError = require('../utils/ApiError');

const baseService = crud(Artist);

const createArtistWithProfile = async (artistData, profileFile) => {
  const filename = random.randomFilename(profileFile);
  const profileUri = await megaService.uploadFile('picture', profileFile, filename);

  try {
    const artist = await baseService.create({ ...artistData, profileUri });
    return artist;
  } catch (error) {
    await megaService.deleteFile('picture', filename);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create artist');
  }
};

const updateArtistWithProfile = async (artistId, updateData, profileFile) => {
  // check if artist exists
  const artist = await baseService.getById(artistId);
  if (!artist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Artist not found');
  }

  // Check if profile file exists
  let filename = artist.profileUri;
  if (profileFile) {
    filename = random.randomFilename(profileFile);
    await megaService.uploadFile('picture', profileFile, filename);
  }

  try {
    // Update the Artist data
    const updatedArtist = await baseService.updateById(artistId, { ...updateData, profileUri: filename });

    // Delete the old file
    if (filename && artist.profileUri) {
      await megaService.deleteFile('picture', artist.profileUri)
    }
    return updatedArtist;
  } catch (error) {
    if (filename) {
      await megaService.deleteFile('picture', filename);
    }
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update artist');
  }
};

const getArtistById = async (artistId) => {
  const artist = await baseService.getById(artistId);
  if (!artist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Artist not found');
  }
  return artist;
};


module.exports = {
  ...baseService,
  createArtistWithProfile,
  updateArtistWithProfile,
  getArtistById,
};
