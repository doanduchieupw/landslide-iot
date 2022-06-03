const router = require('express').Router();

const authController = require('../controllers/AuthController');
const middleController = require('../controllers/MiddlewareController');

// [POST]
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', middleController.verifyToken, authController.logout);

module.exports = router;
