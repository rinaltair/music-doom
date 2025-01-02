const Joi = require('joi');
const { objectId } = require('./custom.validation');

const downloadSong = {
  body: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

const uploadSong = {
  body: Joi.object().keys({
    song: Joi.string().required(),
    duration: Joi.number().required(),
  }),
};

module.exports = {
  downloadSong,
};
