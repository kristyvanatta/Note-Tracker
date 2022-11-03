const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('../helpers/uuid.js');



router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(JSON.parse(data));
});
});

router.post('/notes', (req, res) => {
    
    console.log(req.body)

    const {title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes),
                    (writeErr) => {
                        if (writeErr) console.error(writeErr);
                        else console.info('suffessfully updated notes');

                        const response = {
                            status: 'success',
                            body: newNote,
                        };

                        console.log(response); 
                        res.status(201).json(response);
                    }
                );
            }
        });
    }
        else {
            res.status(500).json('Error in posting review');
    }

    router.delete('/notes:note_id', (req, res) => {
        res.send('Delete Note')
    });
});

    module.exports = router;

