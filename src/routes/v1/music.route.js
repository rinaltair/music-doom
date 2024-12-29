const express = require('express');
const multer = require('multer');
const f = multer({ preservePath: true });

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const musicController = require('../../controllers/music.controller');

const router = express.Router();

router.route('/')
  .get(musicController.getMusic)
  .post(f.single('music'), musicController.postMusic)
module.exports = router;
