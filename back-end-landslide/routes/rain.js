const router = require('express').Router();

const RainController = require('../controllers/RainController');

// [GET]
router.get('/data-by-day', RainController.getDataByDay);
router.get('/data-by-month', RainController.getDataByMonth);


module.exports = router;
