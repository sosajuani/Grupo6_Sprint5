module.exports = (req,res,next) => {
    let logged = null;
    let access = null;
    let cat = null;
    // if(req.cookie && req.cookie.email){
    //     req.session.user = logged
    // }
    if(req.session && req.session.user) {
        logged = req.session.user
        access = req.session.access
        cat = req.session.cat
    }
    res.locals.user = logged
    res.locals.access = access
    res.locals.cat = cat
    return next()
}