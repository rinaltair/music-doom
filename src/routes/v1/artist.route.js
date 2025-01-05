const express = require('express');
const multer = require('../../middlewares/multer');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { artistValidation } = require('../../validations');
const { artistController} = require('../../controllers');

const router = express.Router();

router.route('/create').post(multer.p.single('profile'), validate(artistValidation.createArtist), artistController.createArtist);

module.exports = router;
