const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createArtist = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    bio: Joi.string().required(),
    // albums: Joi.objectId()
  }),
};

module.exports = { createArtist };
