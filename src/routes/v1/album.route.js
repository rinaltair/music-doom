const express = require('express');
const multer = require('../../middlewares/multer');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { albumValidation } = require('../../validations');
const { albumController } = require('../../controllers');

const noFile = multer.p.none();
const artwork = multer.p.single('artwork');

const router = express.Router();

router.get('/', albumController.getAllAlbums);
router.get('/:id', noFile, validate(albumValidation.byID), albumController.getAlbumById);

router.post('/create', artwork, validate(albumValidation.createAlbum), albumController.createAlbum);
router.post('/:id/update', artwork, validate(albumValidation.updateAlbum), albumController.updateAlbum);
router.post('/:id/delete', noFile, validate(albumValidation.byID), albumController.deleteAlbum);

module.exports = router;
