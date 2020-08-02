var express = require('express');
var router = express.Router();




router.get('/', function (req, res) {
  res.json('Obteniendo mensajes');
});

module.exports = router;