const express = require('express');
const router = express.Router();

const controllerProduct=require('../controller/controllerProduct');
const upload = require('../middleware/multerMiddleware');

//lista los productos
router.get('/', controllerProduct.productos);

//vista del formulario crear

router.get('/create', controllerProduct.create);
//accion del formulario crear
router.post('/', upload.single('img'), controllerProduct.crearAccion);

router.get('/:id/edit', controllerProduct.edit);
router.put('/:id/edit', upload.single('img'), controllerProduct.update);

router.get('/:id', controllerProduct.productDetail);
//accion eliminar
router.post('/:id', controllerProduct.productDelete);
module.exports=router;