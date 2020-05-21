const repository = require('../repository/note.repository');

// Controller for adding notes.
exports.create = async (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: 'Note content can not be empty...'
        });
    }

    await repository.insert(req)
    .then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: `Error occurred while creating the Note: ${err.message}`
        });
    });
};

// Controller to search for notes.
exports.findAll = async (req, res) => {
    await repository.getAll()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving notes...'
        });
    });
};

// Controller to search for notes by id.
exports.findOne = async (req, res) => {
    let noteId = req.params.id
    await repository.getOne(noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: `Note not found with id ${noteId}`
            });            
        }
        res.send(note);
    }).catch(() => {
        return res.status(500).send({
            message: 'Error retrieving note'
        });
    });
};

// Controller to update for notes by id.
exports.update = async(req, res) => {
    let noteId = req.params.id
    await repository.updateNote(noteId, req.body)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: `Note not found with id ${noteId}`
            });
        }
        res.send(note);
    }).catch(()=> {
  
        return res.status(500).send({
            message: 'Error updating note...' 
        });
    });

};

// Controller to delete for notes by id.
exports.delete = async (req, res) => {
    let noteId = req.params.id
    await repository.deleteNote(noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: `Note not found with id ${noteId}`
            });
        }
        res.send({message: 'Note deleted successfully!'});
    }).catch(() => {
        return res.status(500).send({
            message: 'Could not delete note'
        });
    });
};