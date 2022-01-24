const {body}=require('express-validator');
const mainJson=require('../model/mainJson')
const db=mainJson('user');
const validaciones=[
    body('nombre').notEmpty().withMessage('Nombre obligatorio'),
    body('usuario').notEmpty().bail().withMessage('usuario es campo obligatorio')
    .isLength({min:4,max:16}).withMessage('el usuario debe contener un min de 4 y max de 16 caracteres'),
    //.notEmpty().bail().isEmail().withMessage('Campo obligatorio')
    body('email').notEmpty().withMessage('Email vacio').bail()
    .isEmail().withMessage('Ingrese mail valido').bail()
    .custom(value=>{
        const emailcheck=db.findMail(value)
        if(emailcheck){
            throw new Error('El mail esta en uso')
        }
        return true
    }),
    body('direccion').notEmpty().withMessage('Dirección campo obligatorio'),
    body('pass').notEmpty().withMessage('Contraseña campo obligatorio').isLength({min:5}).withMessage('La contraseña debe tener minimo 5 caracteres').custom((value,{req})=>{
        if(value!=req.body.pass1){
            throw new Error('Las contraseñas no coinciden')
        }
        return true
    })

]
module.exports=validaciones;