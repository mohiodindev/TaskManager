const mongoose = require("mongoose")
const connetDB = (url) => {
     return mongoose
          .connect(url)
}

module.exports= connetDB;


