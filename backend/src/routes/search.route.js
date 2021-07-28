const express = require('express');
const controller = require('../controllers/search.controller');
const router = express.Router();

router.get('/topSearched/:limit', controller.most_common_searches);

module.exports = router;
