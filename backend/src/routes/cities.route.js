const express = require('express')
const controller = require('../controllers/city.controller')
const router = express.Router()

router.get('/findCity/:city', controller.cities_get_all);
router.post('/cities', controller.collected_cities);

module.exports = router;
