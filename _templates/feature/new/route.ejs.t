---
to: src/routes/v1/<%= name.toLowerCase() %>.route.js
---
const express = require('express');
const multer = require('../../middlewares/multer');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { <%= name.toLowerCase() %>Validation } = require('../../validations');
const { <%= name.toLowerCase() %>Controller } = require('../../controllers');

const noFile = multer.p.none();
const profile = multer.p.single('profile');

const router = express.Router();



module.exports = router;