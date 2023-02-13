//! dependencies
const express = require('express');
const fs = require("fs");
const util = require('util');
const path = require('path');

//! handling asynch processes 
const = readFileAsync = util.promisify(fs.readFile);
const = writeFileAsync = util.promisify(fs.writeFile);

//! server configuration
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//! middleware
app.use(express.static(path.join("./public")));

//! routes "get"

//! routes "post"

//! routes "delete"

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
