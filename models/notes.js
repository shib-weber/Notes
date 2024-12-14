const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    note: { type: String, required: true },
    seenBy: { type: [String], default: [] },
});

const Note = mongoose.model('notes', noteSchema);

module.exports = Note;
