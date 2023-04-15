var mongoose=require("mongoose");
const schema = new mongoose.Schema({
    vedio: {
      data: Buffer,
      contentType: String,
      
    },
    desc: String,
    created_at: { type: Date, default: Date.now }
});

const Vedios=mongoose.model("Vedios",schema);
module.exports.Vedios=Vedios;