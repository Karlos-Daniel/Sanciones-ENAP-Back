const { response, request } = require("express");
const { Tipo_sancion} = require('../models');
const {validationResult} = require('express-validator');
const moment = require('moment')

const tipo_sancionPost = async (req = request, res = response) => {
    try {
        const {
            descripcion
        } = req.body
 
        const tipo_sancionValidas = [1,2,3,4,5,6,7,8,"DIA"]
        if(!tipo_sancionValidas.includes(descripcion)){
            return res.status(400).json({errores:
                [{msg:'no es una duracion valida'}]
            })
        }
        //const dateMoment = new Date(fecha)
        //const fechaMoment = moment(dateMoment).format('MM/DD/YYYY');    
           
        const data = {
            descripcion
        }

        const tipo = new Tipo_sancion(data)

        await tipo.save()

        return res.status(201).json({
            msg:'duracion creado con exito'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: error
        })
    }
}

//editar
const tipo_sancionPut = async (req = request, res = response) => {
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

       await Tipo_sancion.findByIdAndUpdate(_id,data)

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
const tipo_sancionDelete = async (req = request, res = response) => {

    try {
        const { _id } = req.params;

        await Tipo_sancion.findByIdAndDelete(_id);

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

const tipo_sancionGet = async (req = request, res = response) => {

    try {

        const tipo_sancion = await Tipo_sancion.find();

        return res.json(tipo_sancion)

    } catch (error) {

        console.log(error);
        return res.status(500).json(error)

    }

}


module.exports = {
    tipo_sancionPost,
    tipo_sancionPut,
    tipo_sancionDelete,
    tipo_sancionGet
}