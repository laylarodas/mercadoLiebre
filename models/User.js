// 1. Guardar al usuario en la db (archivo.json)
// 2. Buscar al usuario que se quiere loguear por su email
// 3. Buscar a un usuario por su id
// 4. Editar la informacion de un usuario
// 5. Eliminar a un usuario en la db
// Sistema CRUD

const fs = require('fs');

const User = {
    fileName: './data/usersDataBase.json', //variable que contiene la ruta al archivo jdon


    getData: function() {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    }, //retorna archivo json como un array de objetos


    generateId: function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },

    findAll: function () {
        return this.getData();
    }, // retorna el metodo anterior(array de objetos usuario)


    findPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },//busca un usuario en la base por Id
    
    findField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },//busca un usuario en la base por cualquier campo que se ingrese(email,fulName,etc)
    
    create: function(userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
        
    },//guardar el usuario en el archivo json
    //traer todos los usuario
    //pushear el nuevo usuario
    //escribir en el archivo json

    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    }
}


module.exports = User;