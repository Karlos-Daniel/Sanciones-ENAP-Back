const{ Router }= require('express');
const {login}=require('../controllers/loginController');
const {body,check} = require('express-validator');

const router = Router();

router.post('/login'

,[
    body('cc','esta vacio este campo').not().isEmpty(),
    body('password','esta vacio este campo').not().isEmpty()
],

login);

module.exports = router;