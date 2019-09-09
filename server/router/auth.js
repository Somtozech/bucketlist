const router = require('express').Router();
const authController = require('../controllers/auth');
const validation = require('../middleware/validate');
const checkAuthorization = require('../middleware/check-auth');

router.post('/login', validation.checkLoginBodyIsValid, authController.login);

router.post('/signup', validation.checkLoginBodyIsValid, authController.signup);

router.get('/logout', checkAuthorization, authController.logout);

module.exports = router;
