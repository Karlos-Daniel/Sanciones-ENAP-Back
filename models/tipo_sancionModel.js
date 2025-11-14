const {Schema, model} = require('mongoose');

const tipo_sancionSchema = Schema({

    descripcion:{
        type: String,
        enum:["HTE","HDM","HAF","DTE"],
        required: [true, "HTE","HDM","HAF","DTE"],
    },
}); 

tipo_sancionSchema.methods.toJSON = function(){
    const { __v, _id,... tipo_sancion }=this.toObject();
    tipo_sancion.uid = _id
    return tipo_sancion;
}

module.exports = model('Tipo_Sancion',tipo_sancionSchema);