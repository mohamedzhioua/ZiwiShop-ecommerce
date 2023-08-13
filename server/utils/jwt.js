const jwt = require("jsonwebtoken");

const signToken = (user) => {
    const tokenPayload = {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    };
  
    const token = jwt.sign(tokenPayload, process.env.TOKEN_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  
    return token;
  };
  module.exports = signToken