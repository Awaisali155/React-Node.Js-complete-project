var multer = require('multer');
fs = require('fs');
const path = require('path');
var imageModel=require('../models/imagesModel.js')
module.exports.uploadImage=async(req, res) => {
    const saveImage =await  imageModel.Images({
      img: {
        data: fs.readFileSync("uploaded-images/" + req?.file?.filename),
        contentType: "image/png",
      
      },
      desc: req.body.desc,
    });
   await saveImage
      .save()
      .then((res) => {
        
        console.log("image is saved");
      })
      .catch((err) => {
        console.log(err, "error has occur");
      });
      res.send('image is saved')
  }
