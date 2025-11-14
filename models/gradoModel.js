const {Schema, model} = require('mongoose');

const gradoSchema = Schema({

    descripcion:{
        type: String,
        required: [true, 'El grado es obligatorio'],
    },
}); 

gradoSchema.methods.toJSON = function(){
    const { __v, _id,... grado }=this.toObject();
    grado.uid = _id
    return grado;
}

module.exports = model('Grado',gradoSchema);