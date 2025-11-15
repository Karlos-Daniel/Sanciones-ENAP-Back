const{ Router }= require('express');

const {validarJWT} = require('../middlewares/validar-jwt');

const { sancionesPost,
    sancionesPut,
    sancionesDelete,
    sancionesGet} = require('../controllers/sancionesController');


const router = Router();

const camposVacios = [
    validarJWT,
]


router.get('/sancionesGet',sancionesGet)
router.post('/sancionesPost',sancionesPost)
router.put('/sancionesPut',sancionesPut)
router.delete('/sancionesDelete',sancionesDelete)


module.exports = router;