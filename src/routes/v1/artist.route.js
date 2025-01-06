const express = require('express');
const multer = require('../../middlewares/multer');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { artistValidation } = require('../../validations');
const { artistController } = require('../../controllers');

const noFile = multer.p.none();
const profile = multer.p.single('profile');

const router = express.Router();

router.get('/', noFile, artistController.getAllArtist);
router.post('/create', profile, validate(artistValidation.createArtist), artistController.createArtist);

router.get('/:id/', noFile, validate(artistValidation.getArtistByID), artistController.getArtistById);
router.post('/:id/update', profile, validate(artistValidation.updateArtist), artistController.updateArtist);
router.post('/:id/delete', noFile, validate(artistValidation.getArtistByID), artistController.deleteArtist);

module.exports = router;
