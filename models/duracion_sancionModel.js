const {Schema, model} = require('mongoose');

const duracion_sancionSchema = Schema({

    descripcion:{
        type: String,
        enum:["1","2","3","4","5","6","7","8","DIA"],
        required: [true, 'El nombre es obligatorio'],
    },
}); 

duracion_sancionSchema.methods.toJSON = function(){
    const { __v, _id,... duracion_sancion }=this.toObject();
    duracion_sancion.uid = _id
    return duracion_sancion;
}

module.exports = model('Duracion_sancion',duracion_sancionSchema);