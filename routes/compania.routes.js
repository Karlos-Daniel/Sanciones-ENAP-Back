const{ Router }= require('express');
const {validarJWT} = require('../middlewares/validar-jwt')
const {body} = require('express-validator');
const {companiaPost,
    companiaPut,
    companiaDelete,
    companiaGet} = require('../controllers/companiaController');

const router = Router();

//router.post('/restaurante',errores,restaurantePost)
router.post('/companiaPost',companiaPost)
router.put('/companiaPost',companiaPut)
router.delete('/companiaPost',companiaDelete)
router.get('/companiaPost',companiaGet)

module.exports = router;