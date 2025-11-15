const{ Router }= require('express');

const {validarJWT} = require('../middlewares/validar-jwt');

const { rolPost,
    rolPut,
    rolDelete,
    rolGet} = require('../controllers/rolController');


const router = Router();

const camposVacios = [
    validarJWT,
]


router.get('/rolGet',rolGet)
router.post('/rolPost',rolPost)
router.put('/rolPut',rolPut)
router.delete('/rolDelete',rolDelete)


module.exports = router;