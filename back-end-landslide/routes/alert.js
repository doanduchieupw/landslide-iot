const router = require('express').Router();

const AlertController = require('../controllers/AlertController');

// [GET]
router.get('/data', AlertController.getData);

// [DELETE]

module.exports = router;