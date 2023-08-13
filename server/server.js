const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const corsOptions = require ("./utils/corsOptions")

require("dotenv").config();

const app = express();
const PORT = process.env.PORT  || 3070 ;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/public"));
app.use(cookieParser());
 
app.use(cors((corsOptions)));

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sandbox");
});

const userRoutes = require("./routes/userRoutes");
const sizeRoutes = require("./routes/sizeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const brandRoutes = require("./routes/brandRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes")

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/size", sizeRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/brand", brandRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.listen(PORT, function () {
  console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
});
