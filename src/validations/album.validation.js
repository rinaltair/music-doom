const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAlbum = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    releaseDate: Joi.date().required(),
    // artist: Joi.string().required().custom(objectId),
  }),
  file: Joi.object().unknown(true).required(),
};

const byID = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

const updateAlbum = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    releaseDate: Joi.date().required(),
    // artist: Joi.string().required().custom(objectId),
  }),
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  // file is not mandatory
  file: Joi.object().unknown(true),
};

module.exports = {
  createAlbum,
  byID,
  updateAlbum,
};
