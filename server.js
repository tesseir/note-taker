//! dependencies
const express = require('express');
const fs = require("fs");
const util = require('util');
const path = require('path');
const uuid = require('./helpers/uuid.js');

//! server configuration
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//! middleware
app.use(express.static(path.join("./public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//! handling asynch processes 
const = readFile = util.promisify(fs.readFile);
const = writeFile = util.promisify(fs.writeFile);

//! routes "get"
app.get("/api/notes", (req, res) => {
  readFile('./db/db.json', 'utf8').then((data) => {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});

//! routes "post"
app.post("/api/notes", (req, res) => {
  const note = req.body;
  readFile('./db/db.json', 'utf8').then((data) => {
    const notes = [].concat(JSON.parse(data));
    note.id = notes.length + 1;
    notes.push(note);
    return notes;
  }).then((notes) => {
    writeFile('./db/db.json', JSON.stringify(notes));
    res.json(notes);
  });
});

//! routes "delete"
app.delete("/api/notes/:id", (req, res) => {

});

//! html routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//! listening
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
