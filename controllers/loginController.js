const {response, request, json} = require('express');
const {Persona} = require('../models');
const {generarJWT} = require('../helpers/generar-jwt')
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');



const login = async(req= request, res= response)=>{
    
    try {
        const {cc,password} = req.body;

        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                errores: errors.array()
            })
        }

        //Verificar si el email existe
        const persona = await Persona.findOne({cc}).populate("rol","descripcion")
            
        if(!persona){
            return res.status(400).json({errores:[{
                msg: 'Correo no se encuentra registrado'
            }]})
        }
        
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, persona.password);
        if(!validPassword){
            return res.status(400).json({errores:[{
                msg: 'Contraseña incorrecta'
            }]})
        }
        console.log(persona);
        
        console.log(persona.grado !="6917c83357c3ad08b23a3427");
        if(persona.rol != '6917a498a6e72c593fa17998'){
            const token = await generarJWT(persona._id);
            res.json({
                token,
                ID_autoridad:persona._id,
                rol: persona.rol.descripcion
            })
        }else{
            const token = await generarJWT(persona._id);
            res.json({
                token,
                ID_Alumno:persona._id,
                rol: persona.rol.descripcion
            })
        }
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al logear'
        });
    }
}

module.exports = {
    login,
}