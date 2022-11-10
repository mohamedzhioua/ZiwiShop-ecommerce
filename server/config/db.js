const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Authentication", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

module.exports = db;
