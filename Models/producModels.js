const mongoose = require('mongoose')

const ProducSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    estado: {
        type: Boolean,
        required: true
    }
}, 
{ //para ver fecha de creacion y actualizacion
    timestamps: true,
}
);

ProducSchema.set('toJSON', {
    transform(doc, ret) {
        ret.id =ret._id;
        delete ret._id;
       // delete ret.password;
        delete ret.__v;
    }
})
const Produc = mongoose.model('Produc', ProducSchema)


module.exports = Produc;