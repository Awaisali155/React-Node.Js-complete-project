var imageModel=require("../models/imagesModel");
module.exports.getImages=async(req, res)=>{
    var data = await imageModel.Images.find();
    if (!data) {
      res.status(404).send("bad request")
    }
    res.send(data);
}