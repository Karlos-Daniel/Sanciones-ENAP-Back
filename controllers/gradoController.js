    const { response, request } = require("express");
const { Grado } = require('../models');
const {validationResult} = require('express-validator');
const moment = require('moment')

const gradoPost = async (req = request, res = response) => {
    try {
        const {
            descripcion
        } = req.body
 
        //const dateMoment = new Date(fecha)
        //const fechaMoment = moment(dateMoment).format('MM/DD/YYYY');    
           
        const data = {
            descripcion
        }

        const grado = new Grado(data)

        await grado.save()

        return res.status(201).json({
            msg:'Grado creado con exito'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: error
        })
    }
}

//editar
const gradoPut = async (req = request, res = response) => {
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

       await Grado.findByIdAndUpdate(_id,data)

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
const gradoDelete = async (req = request, res = response) => {

    try {
        const { _id } = req.params;

        await Grado.findByIdAndDelete(_id);

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

const gradoGet = async (req = request, res = response) => {

    try {

        const grado = await Grado.find();

        return res.json(grado)

    } catch (error) {

        console.log(error);
        return res.status(500).json(error)

    }

}


module.exports = {
    gradoPost,
    gradoPut,
    gradoDelete,
    gradoGet
}