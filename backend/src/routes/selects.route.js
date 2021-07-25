const express = require('express');
const controller = require('../controllers/selects.controller');
const router = express.Router();

router.get('/selections/:username', controller.get_collected_cities);
router.post('/save/selections', controller.save_last_search);

module.exports = router;
