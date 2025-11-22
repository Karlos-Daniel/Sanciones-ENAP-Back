const { response, request } = require("express");
const { Compania, Persona } = require('../models');
const {validationResult} = require('express-validator');

const companiaPost = async (req = request, res = response) => {
    try {
        const {
            descripcion
        } = req.body
 
        const companiasValidas = ["Binney", "Brion","Tono","Valenzuela","Padilla","Cuadros"]
        if(!companiasValidas.includes(descripcion)){
            return res.status(400).json({errores:
                [{msg:'no es un rol valido'}]
            })
        }
        //const dateMoment = new Date(fecha)
        //const fechaMoment = moment(dateMoment).format('MM/DD/YYYY');    
           
        const data = {
            descripcion
        }

        const compania = new Compania(data)

        await compania.save()

        return res.status(201).json({
            msg:'Compañia creado con exito'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: error
        })
    }
}

//editar
const companiaPut = async (req = request, res = response) => {
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

       await Compania.findByIdAndUpdate(_id,data)

        return res.status(201).json({
            msg:'Compania modificada con exito'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: error
        })
    }
}

//borrar
const companiaDelete = async (req = request, res = response) => {

    try {
        const { _id } = req.params;

        await Compania.findByIdAndDelete(_id);

        return res.status(200).json({
            msg: `Compania borrada con exito`
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: error
        })
    }


}

const companiaGet = async (req = request, res = response) => {

    try {

        const compania = await Compania.find();

        return res.json(compania)

    } catch (error) {

        console.log(error);
        return res.status(500).json(error)

    }

}
const cadetes_companiasGet = async (req = request, res = response) => {
    
    const compania_ID_params = req.params

    const cadetesCompania = await Persona.find({compania:compania_ID_params})
}



module.exports = {
    companiaPost,
    companiaPut,
    companiaDelete,
    companiaGet
}