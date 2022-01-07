const express = require('express');
const router = express.Router();
const controllerPerfil = require('../controller/controllerPerfil');

router.get('/:id', controllerPerfil.principal);
// /perfil/3/editar


module.exports=router;
