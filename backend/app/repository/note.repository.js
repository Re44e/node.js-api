const Note = require('../models/note.model');

// Function for adding notes.
exports.insert = async (req) => {
    try {
        const note = new Note({
            title: req.body.title || 'Untitled Note',
            content: req.body.content
        });

        const result = await note.save();
        return result;

    } catch (err) { return err; }
};

// Function to search for notes.
exports.getAll = async () => {
    try {
        const query = await Note.find();
        return query;

    }catch (err) { return err };
};

// Function to search for notes by id.
exports.getOne = async (id) => {
    try {
        const query = await Note.findById(id);
        return query;
    }catch (err) { return err};
    
};

// Function to update for notes by id.
exports.updateNote = async (id, data) => {
    try {
        const result = await Note.findByIdAndUpdate((id), {
            title: data.title || 'Untitled Note',
            content: data.content
        }, {new: true});
        return result;
    }catch (err) { return err };
    
};

// Function to delete for notes by id.
exports.deleteNote = async (id) => {
    try{
        const result = await Note.findByIdAndRemove(id);
        return result;
    }catch(err) { return err };
}