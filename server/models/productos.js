const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let productosSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        require: [true, 'La descripcion es obligatoria']
    },
    precio: {
        type: Number,
        require: [true, 'El precio es obliatorio']
    },
    categoria: {
        type: Object,
        require: [true, 'La categoria es obligatoria']
    },
    disponible: {
        type:Boolean,
        require: [true, 'La disponibilidad es obligatoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('productos', productosSchema);