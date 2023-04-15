var vedios=require("../models/vediosModal");
module.exports.getVedios=async(req,res)=>{
    var data = await vedios.Vedios.find();
    if (!data) {
      res.status(404).send("bad request")
    }
    res.send(data);
}