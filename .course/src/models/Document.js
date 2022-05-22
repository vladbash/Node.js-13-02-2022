const { Schema, SchemaTypes, model } = require('mongoose');

const DocumentSchema = new Schema();

module.exports = model('Document', DocumentSchema, 'documents');