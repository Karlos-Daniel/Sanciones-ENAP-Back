const{ Router }= require('express');

const {validarJWT} = require('../middlewares/validar-jwt');

const { sancionesPost,
    sancionesPut,
    sancionesDelete,
    sancionesGet,
sancionesCompanias,
getSancionesPorCadete} = require('../controllers/sancionesController');


const router = Router();

const camposVacios = [
    validarJWT,
]


router.get('/sancionesGet',sancionesGet)
router.post('/sancionesPost',sancionesPost)
router.put('/sancionesPut/:sancionID',sancionesPut)
router.delete('/sancionesDelete',sancionesDelete)
router.get('/sanciones-cd/:cadeteID',getSancionesPorCadete)
router.get('/sancionesCompanias/:companiaID',sancionesCompanias)


module.exports = router;