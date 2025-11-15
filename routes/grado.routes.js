const{ Router }= require('express');
const {validarJWT} = require('../middlewares/validar-jwt')
const {body} = require('express-validator');
const { gradoPost,
    gradoPut,
    gradoDelete,
    gradoGet} = require('../controllers/gradoController');

const router = Router();

//router.post('/restaurante',errores,restaurantePost)
router.post('/gradoPost',gradoPost)
router.put('/gradoPut',gradoPut)
router.delete('/gradoDelete',gradoDelete)
router.get('/gradoGet',gradoGet)

module.exports = router;