const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
var fs = require('fs');

exports.uploadFiles = async (req, res) => {

  if (req.file) {
    res.status(200).json({
      filename: req.file.filename,
      created_at: req.file.uploadDate
    })
  }
}

exports.staticFile = async (req, res) => {

  var filename = req.params.filename;

  var bucket = new mongoose.mongo.GridFSBucket(mongoose.connections[0], {
    bucketName: 'uploads'
  })
  var stream = bucket.openDownloadStreamByName(filename);
  stream.read();
  stream.on('data', data => {
    res.set('content-type', 'image/png')
    var buf = Buffer.from(data, 'base64');
    res.send(buf)
  })
  stream.on('error', () => {
    res.json({
      "msg": "Error downloading file"
    })
  })
  stream.on('end', () => {
    res.end();
  })
}