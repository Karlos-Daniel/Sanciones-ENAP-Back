const{ Router }= require('express');
const {validarJWT} = require('../middlewares/validar-jwt')
const {body} = require('express-validator');
const {tipo_sancionPost,
    tipo_sancionPut,
    tipo_sancionDelete,
    tipo_sancionGet} = require('../controllers/tipo_sancionController');

const router = Router();

//router.post('/restaurante',errores,restaurantePost)
router.post('/tipo_sancionPost',tipo_sancionPost)
router.put('/tipo_sancionPost',tipo_sancionPut)
router.delete('/tipo_sancionPost',tipo_sancionDelete)
router.get('/tipo_sancionPost',tipo_sancionGet)

module.exports = router;