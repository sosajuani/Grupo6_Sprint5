const express = require('express');
const app = express();
const path = require('path');
const  methodOverride = require('method-override')
const cookieParser = require("cookie-parser")
const session = require("express-session")
const accessMiddleware = require('./middleware/accessMiddleware');

//motor de plantilla
app.set('views engine','ejs');
app.set('views',path.resolve(__dirname,'views'));

//carpeta publica
app.use(express.static('public'));

//para usar la informacion
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//app.use(cookieParser)
app.use(session({
    secret: "123",
    resave: false,
    saveUninitialized: true
}))

//middleware de session
app.use(accessMiddleware)

//override
app.use(methodOverride('_method'));

//requerimos rutas main
const rutasPages = require('./routes/pagesRoutes');
//requerimos rutas perfil
const rutasPerfil= require('./routes/perfilRoutes')
//requerimos rutas admin
const rutasAdmin= require('./routes/adminRoutes')
//ruta de productos
const rutasProducts=require('./routes/productsRoutes')
app.use('/',rutasPages);
app.use('/perfil',rutasPerfil);
app.use('/admin',rutasAdmin);
app.use('/products',rutasProducts)



app.listen(process.env.PORT || 3000, () => console.log('servidor funcionando'));