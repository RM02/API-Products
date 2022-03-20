const config = require('./index');
const mongoose = require('mongoose');

var conn = mongoose
  .connect(process.env.MONGO_DEV_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connected to database."))
  .catch(err => console.log(err));

module.exports = conn;