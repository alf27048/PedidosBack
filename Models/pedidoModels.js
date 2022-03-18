const mongoose = require('mongoose')

const PedidoSchema = new mongoose.Schema({
    producto: {
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    precio: {
        type: String
    },
    estado: {
        type: Boolean,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaEntrega: {
        type: Date,
        required: true
    }

}, 
{ //para ver fecha de creacion y actualizacion
    timestamps: true,
}
);

PedidoSchema.set('toJSON', {
    transform(doc, ret) {
        ret.id =ret._id;
        delete ret._id;
       // delete ret.password;
        delete ret.__v;
    }
})
const Pedido = mongoose.model('Pedido', PedidoSchema)


module.exports = Pedido;