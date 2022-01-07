const fs=require('fs');
let jsonDb=require('../model/mainJson.js');
let db=jsonDb('products');

const controllerProduct={
    productos:(req, res) =>{
        const productos=db.all() 
        res.render('pages/productos.ejs',{db:productos})
    },
    create:(req,res)=>{
        res.render('admin/product/addProduct.ejs')
    },
    crearAccion:(req,res)=>{
        let body = req.body;
        body.img = req.file.filename;
        // const objt = {
        //     id:0,
        //     name:body.name,
        //     precio:body.price,
        //     descripcion:body.description,
        //     img:req.file.filename,
        //     peso:body.weight,
        //     tamanio:body.size,
        //     cat:body.cat,
        //     offPorcen:body.discount,
        //     cantidad:1000
        // }
        db.crear(body);
        res.redirect("/")
    },
    edit:(req,res)=>{
        let id=req.params.id;
        const buscar=db.buscar(id);
        res.render('admin/product/editProduct.ejs',({productoEncontrado:buscar}))
    },
    update:(req,res)=>{
        let id=req.params.id;
        const buscar=db.buscar(id);
        let body = req.body;
        body.id = buscar.id;
        body.img = req.file.filename;
        // let objetoNew={
        //     "id":buscar.id,
        //     "name":req.body.name,
        //     "precio":req.body.precio,
        //     "descripcion":req.body.descripcion,
        //     "img":" ",
        //     "peso":req.body.peso,
        //     "tamanio":req.body.tamanio,
        //     "cat":req.body.cat,
        //     "offPorcen":req.body.offPorcen,
        //     "cantidad":req.body.cantidad,
        // }
        db.actualizar(body);
        res.redirect("/")
    },
    productDelete:(req,res)=>{
        db.eliminar(req.params.id);
        res.redirect('/');
    },
    productDetail:(req, res) =>{
        let articulo = db.buscar(req.params.id)
        res.render('pages/productDetail.ejs',{articulo})
    }
};
module.exports=controllerProduct;