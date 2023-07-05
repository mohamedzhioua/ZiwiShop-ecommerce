const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/public"));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "PATCH,GET,POST,PUT,DELETE,OPTIONS",
    credentials: true
  })
);
const userRoutes = require("./routes/userRoutes");
const sizeRoutes = require("./routes/sizeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/size", sizeRoutes);
app.use("/api/v1/category", categoryRoutes);

app.listen(PORT, function () {
  console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
});
