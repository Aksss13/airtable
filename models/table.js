const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    required: { type: Boolean, default: false },
    options: [String] // For dropdown, rating, etc.
}, { _id: false });

const tableSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fields: [fieldSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Table', tableSchema);
