const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const User = require("../models/user");
const SignupValidation = require("../validator/SignupValidation");
const SigninValidation = require("../validator/SigninValidation");

const signToken = (id) => {
  return jwt.sign({ userId: id }, process.env.TOKEN_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
module.exports = {
  //  ---------------------------------------- //signup method to add a new user//--------------------------- //

  signup: async (req, res) => {
    const { name, email, password } = req.body;
    const { errors, isValid } = SignupValidation(req.body);

    try {
      if (!isValid) {
        res.status(400).json(errors);
      } else {
        await User.findOne({ email }).then(async (exist) => {
          if (exist) {
            errors.email = "Email already in use";
            return res.status(400).json(errors);
          } else {
            const hashedpassword = await bcrypt.hash(password, 8);
            await User.create({
              name,
              email,
              password: hashedpassword,
            });
            res.status(201).json({ message: "user added with success" });
          }
        });
      }
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //signin method to add a new user//--------------------------- //
  signin: async (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = SigninValidation(req.body);

    try {
      if (!isValid) {
        res.status(400).json(errors);
      } else {
        await User.findOne({ email }).then(async (user) => {
          if (!user) {
            errors.email =
              "Email does not exist ! please Enter the right Email or You can make account";
            return res.status(400).json(errors);
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            errors.password = "Wrong Password";
            return res.status(400).json(errors);
          } else {
            const token = signToken(user._id);
            res.status(200).json({
              token,
              name: user.name,
              email: user.email,
              role: user.role,
              image: user.image,
            });
          }
        });
      }
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //Google Authentication //--------------------------- //
  googleLogin: async (req, res) => {
    const client = new OAuth2Client(process.env.webClientId);
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json("ID Token is missing");
    }

    try {
      const response = await client.verifyIdToken({
        idToken,
        audience: process.env.webClientId,
      });

      const { email_verified, email, name } = response.payload;
      const image = response.payload.picture;

      if (email_verified) {
        let user = await User.findOne({ email });

        if (user) {
          const token = signToken(user._id);
          res.status(200).json({
            token,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
          });
        } else {
          let password = email + process.env.TOKEN_KEY;
          const user = await User.create({
            name,
            email,
            password,
            image,
          });

          const token = signToken(user._id);
          res.status(200).json({
            token,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
          });
        }
      } else {
        return res.status(400).json("Google login failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("An error occurred during Google login.");
    }
  },

  //  ---------------------------------------- //Facebook Authentication //--------------------------- //
  FacebookLogin: async (req, res) => {
    try {
      const { userID, accessToken } = req.body;
      const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
      let response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      const { email, name } = data;
      const image = data.picture.data.url;
      let user = await User.findOne({ email });
      if (user) {
        const token = signToken(user._id);
        res.status(200).json({
          token,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        });
      } else {
        let password = email + process.env.TOKEN_KEY;
        const user = await User.create({
          name,
          email,
          password,
          image,
        });
        if (!user) {
          return res.status(400).json("User signup failed with Facebook");
        }
        const token = signToken(user._id);
        res.status(200).json({
          token,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Facebook login failed. Please try again later");
    }
  },
};
