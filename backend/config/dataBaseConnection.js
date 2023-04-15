var mongoose=require('mongoose');
  function dbConnection() {
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("connected to database");
    }).catch((err)=>{
        console.log(err,"error while connected to database ")
    })
  }

  module.exports.dbConnection=dbConnection;
