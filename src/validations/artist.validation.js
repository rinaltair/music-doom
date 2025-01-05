const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createArtist = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    bio: Joi.string().required(),
    // albums: Joi.objectId()
  }),
};

const updateArtist = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    bio: Joi.string().required(),
    // albums: Joi.objectId()
  }),
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

module.exports = { createArtist, updateArtist };
