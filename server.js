//! dependencies
const express = require('express');
const fs = require("fs");
const util = require('util');
const path = require('path');
const PORT = process.evn.PORT || 3001;
const app = express();

//!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
