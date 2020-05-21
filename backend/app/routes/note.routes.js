module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    
    app.post('/notes', notes.create);
    app.get('/notes', notes.findAll);
    app.get('/note/:id', notes.findOne);
    app.put('/note/:id', notes.update);
    app.delete('/note/:id', notes.delete);

}