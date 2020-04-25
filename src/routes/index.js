const express = require('express');
const router = express.Router();

const airlineService = require('../airline-service');

router.put('/airline-update', (req, res) => {
  airlineService.readFile(res);
});

module.exports = router;
