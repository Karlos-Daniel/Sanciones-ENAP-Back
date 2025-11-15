const{response,request}= require('express');
const Usuario = require('../models/personaModel')
const {isValidObjectId}=require('mongoose')
const {validationResult} = require('express-validator');
const brcryptjs = require('bcryptjs');


const usuariosPost = async(req = request, res = response)=>{
    try {
        
      const {nombre1,
            nombre2,
            apellido1,
            apellido2,
            cc,
            rol,
            grado,
            compañia,
            guardia,
            password} = req.body;
            
            const errors = validationResult(req);
        

            const ccValido = Usuario.find({cc})

            if(!ccValido){
                return res.status(400).json({errores:[{
                    msg:'Ya ests cc se encuentra registrado'
                }]})
            }
            
            const data ={
            nombre1,
            nombre2,
            apellido1,
            apellido2,
            cc,
            rol,
            grado,
            compañia,
            guardia,
            password
            }
            
            const usuario = new Usuario(data);
            //Encriptar contraseña
            const salt =  brcryptjs.genSaltSync();
            usuario.password = brcryptjs.hashSync(password,salt);
            
        
        //Guardar en DB
        await usuario.save();
        res.json({
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500);
    }
 }
 const usuariosPut = async (req = request, res = response) => {
    try {
        const { _id } = req.params;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errores: errors.array()
            });
        }

        // Validar ID
        if (!isValidObjectId(_id)) {
            return res.status(400).json({
                errores: [{
                    msg: `El ID ${_id} no es válido`
                }]
            });
        }

        const existe = await Usuario.findById(_id);

        if (!existe) {
            return res.status(400).json({
                errores: [{
                    msg: `No existe un usuario con el ID ${_id}`
                }]
            });
        }

        // Campos que sí pueden actualizarse
        const {
            nombre1,
            nombre2,
            apellido1,
            apellido2,
            cc,
            rol,
            grado,
            compañia,
            guardia,
            password
        } = req.body;

        const data = {
            nombre1,
            nombre2,
            apellido1,
            apellido2,
            cc,
            rol,
            grado,
            compañia,
            guardia
        };

        // Si envía contraseña, entonces se encripta
        if (password) {
            const salt = bcryptjs.genSaltSync();
            data.password = bcryptjs.hashSync(password, salt);
        }

        await Usuario.findByIdAndUpdate(_id, data, { new: true });

        return res.json({
            msg: 'Usuario actualizado con éxito',
            data
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno en el servidor'
        });
    }
};


 const usuariosDelete = async(req = request, res = response)=>{
try {
    
    const {_id}= req.params;

    const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                errores: errors.array()
            })
        }
    
    if(!isValidObjectId(_id)){
        return res.status(400).json({errores:[{
            msg:`este id: ${_id} no es de mongo`
        }]})
    }
    const existe = await Usuario.findById(_id)
    
    if(!existe){
        return res.status(400).json({errores:[{
            msg:`Ese id no pertence a ningun usuario`
        }]})
    } 
    //Convertimos el estado del usuario en false
    const usuario = await Usuario.findByIdAndDelete(id);


  return res.json({
        msg: 'usuario borrado con exito'
   })

} catch (error) {
    console.log(error);
        res.status(500);
}
}

const usuariosGet = async(req = request, res = response)=>{
    try {
        const usuarios = await Usuario.find({})
        
        return res.json(usuarios)

    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
        
    }
}
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosDelete,
    usuariosPost
}