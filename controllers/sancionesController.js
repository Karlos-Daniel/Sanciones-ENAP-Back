const { response, request } = require("express");
const { Sanciones,Persona, Compania } = require('../models');
const {validationResult} = require('express-validator');
const { isValidObjectId } = require('mongoose');

const moment = require('moment')

// const sancionesPost = async (req = request, res = response) => {
//     try {
//         const {
//             ID_alumno,
//             ID_autoridad,
//             ID_tipo_sancion,
//             ID_duracion_sancion,
//             fecha,
//         } = req.body

//         if(!isValidObjectId(ID_alumno && ID_autoridad && ID_tipo_sancion && ID_duracion_sancion )){
//                     return res.status(400).json({errores:[{
//                         msg:`este id: ${_id} no es de mongo`
//                     }]})
//                 }
       
//         const dateMoment = new Date(fecha)
//         const fechaMoment = moment(dateMoment).format('MM/DD/YYYY');    
           
//         const data = {
//            ID_alumno,
//             ID_autoridad,
//             ID_tipo_sancion,
//             ID_duracion_sancion,
//             fecha,
//         }

//         const sanciones = new Sanciones(data)

//         await sanciones.save()

//         return res.status(201).json({
//             msg:'Sancion creada con exito'
//         })

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             msg: error
//         })
//     }
// }
const sancionesPost = async (req = request, res = response) => {
    try {
        
        const {
            ID_alumno,
            ID_autoridad,
            ID_tipo_sancion,
            ID_duracion_sancion,
            fecha,
        } = req.body;
        // Validar IDs individualmente
         if (
             !isValidObjectId(ID_alumno) ||
             !isValidObjectId(ID_autoridad) ||
             !isValidObjectId(ID_tipo_sancion) ||
             !isValidObjectId(ID_duracion_sancion)
         ) {
             return res.status(400).json({
                errores: [{
                     msg: `Uno o más IDs no son válidos`
                 }]
             });
         }

        //Convertir fecha correctamente
        const fechaMoment = moment(fecha).toDate();
console.log("3");
        const data = {
            ID_alumno,
            ID_autoridad,
            ID_tipo_sancion,
            ID_duracion_sancion,
            fecha: fechaMoment,   // ← Ahora sí se guarda bien en Mongo
        };
console.log("4");
        const sancion = new Sanciones(data);
        console.log("5");
        await sancion.save();
        console.log("6");

        return res.status(201).json({
            msg: 'Sanción creada con éxito',
            sancion
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error en el servidor',
        });
    }
};


//editar
const sancionesPut = async (req = request, res = response) => {
    try {

        const { _id } = req.params;

        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                errores: errors.array()
            })
        } 

        const {
            ID_alumno,
            ID_autoridad,
            ID_tipo_sancion,
            ID_duracion_sancion,
            fecha,
            estado
        } = req.body

       
        const data = {
            ID_alumno,
            ID_autoridad,
            ID_tipo_sancion,
            ID_duracion_sancion,
            fecha,
            estado
        }

       await Sanciones.findByIdAndUpdate(_id,data)

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
const sancionesDelete = async (req = request, res = response) => {

    try {
        const { _id } = req.params;

        await Sanciones.findByIdAndDelete(_id);

        return res.status(200).json({
            msg: `Sancion borrada con exito`
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: error
        })
    }


}

const sancionesGet = async (req = request, res = response) => {

    try {

        const sanciones = await Sanciones.find({});

        return res.json(sanciones)

    } catch (error) {

        console.log(error);
        return res.status(500).json(error)

    }

}

const sancionesCompanias = async (req, res) => {
  try {
    const { companiaID } = req.params;

    // 1. Obtener alumnos que pertenecen a esa compañía
    const alumnos = await Persona.find({ compania: companiaID }).select("_id");

    const idsAlumnos = alumnos.map(a => a._id);
    console.log(idsAlumnos);
    
    // 2. Obtener sanciones de esos alumnos
    const sanciones = await Sanciones.find({ ID_alumno: { $in: idsAlumnos } })
      .populate({
        path: "ID_alumno",
        select: "nombre1 apellido1 apellido2 guardia compania",
        populate: { path: "compania", select: "descripcion" }
      })
      .populate("ID_autoridad", "nombre1 apellido1 apellido2 grado")
       .populate("ID_tipo_sancion","descripcion")
       .populate("ID_duracion_sancion", "descripcion");

    res.json(sanciones);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener sanciones por compañía" });
  }
};



module.exports = {
    sancionesPost,
    sancionesPut,
    sancionesDelete,
    sancionesCompanias,
    sancionesGet
}