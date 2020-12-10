const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    _id: {
        type: String,
        required: [true, 'El id es necesario']
       
    },
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripcion es obligatoria para su insercion correcta']
    },
    usuario: {
        type: Schema.Types.String,
        ref: 'Usuario'
    }
});
module.exports = mongoose.model('Categoria', categoriaSchema)