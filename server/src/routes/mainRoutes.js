const express = require('express');
const router = express.Router();

const controller = require('../controller/wishesController');

router.post('/wishes', controller.upload.single('image'), controller.uploadImage);
router.get('/wishes', controller.readAllwishes);
    
module.exports = router;