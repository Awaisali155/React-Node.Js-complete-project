var multer = require('multer');
fs = require('fs');
const path = require('path');
var vedioModel=require('../models/vediosModal.js')
module.exports.uploadVedios=async(req, res) => {
    const saveVedio =await  vedioModel.Vedios({
        vedio: {
        data: fs.readFileSync("uploaded-vedios/" + req.file.filename),
        contentType: "video/mp4",
      
      },
      desc: req.body.desc,
    });
   await saveVedio
      .save()
      .then((res) => {
        console.log("Vedio is saved");
      })
      .catch((err) => {
        console.log(err, "error has occur");
      });
      res.send('Vedio is saved')
  }
