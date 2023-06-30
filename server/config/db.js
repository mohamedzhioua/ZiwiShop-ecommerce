const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

module.exports = db;