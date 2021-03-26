const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    index: (req, res) =>{
        //res.send('Todos los productos');
        //res.sendFile(path.resolve('views/products.html'));
        //res.send('products');
        res.render('products',{products: products, toThousand});
    },
    detail:(req,res)=>{
        //res.send('detail');
        let product = products.find(product=>product.id==req.params.id)
		res.render('detail',{product,toThousand});
    },
    create:(req,res)=>{
        res.render('create');
    },
    store:(req,res)=>{
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

        let ids = products.map(p => p.id);//Array de los ids del archivo json

        /* Objeto Nuevo Producto */
        let newProduct = {
            id: Math.max(...ids)+1,
            ...req.body,
            image: image
        } 

        /* Add newProduct a products */
        products.push(newProduct)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

        /*Redireccionamiento a todos los productos */
		res.redirect('/');
    },
    edit:(req,res)=>{
        //res.send('EDITAR UN PRODUCTO');
        let productToEdit = products.find(product=>product.id==req.params.id)
		res.render('edit',{productToEdit,toThousand})
    },
    update:(req,res)=>{
        //res.send('ACTUALIZAR DATOS DE UN PRODUCTO');
        let id = req.params.id;//el id requerido
        let productToEdit = products.find(product => product.id == id)
        //busca el producto que tenga el mismo id del req

        let image; 
		if(req.file != undefined){ //si sube imagen
			image = req.file.filename //se le asigna a la variable image la nueva imagen
		} else {
			image = productToEdit.image//si no sube, se le asigna la imagen que tenia el producto a editar
		}

        /* CREANDO EL NUEVO OBJETO PRODUCTO EDITADO */
        productToEdit = {
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
		//guardo los cambios , y escribo nuevamente todos los productos en el json junt con el producto actualizado
		res.redirect('/');
    },
    destroy:(req,res)=>{
        //res.send('PRODUCTO ELIMINADO');
        let id = req.params.id; //se le asigna el id del req
        let finalProducts = products.filter(product => product.id != id);//crea un nuevo array con todos los productos que tenga un id distinta del req 
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));// guarda en el archivo el nuevo array en formato json
		res.redirect('/')//redirecciona al index
    }

}


module.exports = productsController;