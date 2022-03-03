// Config Express
const express = require("express");
const app = express();
const bp = require('body-parser');
var cors = require('cors')

require('dotenv').config({
  path: './variables.env'
})

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Routes 
const routes = require("./routes/index.js")

// Config
require("./config/db");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(routes);
app.use(bp.json());
app.use(cors(corsOptions))

// RUN
app.listen(process.env.PORT || 5000 () => console.log('Service is running!', port));
