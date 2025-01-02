const multer = require('multer');
const path = require('path');

const upload = multer({
  preservePath: true,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.mp3'];
    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only audio files (.mp3) are allowed!'), false);
    }
  },
});

module.exports = {
  u: upload,
};
