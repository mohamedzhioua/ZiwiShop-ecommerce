const jwt = require("jsonwebtoken");

//AccessToken
exports.AccessToken = (user) => {
  const tokenPayload = {
    userId: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    image: user.image,
  };

  const token = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  return token;
};

//refreshToken
exports.RefreshToken = (userId) => {
  const token = jwt.sign({ userId: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

