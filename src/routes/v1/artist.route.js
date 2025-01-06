const express = require('express');
const multer = require('../../middlewares/multer');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { artistValidation } = require('../../validations');
const { artistController } = require('../../controllers');

const router = express.Router();

router.route('/').get(multer.p.none(), artistController.getArtists);

router
  .route('/create')
  .post(multer.p.single('profile'), validate(artistValidation.createArtist), artistController.createArtist);

router.route('/:id/').get(multer.p.none(), validate(artistValidation.getArtistByID), artistController.getArtistById);
router
  .route('/:id/update')
  .post(multer.p.single('profile'), validate(artistValidation.updateArtist), artistController.updateArtist);
router.route('/:id/delete').post(multer.p.none(), validate(artistValidation.getArtistByID), artistController.deleteArtist);

module.exports = router;
