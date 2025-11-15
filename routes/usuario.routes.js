const{ Router }= require('express');
const {validarJWT} = require('../middlewares/validar-jwt')
const {usuariosPost,usuariosDelete,usuariosPut, usuariosGet}=require('../controllers/usuarioController');
const {check: body} = require('express-validator');

const router = Router();

const error =[
body('nombre1','El correo es obligatorio').not().isEmpty(),
body('apellido1','El apellido1 es obligatorio').not().isEmpty(),
body('password','La contraseña es obligatorio').not().isEmpty(),]

router.get('/usuario',usuariosGet);

router.post('/usuario',error,usuariosPost);
    
router.put('/usuario/:_id',error,usuariosPut);

router.delete('/usuario/:_id',usuariosDelete);



module.exports = router;