const {Schema, model} = require('mongoose');

const companiaSchema = Schema({

    descripcion:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
}); 

companiaSchema.methods.toJSON = function(){
    const { __v, _id,... compania }=this.toObject();
    compania.uid = _id
    return compania;
}

module.exports = model('Compania',companiaSchema);