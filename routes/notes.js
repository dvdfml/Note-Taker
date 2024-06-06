const notes = require('express').Router();

// Helper function to generate unique id's
const uuid = require('../helpers/uuid');

// Helper functions for reading and writing to the JSON file
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');

// This API route is a GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


// This API route is a POST Route for a new note
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        id: uuid(),
        title,
        text,
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });

module.exports = notes;

notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);

    const id = req.params.id;

    if (id) {
        readAndDelete(id, './db/db.json');
        res.json(`Note deleted successfully 🚀`);
    } else {
        res.error('Error in deleting note');
    }

});
