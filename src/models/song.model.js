const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const songSchema = mongoose.Schema(
  {
    song: {
      type: String,
      required: true,
      trim: true,
    },
    // artist: {
    //   type: ObjectId,
    //   required: true,
    //   trim: true,
    // },
    // album: {
    //   type: ObjectId,
    //   required: true,
    //   trim: true,
    // },
    size: {
      type: Number,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      trim: true,
    },
    uri: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json

songSchema.plugin(toJSON);
songSchema.plugin(paginate);

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
