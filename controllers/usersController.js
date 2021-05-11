const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');


const usersController = {
    register: function (req,res) {
        res.render('register');
    },
    processRegister: function (req,res) {
        //res.send('Guardando Registro');
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render('register',{
                errors: resultValidation.mapped(),
                oldData: req.body 
            })
        }


        let userInDB = User.findField('email',req.body.email);

        if(userInDB){
            return res.render('register',{
                errors:{
                    email: { 
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body
            })
        }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }

        let userCreate = User.create(userToCreate);
        res.redirect('/user/login');

        //res.send('Ok, Pasaste todas las validaciones puedes ingresar');
    },
    login: function (req,res) {
        res.render('login');
    },
    loginProcess:function (req,res) {
        let userToLogin = User.findField('email', req.body.email);
        
        
        if (userToLogin) {
            let okPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
            
            if (okPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if(req.body.rememberUser) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000*60)*60})
                }

                return res.redirect('/user/profile');
            }
            return res.render('login', {
                errors: {
                    email:{
                        msg: 'Las credenciales son invalidas'
                    }
                }
            });
        }
        return res.render('login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
    },
    profile: function (req,res) {
        res.render('profile',{
            user: req.session.userLogged
        });
    },
    logout: function(req,res) {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}


module.exports = usersController;