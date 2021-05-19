const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController')

const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');



router.get('/register',guestMiddleware,usersController.register);
router.post('/register',uploadFile.single('avatar'),validations,usersController.processRegister);

/*** EDIT USER ***/
router.get('/edit/:id', usersController.edit);//VISTA DE FORM DE EDICION DE REGISTRO
router.put('/update/:id',uploadFile.single('avatar'),validations, usersController.update);//GUARDAR DATOS ACTUALIZADOS


router.get('/login',guestMiddleware,usersController.login);
router.post('/login', usersController.loginProcess);

router.get('/profile',authMiddleware,usersController.profile);
router.get('/logout', usersController.logout);

module.exports = router;