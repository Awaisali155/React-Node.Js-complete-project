
var mongoose = require("mongoose");
const schema = new mongoose.Schema({
    img: {
      data: Buffer,
      contentType: String,
      
    },
    desc: String,
    created_at: { type: Date, default: Date.now }
});

const Images=mongoose.model("Images",schema);
module.exports.Images=Images;
