const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
       if (!token)
        return res
          .status(401)
          .json("You are not logged in, please log in to access");
      var decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json("user not found");
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    return res.status(401).json("Invalid Token");
  }
};
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    res.status(401).json("Invalid Admin Token");
  }
};
module.exports = { isAuth, isAdmin };
