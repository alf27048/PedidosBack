const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
}, 
{ //para ver fecha de creacion y actualizacion
    timestamps: true,
}
);

UserSchema.set('toJSON', {
    transform(doc, ret) {
        ret.id =ret._id;
        delete ret._id;
       // delete ret.password;
        delete ret.__v;
    }
})
const User = mongoose.model('User', UserSchema)


module.exports = User;