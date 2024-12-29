const express = require('express');
const multer = require('multer');
const f = multer({ preservePath: true });

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const songController = require('../../controllers/song.controller');

const router = express.Router();

router.route('/')
  .get(songController.downloadTrack)
  .post(f.single('song'), songController.upploadTrack)
module.exports = router;
