const { response, request } = require("express");
const { Rol } = require('../models');
const {validationResult} = require('express-validator');
const moment = require('moment')

const rolPost = async (req = request, res = response) => {
    try {
        const {
            descripcion
        } = req.body
 
        const rolValidas = ["Alumno", "Admin"]
        if(!rolValidas.includes(descripcion)){
            return res.status(400).json({errores:
                [{msg:'no es un rol valido'}]
            })
        }
        //const dateMoment = new Date(fecha)
        //const fechaMoment = moment(dateMoment).format('MM/DD/YYYY');    
           
        const data = {
            descripcion
        }

        const rol = new Rol(data)

        await rol.save()

        return res.status(201).json({
            msg:'rol creado con exito'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: error
        })
    }
}

//editar
const rolPut = async (req = request, res = response) => {
    try {

        const { _id } = req.params;

        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                errores: errors.array()
            })
        } 

        const {
            descripcion
        } = req.body

       
        const data = {
            descripcion
        }

       await Rol.findByIdAndUpdate(_id,data)

        return res.status(201).json({
            msg:'Rol modificada con exito'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: error
        })
    }
}

//borrar
const rolDelete = async (req = request, res = response) => {

    try {
        const { _id } = req.params;

        await Rol.findByIdAndDelete(_id);

        return res.status(200).json({
            msg: `Rol borrada con exito`
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: error
        })
    }


}

const rolGet = async (req = request, res = response) => {

    try {

        const rol = await Rol.find();

        return res.json(rol)

    } catch (error) {

        console.log(error);
        return res.status(500).json(error)

    }

}


module.exports = {
    rolPost,
    rolPut,
    rolDelete,
    rolGet
}