const express = require('express')
const controller = require('../controllers/selects.controller')
const router = express.Router()

router.get('/selections', controller.get_collected_cities);


module.exports = router;
