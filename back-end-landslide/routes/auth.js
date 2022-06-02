const router = require('express').Router();

const authController = require('../controllers/AuthController');

// [GET]
router.post('/register', authController.register);

module.exports = router;
