const {Schema, model} = require('mongoose');

const sancionesSchema = Schema({

    ID_alumno:{
        type: String,
        ref:"Persona",
        required: [true, "El ID del alumno es obligatorio"],
    },
    ID_autoridad:{
        type: String,
        ref:"Persona",
        required: [true, "El ID de de la autoridad es obligatorio"],
    },
     ID_tipo_sancion:{
        type: String,
        ref:"Tipo_Sancion",
        required: [true, "El ID de del tipo sancion es obligatorio"],
    },
    ID_duracion_sancion:{
        type: String,
        ref:"Duracion_sancion",
        required: [true, "El ID de de la duracion es obligatorio"],
    },
    fecha:{
        type: Date,
        required: [true, "La fecha es obligatoria"],
    },
    observacion:{
        type: String
    },
    img:{
        type: String
    },
    estado:{
        type: Boolean,
        default: true,
    },
    
}); 

sancionesSchema.methods.toJSON = function(){
    const { __v, _id,... sanciones }=this.toObject();
    sanciones.uid = _id
    return sanciones;
}

module.exports = model('Sanciones',sancionesSchema);