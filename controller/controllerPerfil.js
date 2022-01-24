const controllerPerfil={
    'principal':(req,res)=>{
        res.render('user/perfil.ejs',{title: "Perfil"})
    }
}
module.exports=controllerPerfil; 