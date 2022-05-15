const { Schema, SchemaTypes, model } = require('mongoose');

const UserSchema = new Schema({
    email: String,
    password: SchemaTypes.String,
    role: {
        type: SchemaTypes.Number,
        default: 1,
    },
    DOB: Date,
});

UserSchema.virtual('age').get((_, __, doc) => new Date().getFullYear() - new Date(doc.DOB).getFullYear());

// UserSchema.methods.generateUser = () => {
//     const email = 'admin@admin.com';
//     const password = '123';
//     this.save({});
// };

const User = model('User', UserSchema, 'users');
module.exports = User;