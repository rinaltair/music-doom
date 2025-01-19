const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const albumSchema = mongoose.Schema(
  {
    // Create your model here
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // artist: {
    //   type: ObjectId,
    //   required: true,
    //   trim: true,
    // },
    releaseDate: {
      type: Date,
      required: true,
      trim: true,
    },
    artworkUri: {
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
albumSchema.plugin(toJSON);
albumSchema.plugin(paginate);

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
