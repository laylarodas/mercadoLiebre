const { body } = require('express-validator');
const path = require('path');


const validations = [
    body('fullName').notEmpty().withMessage('Tienes que escribir un nombre completo'),
    body('userName').notEmpty().withMessage('Tienes que escribir un nombre de usuario'),
    body('address').notEmpty().withMessage('Tienes que escribir un domicilio'),
    body('date').notEmpty().withMessage('Tienes que ingresar fecha de nacimiento'),
    body('email').notEmpty().withMessage('Tienes que escribir un correo electronico').bail().isEmail().withMessage('Debes escribir un formato de correo electronico válido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('profile').notEmpty().withMessage('Tienes que elegir un perfil'),
    body('category').notEmpty().withMessage('Tienes que elegir intereses'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = [".jpg", ".png",".gif"];

        if(!file){
            throw new Error('Tienes que subir una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(',')}`);
            }
        }
        return true;
    })
]


module.exports = validations;