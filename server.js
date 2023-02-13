const express = require('express');
const fs = require("fs");
const util = require('util');
const path = require('path');
const PORT = process.evn.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

