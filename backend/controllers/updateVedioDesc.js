var multer = require('multer');
fs = require('fs');
const path = require('path');
// var imageModel = require('../models/imagesModel.js')
var vedioModel=require('../models/vediosModal')
module.exports.uploadVideoDesc = async (req, res) => {
    try {
        const updatedImg = await vedioModel.Vedios.findByIdAndUpdate(req.params.id,
            { desc: req.body.desc },
            { new: true }
        );
        res.json(updatedImg);
        console.log("image description updaated successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
