const express = require('express');
const multer = require('multer');
const f = multer({ preservePath: true });

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const songValidation = require('../../validations/song.validation');
const songController = require('../../controllers/song.controller');

const router = express.Router();

router.route('/download').post(f.none(), validate(songValidation.downloadSong), songController.downloadSong);
router.route('/upload').post(f.single('file'), validate(songValidation.uploadSong), songController.uploadSong);

module.exports = router;
