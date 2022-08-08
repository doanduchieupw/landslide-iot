const router = require('express').Router();

const contactController = require('../controllers/ContactController');

router.post('/', contactController.createContact);
router.post('/mess', contactController.addMessage);
router.get('/:userId', contactController.userContact);
router.get('/find/:firstId/:secondId', contactController.findContact);
router.get('/getMessage/:chatId', contactController.getMessages)


module.exports = router;