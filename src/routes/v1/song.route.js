const express = require('express');
const { u } = require('../../middlewares/multer');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const songValidation = require('../../validations/song.validation');
const songController = require('../../controllers/song.controller');

const router = express.Router();

router.route('/download').post(u.none(), validate(songValidation.downloadSong), songController.downloadSong);
router.route('/upload').post(u.single('file'), validate(songValidation.uploadSong), songController.uploadSong);

module.exports = router;
