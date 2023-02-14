//! dependencies
const express = require('express');
const fs = require("fs");
// const util = require('util');
const path = require('path');
const uuid = require('./helpers/uuid.js');
const notes = require('./db/db.json');

//! server configuration
const app = express();
const PORT = process.env.PORT || 3001;


//! middleware
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//! html routes
//? calls notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});
//? calls index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//! api routes
//! routes "get"
app.get("/api/notes", (req, res) => {
  console.log("GET notes request received");
  res.sendFile(path.join(__dirname, './db/db.json'));
});

//! routes "post"
app.post("/api/notes", (req, res) => {
  console.log(`${req.method} request received`);
  const {title, text} = req.body;
  if (req.body) {
    console.log(req.body);
    const newNotes = {title, text, id: uuid()};
    let notesFile = JSON.parse(fs.readFileSync("./db/db.json"));
    notesFile.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notesFile));
  };
});


//! routes "delete"
app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const delNotes = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(delNotes));
  res.json(delNotes)
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
