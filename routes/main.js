const express = require('express');

const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.index);

router.get('/contacto', mainController.contacto);

router.get('/search', mainController.search);//no esta creado el metodo

module.exports = router;