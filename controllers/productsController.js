const path = require('path');
const fs = require('fs');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize');
const moment = require('moment');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    index: async function (req, res) {
        //res.send('Todos los productos');
        //res.sendFile(path.resolve('views/products.html'));
        //res.send('products');
        //res.render('products',{products: products, toThousand});

        let products = await db.products.findAll();
        res.render('products',{products: products, toThousand});
    },
    detail:async function(req,res) {
        //res.send('detail');
        /*let product = products.find(product=>product.id==req.params.id)
		res.render('detail',{product,toThousand});*/

        let product = await db.products.findOne({
            where: {
                id: req.params.id
            }
        });

        res.render('detail',{product,toThousand});
    },
    create:async function(req,res) {
        let categories = await db.categories.findAll();

        res.render('create',{categories});
    },
    store: async function(req,res) {
        //res.send('GUARDAR NUEVO PRODUCTO');

        console.log(req.file);
        /* Image */
        let image;

        if(req.file != undefined){
            image = req.file.filename;
        }else{
            image = 'default-image.png';
        }

        /* Ids */

        //let ids = products.map(p => p.id);//Array de los ids del archivo json

        /* Objeto Nuevo Producto */
        /*let newProduct = {
            id: Math.max(...ids)+1,
            ...req.body,
            image: image
        } */

        /* Add newProduct a products */
        /*products.push(newProduct)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));*/

        await db.products.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            image: image,
            categoryId: req.body.categoryId
        });

        /*Redireccionamiento a todos los productos */
		res.redirect('/');
    },
    edit:async function(req,res){
        //res.send('EDITAR UN PRODUCTO');
        //let productToEdit = products.find(product=>product.id==req.params.id)

        let productToEdit = await db.products.findByPk(req.params.id)
        let categories = await db.categories.findAll();

		res.render('edit',{productToEdit,categories,toThousand})
    },
    update:async function(req,res){
        //res.send('ACTUALIZAR DATOS DE UN PRODUCTO');
        //let id = req.params.id;//el id requerido
        //let productToEdit = products.find(product => product.id == id)
        //busca el producto que tenga el mismo id del req

        let productToEdit = await db.products.findByPk(req.params.id);

        let image; 
		if(req.file != undefined){ //si sube imagen
			image = req.file.filename //se le asigna a la variable image la nueva imagen
		} else {
			image = productToEdit.image//si no sube, se le asigna la imagen que tenia el producto a editar
		}

        /* CREANDO EL NUEVO OBJETO PRODUCTO EDITADO */
        /*productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: image,
		};

        let newProducts = products.map(product => {
			// si el producto id es igual al producto editado, entonces asignoelproducto editado al producto del json con el mismo id
			if (product.id == productToEdit.id) {
				return product = {...productToEdit};
			}
			//si no retorno el producto como estaba
			return product;
		})
        fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		//guardo los cambios , y escribo nuevamente todos los productos en el json junt con el producto actualizado*/
        await db.products.update({
            ...req.body,
            image: image
        },{
            where: {
                id: req.params.id
            }
        })
		res.redirect('/');
    },
    destroy:async function(req,res){
        //res.send('PRODUCTO ELIMINADO');
        //let id = req.params.id; //se le asigna el id del req
        //let finalProducts = products.filter(product => product.id != id);//crea un nuevo array con todos los productos que tenga un id distinta del req 
		//fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));// guarda en el archivo el nuevo array en formato json

        await db.products.destroy({
            where:{
                id:req.params.id,
            }
        });
        
		res.redirect('/')//redirecciona al index
    }

}


module.exports = productsController;