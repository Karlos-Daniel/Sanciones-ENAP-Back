const { response, request } = require("express");
const { Sanciones,Persona, Compania } = require('../models');
const {validationResult} = require('express-validator');
const { isValidObjectId } = require('mongoose');
const mongoose = require("mongoose");


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
            observacion,
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
            observacion,
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

        const { sancionID } = req.params;

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
            observacion,
            estado
        } = req.body

       
        const data = {
            ID_alumno,
            ID_autoridad,
            ID_tipo_sancion,
            ID_duracion_sancion,
            fecha,
            observacion,
            estado
        }

       await Sanciones.findByIdAndUpdate(sancionID,data)

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

        // Validar ID
        if (!mongoose.Types.ObjectId.isValid(companiaID)) {
            return res.status(400).json({
                msg: "ID de compañía no válido"
            });
        }

        // Verificar que la compañía exista
        const compania = await Compania.findById(companiaID);
        if (!compania) {
            return res.status(404).json({
                msg: "Compañía no encontrada"
            });
        }

        // 1️⃣ Obtener todos los cadetes de la compañía
        const cadetes = await Persona.find({ compania: companiaID })
            .populate('grado')
            .lean();

        // Si no hay cadetes
        if (cadetes.length === 0) {
            return res.json({
                compania: compania.nombre,
                cadetes: []
            });
        }

        // 2️⃣ Mapear cadetes y obtener sanciones de cada uno
        const resultado = await Promise.all(
            cadetes.map(async cadete => {

                const sanciones = await Sanciones.find({ persona_id: cadete.uid })
                    .populate('ID_tipo_sancion')
                    .lean();

                return {
                    cadete: `${cadete.nombre1} ${cadete.nombre2} ${cadete.apellido1} ${cadete.apellido2}`,
                    grado: cadete.grado ? cadete.grado.nombre : "Sin grado",
                    guardia: cadete.guardia,
                    total_sanciones: sanciones.length,
                    sanciones
                };
            })
        );

        // 3️⃣ Respuesta final
        res.json({
            compania: compania.nombre,
            cadetes: resultado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
};



const getSancionesPorCadete = async (req, res) => {
  try {
    const { cadeteID } = req.params;

    // 1. Obtener TODAS las sanciones del cadete
    const sanciones = await Sanciones.find({ ID_alumno: cadeteID })
      .populate({
        path: "ID_alumno",
        select: "nombre1 apellido1 apellido2 guardia compania grado cc",
        populate: [
          { path: "compania", select: "descripcion" },
          { path: "grado", select: "descripcion" }
        ]
      })
      .populate({
        path: "ID_autoridad",
        select: "nombre1 apellido1 apellido2 grado",
        populate: { path: "grado", select: "descripcion" }
      })
      .populate("ID_tipo_sancion", "descripcion")
      .populate("ID_duracion_sancion", "descripcion");

    if (!sanciones.length) {
      return res.json({
        msg: "El cadete no tiene sanciones registradas.",
        total_sanciones: 0,
        sanciones: []
      });
    }

    // 2. Construir el objeto agrupado
    const alumno = sanciones[0].ID_alumno;

    const respuesta = {
      alumno: `${alumno.nombre1} ${alumno.apellido1} ${alumno.apellido2}`,
      compania: alumno.compania?.descripcion,
      grado: alumno.grado?.descripcion,
      guardia: alumno.guardia,
      total_sanciones: sanciones.length,
      sanciones: sanciones
    };

    res.json(respuesta);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener sanciones agrupadas del cadete" });
  }
};





module.exports = {
    sancionesPost,
    sancionesPut,
    sancionesDelete,
    sancionesCompanias,
    getSancionesPorCadete,
    sancionesGet
}