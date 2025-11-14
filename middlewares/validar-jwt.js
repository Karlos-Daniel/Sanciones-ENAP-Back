const { response } = require('express');
const jwt = require('jsonwebtoken');

const {Persona} = require('../models'); 

const validarJWT = async(req, res=response, next)=>{
    
    try {
        const token = await req.header('token');

        if(!token){
            return res.status(401).json({
                msg: "No hay token en la peticion"
            }); 
        }

                
        
        const tokenValidado = jwt.verify(token,process.env.SECRET_KEY,function(err, decoded){
            if (err) {
                return res.status(401).json({
                    msg:'token modificado'
                });
            }});
            
        const decode = jwt.decode(token)
        
        const usuarioAuth= await Persona.findById(decode.uid);

        if(!usuarioAuth){
            res.status(401).json({
                msg: "Usuario no existe en la DB"
            }); 
        }

        req.usuarioAuth = usuarioAuth;

        req.uid = tokenValidado;

        next();   
        
    } catch (error) {
        console.log(error);
    }
   
}

module.exports = {
    validarJWT
}