// Config Express
const express = require("express");
const app = express();
const bp = require('body-parser');
var cors = require('cors')
const path = require('path');

const CONFIG = require('./config/index');
require('./config/db');

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Routes 
const routes = require("./routes/index.js");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(routes);
app.use(bp.json());
app.use(cors(corsOptions));

app.use('/src/uploads', express.static('uploads'))

// RUN
app.listen(CONFIG.server.port|| 5000, () => console.log(`Running in port: ${CONFIG.server.port}`));
