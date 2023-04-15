var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors())
bodyParser = require('body-parser')
var dbConnection=require("./config/dataBaseConnection");
var getImages=require("../backend/controllers/getImages")
var getVedios=require("../backend/controllers/getVedios");
var uploadImage=require("../backend/controllers/uploadImages")
var uploadVedio=require("../backend/controllers/uploadVedios");
var updateImageDescription=require("../backend/controllers/updateImageDesc")
var updateVedioDexcription=require("../backend/controllers/updateVedioDesc")
const multer = require("multer");
var mongoose = require('mongoose')
var fs = require('fs');
var path = require('path');
require('dotenv/config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploaded-images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const vedioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploaded-vedios");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const uploadSingleVedio = multer({ storage: vedioStorage });
dbConnection.dbConnection();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.get('/images', getImages.getImages);
app.post('/uploadImage',upload.single('myImage'),uploadImage.uploadImage)
app.post('/uploadVedio',uploadSingleVedio.single('vedio'),uploadVedio.uploadVedios)
app.get('/vedios',getVedios.getVedios)
app.put('/uploadImageDesc/:id',updateImageDescription.uploadImageDesc)
app.put('/uploadVedioDesc/:id',updateVedioDexcription.uploadVideoDesc)


app.listen(process.env.PORT, function () {
  console.log(`app listening on port ${process.env.PORT}`);
   
});