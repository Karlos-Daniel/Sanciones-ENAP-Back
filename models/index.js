//const Restaurante = require('./restauranteModel');
//const Reserva = require('./reservasModel');
const Persona = require('./personaModel');
const Compania = require('./companiaModel')
const Duracion = require('./duracion_sancionModel')
const Rol = require('./rolModel')
const Tipo_sancion = require('./tipo_sancionModel')
const Grado = require('./gradoModel')
const Sanciones = require('./sancionesModel')
const Duracion_sancion = require('./duracion_sancionModel')
 
module.exports ={
    Compania,
    Sanciones,
    Rol,
    Duracion,
    Persona,
    Tipo_sancion,
    Duracion_sancion,
    Grado
}