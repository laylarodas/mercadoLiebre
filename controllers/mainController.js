const fs = require('fs');
const path = require('path');


const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize');
const moment = require('moment');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
    index: async function (req,res) {
        //res.sendFile(path.resolve('views/home.html'));
        //res.render('home');

        //const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); //lee el archivo guardado en la variable productsFilePath
		//const inSale = products.filter(product=>product.category=='in-sale');//filtro los productos in-sale
		//const visited = products.filter(product=>product.category=='visited');//filtrolos productos visited
		//res.render('home',{inSale,visited,toThousand}); //renderizo la vista, envio datos de la base
        /*const inSale = products.filter(product => product.category == 'in-sale');
        const visited = products.filter(product => product.category == 'visited');

        res.render('home',{inSale, visited, toThousand});*/

        let inSale = await db.products.findAll({
            where: {
                categoryId : 1
            }
        });
        let visited = await db.products.findAll({
            where: {
                categoryId : 2
            }
        });

        res.render('home',{inSale,visited,toThousand});

    },
    contacto: (req,res) => {
        res.send('contacto');
    },
    search: async function (req,res) {
        /*
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //lee los productos del archivo json*/
		let search = req.query.keywords;
        //le asigna a la variable search el valor ingresado en el input search
		/*let productsToSearch = products.filter(product => product.name.toLowerCase().includes(search));	//filtra los productos del archivo , comparando el name con el valor ingresado en search
		res.render('results', { 
			products: productsToSearch, 
			search,
			toThousand,
		});*/
        //renderiza la vista results se pasa como el objeto productos con los valores de productsToSearch(productos que coinciden con la bsuqueda, el valor de la variable search, la funcion separador de miles) 
        
        
        //res.send('Buscador de productos');
        let productsToSearch = await db.products.findAll({
            where: {
                name: {[Op.like]: `%${search}%`}
            }
        });

        res.render('results',{
            products: productsToSearch,
            search,
            toThousand
        })

    }
    
}

module.exports = mainController;