const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize');
const moment = require('moment');
const productsController = require('./productsController');
const { response } = require('express');

const usersController = {
    register: async function(req,res) {
        let profiles = await db.profiles.findAll();
        let categories = await db.categories_users.findAll();
        res.render('register',{profiles,categories});
    },
    processRegister: async function (req,res) {

        
        let profiles = await db.profiles.findAll();
        let categories = await db.categories_users.findAll();
        //res.send('Guardando Registro');

        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render('register',{
                errors: resultValidation.mapped(),
                oldData: req.body,
                profiles,
                categories
            })
        }


        
        let userInDB = await db.users.findOne({
            where: {
                email: req.body.email
            }
        })


        if(userInDB){
            return res.render('register',{
                errors:{
                    email: { 
                        msg: 'Este email ya esta registrado.'
                    }
                },
                oldData: req.body,
                profiles,
                categories
            })
        }

        let avatar;

        if(req.file != undefined){
            avatar = req.file.filename;
        }else{
            avatar = 'default-image-png';
        }

        await db.users.create({
            fullName: req.body.fullName,
            userName: req.body.userName,
            date: req.body.date,
            address: req.body.address,
            profileId: req.body.profileId,
            category_user_id: req.body.category_user_id,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: avatar
        })


        /* let userInDB = User.findField('email',req.body.email);

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

        let userCreate = User.create(userToCreate);*/

        res.redirect('/user/login');

        //res.send('Ok, Pasaste todas las validaciones puedes ingresar');
    },
    edit: async function (req,res) {
        let userToEdit = await db.users.findOne({where:{id: req.params.id}});
        userToEdit.date = moment(userToEdit.date,'YYYY-MM-DD').format('DD-MM-YYYY');

        let profiles = await db.profiles.findAll();
        let categories = await db.categories_users.findAll();
        //res.send(userToEdit);
        res.render('editRegister',{userToEdit,profiles,categories});
    },
    update: async function (req,res) {
        let userToEdit = await db.users.findByPk(req.params.id);

        let profiles = await db.profiles.findAll();
        let categories = await db.categories_users.findAll();

        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render('editRegister',{
                errors: resultValidation.mapped(),
                userToEdit,
                profiles,
                categories
            })
        }


        let avatar;

        if(req.file != undefined){
            avatar = req.file.filename;
        }else{
            avatar = userToEdit.avatar;
        }


        await db.users.update({
            fullName: req.body.fullName,
            userName: req.body.userName,
            date: req.body.date,
            address: req.body.address,
            profileId: req.body.profileId,
            category_user_id: req.body.category_user_id,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: avatar
        },{
            where: {
                id: req.params.id
            }
        })

        res.redirect('/user/profile');


    },
    login: function (req,res) {
        res.render('login');
    },
    loginProcess: function (req,res) {
        //let userToLogin = User.findField('email', req.body.email);
        db.users.findOne({
            where: {
                email: req.body.email
            }
        }).then(response =>{
            let userToLogin = response;
            if (userToLogin) {
                let okPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
                
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
        }).catch(error=>error)
    },
    profile:function (req,res) {
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