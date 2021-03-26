const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const productsController = require('../controllers/productsController');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img/products')
    },
    filename: function(req,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
        
        /* fieldname	Nombre de campo especificado en el formulario	
         originalname	Nombre del archivo en la computadora del usuario */
    }
})


var upload = multer({ storage: storage });



router.get('/', productsController.index);//VISTA DE TODOS LOS PRODUCTOS
router.get('/detail/:id/', productsController.detail);//VISTA DEL DETALLE DE UN PRODUCTO

router.get('/create', productsController.create);// VISTA DE FORMULARIO DE CREACION
router.post('/',upload.single('image'),productsController.store);// GUARDAR NUEVO PRODUCTO

router.get('/edit/:id', productsController.edit);//VISTA DE FORMULARIO DE EDICION
router.put('/:id',upload.single('image'), productsController.update);//GUARDAR DATOS ACTUALIZADOS

router.delete('/:id', productsController.destroy);//ELIMINAR UN PRODUCTO


module.exports = router;