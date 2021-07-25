const express = require('express');
const controller = require('../controllers/user.controller');
const router = express.Router();

router.post('/register', controller.register_user);
router.post('/login', controller.login_user);


module.exports = router;
