const router = require('express').Router();

const sensorController = require('../controllers/SensorController');

// [GET]
router.get('/data', sensorController.getData);

// [DELETE]

module.exports = router;
