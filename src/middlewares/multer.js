const multer = require('multer');
const path = require('path');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const upload = multer({
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

module.exports = {
  u: upload,
};
