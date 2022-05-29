const { Schema, SchemaTypes, model, Types } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true,
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: SchemaTypes.String,
        required: true
    },
    verified: {
        type: SchemaTypes.Boolean,
        default: false
    },
    verifyingKey: {
        type: SchemaTypes.String,
        default: () => {
            return (new Types.ObjectId()).toString();
        }
    },
    avatarUrl: {
        type: SchemaTypes.String,
    },
    documents: {
        type: SchemaTypes.ObjectId,
        ref: 'Document'
    }
});

module.exports = model('User', UserSchema, 'users');