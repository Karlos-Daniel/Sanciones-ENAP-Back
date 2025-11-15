const{ Router }= require('express');
const {validarJWT} = require('../middlewares/validar-jwt')
const {body} = require('express-validator');
const {duracionPost,
    duracionPut,
    duracionDelete,
    duracionGet} = require('../controllers/duracion_sancionController');

const router = Router();

//router.post('/restaurante',errores,restaurantePost)
router.post('/duracionPost',duracionPost)
router.put('/duracionPost',duracionPut)
router.delete('/duracionPost',duracionDelete)
router.get('/duracionPost',duracionGet)

module.exports = router;