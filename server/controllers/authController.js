const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const User = require("../models/user");
const Token = require("../models/token");
const SignupValidation = require("../validator/SignupValidation");
const SigninValidation = require("../validator/SigninValidation");
const sendMail = require("../utils/sendMail");
const IdParamsValidation = require("../validator/IdParamsValidation");

const signToken = (id) => {
  return jwt.sign({ userId: id }, process.env.TOKEN_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET);
};

module.exports = {
  //  ---------------------------------------- //createUser method to create a new user//--------------------------- //

  createUser: async (req, res) => {
    const { name, email, password } = req.body;
    const { errors, isValid } = SignupValidation(req.body);

    try {
      if (!isValid) {
        return res.status(400).json(errors);
      }
      let exisitingUser = await User.findOne({ email });
      if (exisitingUser) {
        errors.email = "User with given email already Exist";
        return res.status(404).json(errors);
      }
      const hashedpassword = await bcrypt.hash(password, 8);
      exisitingUser = await User.create({
        name,
        email,
        password: hashedpassword,
      });

      const user = {
        name: name,
        email: email,
      };

      const activationToken = createActivationToken(user);
      const activationUrl = `${process.env.FRONTEND_URL}/activation/${exisitingUser._id}/verify/${activationToken}`;
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res
        .status(201)
        .json(
          `please check your email:- ${user.email} to activate your account!`
        );
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //activation method to signin //--------------------------- //

  activation: async (req, res) => {
    const { activationToken } = req.params;
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json("Invalid link");
      }

      const Existtoken = await Token.findOne({
        token: activationToken,
        userId: id,
      });

      if (!Existtoken) {
        return res.status(404).json("Invalid link");
      }
      await User.updateOne({ _id: user._id, verified: true });
      await Existtoken.remove();

      res.status(201).json("Email verified successfully");
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
        return res.status(400).json(errors);
      }
      const userExist = await User.findOne({ email });
      if (!userExist) {
        errors.email =
          "Email does not exist ! please Enter the right Email or You can make account";
        return res.status(404).json(errors);
      }
      const passwordMatch = await bcrypt.compare(password, userExist.password);
      if (!passwordMatch) {
        errors.password = "Wrong Password";
        return res.status(400).json(errors);
      }
      if (!userExist.verified) {
        let token = await Token.findOne({ userId: userExist._id });
        if (!token) {
          const user = {
            name: userExist.name,
            email: userExist.email,
          };

          const activationToken = createActivationToken(user);
          const activationUrl = `${process.env.FRONTEND_URL}/activation/${userExist._id}/verify/${activationToken}`;
          await sendMail({
            email: userExist.email,
            subject: "Activate your account",
            message: `Hello ${userExist.name}, please click on the link to activate your account: ${activationUrl}`,
          });
          return res
            .status(400)
            .json(
              `please check your email:- ${userExist.email} to activate your account!`
            );
        }
      }
      const token = signToken(userExist._id);
     res.status(200).json({
        token,
        name: userExist.name,
        email: userExist.email,
        role: userExist.role,
        image: userExist.image,
      });
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
