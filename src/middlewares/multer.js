const multer = require('multer');
const path = require('path');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const song = multer({
  preservePath: true,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.mp3'];
    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extension)) {
      cb(null, true);
    } else {
      cb(new ApiError(httpStatus.UNSUPPORTED_MEDIA_TYPE, 'Invalid file type. Only audio files (.mp3) are allowed!'));
    }
  },
});

const picture = multer({
  preservePath: true,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.png', '.jpg', '.jpeg'];
    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extension)) {
      cb(null, true);
    } else {
      cb(new ApiError(httpStatus.UNSUPPORTED_MEDIA_TYPE, 'Invalid file type. Only image files (.png, .jpg, .jpeg) are allowed!'));
    }
  },
});

module.exports = {
  s: song,
  p: picture,
};
