const router = require('express').Router();

const AccelController = require('../controllers/AccelController');

// [GET]
router.get('/data', AccelController.getData);

// [DELETE]

module.exports = router;
