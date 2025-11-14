const { Schema, model } = require('mongoose');

const personaSchema = Schema({
    nombre1: {
        type: String,
        required: [true, 'El nombre es obligatorio'],

    },
     nombre2: {
        type: String,
        required: [true, 'El nombre es obligatorio'],

    },
    apellido1: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    apellido2: {
        type: String,
    },
    cc: {
        type: Number,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    rol_id: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        require: true 
    },
    grado: {
        type: Schema.Types.ObjectId,
        ref: 'Grado',
        require: true 
    },
     compania: {
        type: Schema.Types.ObjectId,
        ref: 'Compania',
        require: true 
    },
    guardia: {
        type: Number,
        enum:[1,2,3],
        require: true 
    },
      
});

personaSchema.methods.toJSON = function () {
    const { __v, password, _id, ...persona } = this.toObject();
    persona.uid = _id
    return persona;
}


module.exports = model('Persona', personaSchema);

