const router = require('express').Router();

const TempController = require('../controllers/TempController');

// [GET]
router.get('/data-by-day', TempController.getDataByDay);
router.get('/data-by-month', TempController.getDataByMonth);
router.get('/data-by-year', TempController.getDataByYear);
router.get('/data-by-range/:startDay&:endDay', TempController.getDataByRange);


module.exports = router;
