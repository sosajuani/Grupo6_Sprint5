const fs=require('fs');
let jsonDb=require('../model/mainJson.js');
let db=jsonDb('user');
const {compareSync, hashSync}=require('bcryptjs')
const {validatioResult, validationResult}=require('express-validator');
const { Console } = require('console');
const controllerPages = {
    'home': (req, res) => {
        res.render('pages/home.ejs')
    },
    'login': (req, res) => {
        res.render('pages/login.ejs')
    },
    'loginProcess': (req, res) => {
        let user = db.findMail(req.body.email)
        if(user){
            let confirm = compareSync(req.body.pass,user.password)
            if(!confirm){
                return res.render('pages/login.ejs',{password: !confirm ? "La contraseña ingresada no es correcta" : null, oldEmail: req.body.email})
            }
            req.session.user = user
            req.session.access = user.access
            req.session.cat = user.cat
            return res.redirect("/")
        }else{
            res.render('pages/login.ejs',{email: !user ? "El email ingresado no es correcto" : null})
        }
    },
    'logout': (req,res)=>{
        delete req.session.user
        res.redirect("/")
    },
    'carrito':(req,res) =>{
        res.render('pages/carrito.ejs')
    },
    'register':(req,res) =>{
        res.render('pages/register.ejs')
    },
    'regProcess':(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.render('pages/register.ejs',{
                errors:errors.mapped(),
                oldData:req.body,
            })
        }
        let id=req.params.id;
        const buscar=db.buscar(id);
        let body = req.body;
        let objetoNew={
            "id": 0,
            "nombre":req.body.nombre,
            "usuario":req.body.usuario,
            "email":req.body.email,
            "domicilio":req.body.direccion,
            "telf":req.body.telefono,
            "password":hashSync(req.body.pass,10),
            "cat":req.body.cat,
            "img":" ",
            "access":2,
        }
        console.log(req.body);
        db.crear(objetoNew);
        res.redirect("/")
    
    },
    'contacto':(req, res) =>{
        res.render('pages/contacto.ejs') 
    },
    'somos':(req, res) =>{
        res.render('pages/somos.ejs') /* res.render muestra el motor de plantilla/ valor */
    }     
}
module.exports = controllerPages;