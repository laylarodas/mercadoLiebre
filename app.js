const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride =  require('method-override');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
    secret: "Shh, It' a secret ",
    resave: false,
    saveUninitialized: false
}));


app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(cookieParser());
//const publicPath = path.resolve(__dirname, './public');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(userLoggedMiddleware);

const mainRoutes = require('./routes/main');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/user', usersRoutes);


app.listen(process.env.PORT || 3000, function(){
    console.log('Servidor corriendo en el puerto 3000');
});

app.use((req,res,next)=>{
    res.status(404).render('not-found');
});

/*

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/home.html'));
});


app.get('/register', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/register.html'));
});

app.get('/login', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});


app.post('/register', (req,res)=>{
    res.send(req.body);
});

app.post('/', (req,res)=>{
    res.send(req.body);
});

*/