const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const artistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    profileUri: {
      type: String,
      required: true,
      trim: true,
    },
    // albums: {
    //   type: ObjectId,
    //   required: true,
    //   trim: true,
    // },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
artistSchema.plugin(toJSON);
artistSchema.plugin(paginate);

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;

/**
 * @typedef Artist
 * @property {ObjectId} id
 * @property {string} name
 * @property {string} bio
 * @property {string} profile_uri
 * @property {string} alboums
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
