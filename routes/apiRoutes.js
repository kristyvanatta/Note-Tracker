const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');
//const uuid = require('helpers/uuid.js');

router.get('/notes', (req, res) => {
    res.json(db)
});

router.post('/notes', (req, res) => {
    
    const {title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            //note_id: uuid(),
        };

        fs.readFile('./db.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(
                    './db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                    writeErr
                    ? console.error(writeErr)
                    : console.info('suffessfully updated notes')
                );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };
        console.log(response);
        res.status(201).json(response);
    }
    else {
        res.status(500).json('Error in posting review');
    }
});

module.exports = router;
//module.exports = helper;
