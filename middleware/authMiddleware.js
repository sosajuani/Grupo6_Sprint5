const auth = {
    'logged': (req,res,next)=>{
        if(req.session.user != undefined){
            next();
        }else{
            res.redirect("/login");
        }
    },
    'visited':(req,res,next)=>{
        if(req.session.user != undefined){
            res.redirect("/perfil/1");
        }else{
            next();
        }
    }
}
module.exports = auth;