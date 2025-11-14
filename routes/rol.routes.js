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


router.get('/rolPost',rolGet)
router.post('/rolPost',rolPost)
router.put('/rolPost',rolPut)
router.delete('/rolPost',rolDelete)


module.exports = router;