const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>console.log("DB connection successfull"))
    .catch((error)=>{
        console.log("DB connection fail");
        console.log(error.message);
        process.exit(1);
    });
}