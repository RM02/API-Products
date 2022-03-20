const mongoose = require('mongoose');
const multer = require("multer");
const path = require('path');
const crypto = require('crypto');

const {
  GridFsStorage
} = require("multer-gridfs-storage")

let bucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "uploads"
  });
});

const storage = new GridFsStorage({
  url: process.env.MONGO_DEV_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({
  storage
})

module.exports = {
  upload,
  bucket
};