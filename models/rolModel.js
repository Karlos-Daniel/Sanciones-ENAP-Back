const {Schema, model} = require('mongoose');

const rolSchema = Schema({

    descripcion:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
}); 

rolSchema.methods.toJSON = function(){
    const { __v, _id,... rol }=this.toObject();
    rol.uid = _id
    return rol;
}

module.exports = model('Rol',rolSchema);