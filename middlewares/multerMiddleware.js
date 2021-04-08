const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./public/img/avatars');
    },
    filename: (req,file,cb)=> {
        let filename = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null,filename);
    }
});

const uploadFile = multer({storage: storage});

module.exports = uploadFile;