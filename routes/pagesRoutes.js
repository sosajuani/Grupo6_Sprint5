const express = require('express');
const router = express.Router();
const controllerPages = require('../controller/controllerPages')
const validacion=require('../middleware/validation')

router.get('/', controllerPages.home);
router.get('/login', controllerPages.login);
router.post('/login', controllerPages.loginProcess);

router.get('/register', controllerPages.register);
router.post('/register', validacion,controllerPages.regProcess);

router.get('/carrito', controllerPages.carrito);
router.get('/contacto', controllerPages.contacto);
router.get('/somos', controllerPages.somos);



module.exports = router;