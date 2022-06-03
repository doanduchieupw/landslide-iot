const router = require('express').Router();

const userController = require('../controllers/UserController');
const middleController = require('../controllers/MiddlewareController');

// [GET]
router.get(
    '/allUser',
    middleController.verifyToken,
    userController.getAllUsers
);

// [DELETE]
router.delete('/:id',middleController.verifyTokenAndAdminAuth ,userController.deleteUser)

module.exports = router;
