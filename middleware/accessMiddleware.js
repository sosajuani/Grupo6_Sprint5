module.exports = (req,res,next) => {
    let logged = null;
    // if(req.cookie && req.cookie.email){
    //     req.session.user = logged
    // }
    if(req.session && req.session.user) {
        logged = req.session.user
    }
    res.locals.user = logged
    return next()
}