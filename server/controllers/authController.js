const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const User = require("../models/user");
const SignupValidation = require("../validator/SignupValidation");
const SigninValidation = require("../validator/SigninValidation");
const ResetValidation = require("../validator/ResetValidation");
const sendMail = require("../utils/sendMail");
const {
  getGoogleOAuthTokens,
  getGoogleUser,
} = require("../utils/googleOAuthService");

const signToken = (id) => {
  return jwt.sign({ userId: id }, process.env.TOKEN_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET);
};

const createResetPasswordToken = (user) => {
  return jwt.sign(user, process.env.RESET_PASSWORD_SECRET);
};
module.exports = {
  //  ---------------------------------------- //signup method to create a new user//--------------------------- //

  signup: async (req, res) => {
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
        userId: exisitingUser._id,
        email: exisitingUser.email,
      };

      const activationToken = createActivationToken(user);
      const activationUrl = `${process.env.FRONTEND_URL}/emailverification?activationToken=${activationToken}`;
      await sendMail(
        exisitingUser.email,
        activationUrl,
        exisitingUser.name,
        "Email Verification",
        "verificationmail"
      );
      res.status(201).json({
        success: true,
        message: `please check your email:- ${exisitingUser.email} to activate your account!`,
      });
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //verifyemail method to verify user email //--------------------------- //

  verifyemail: async (req, res) => {
    const { query } = req;
    const activationToken = query.activationToken;

    if (!activationToken) {
      return res.status(401).json("Invalid token");
    }
    try {
      const decoded = jwt.verify(
        activationToken,
        process.env.ACTIVATION_SECRET
      );
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json("Invalid token");
      }
      user.verified = true;
      await user.save();
      const token = signToken(user._id);
      res.status(200).json({
        token,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      });
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
        return res.status(401).json("Please Verifiy Your Email and Try again");
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
  //  ---------------------------------------- //forgetPassword method to add a new user//--------------------------- //
  forgetPassword: async (req, res) => {
    const email = req.body.email;
    try {
      if (!email) {
        return res.status(400).json("email is required");
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json("Email could not be sent");
      }

      const resetPasswordToken = createResetPasswordToken({
        userId: user._id,
        email: user.email,
      });
      user.resetPasswordToken = resetPasswordToken;
      await user.save();
      const reseturl = `${process.env.FRONTEND_URL}/resetpassword?resetPasswordToken=${resetPasswordToken}`;
      await sendMail(
        user.email,
        reseturl,
        user.name,
        "RESET YOUR PASSWORD",
        "forgotpasswordmail"
      );
      res.status(200).json({
        success: true,
        message: `please check your email:- ${user.email} to Reset your password!`,
      });
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //resetpassword method to let the user creat a new password //--------------------------- //
  resetpassword: async (req, res) => {
    const { password, confirmPassword } = req.body;
    const { query } = req;
    const resetPasswordToken = query.resetPasswordToken;
    const { errors, isValid } = ResetValidation(req.body);

    try {
      if (!resetPasswordToken) {
        return res.status(401).json("Unauthoriazed");
      }
      const decoded = jwt.verify(
        resetPasswordToken,
        process.env.RESET_PASSWORD_SECRET
      );
      const user = await User.findOne({
        _id: decoded.userId,
        resetPasswordToken: resetPasswordToken,
      });
      if (!user) {
        return res.status(404).json("Wrong Reset Password token");
      }
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const hashedpassword = await bcrypt.hash(password, 8);
      user.password = hashedpassword;
      user.resetPasswordToken = undefined;
      await user.save();
      const token = signToken(user._id);
      res.status(200).json({
        token,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      });
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //Google Authentication //--------------------------- //
  googleOauthHandler: async (req, res) => {
    // get the code from qs
    const code = req.query.code;

    try {
      // get the id and access token with the code
      const { id_token, access_token } = await getGoogleOAuthTokens({ code });

      // get user with tokens
      const googleUser = await getGoogleUser({ id_token, access_token });

      if (!googleUser.verified_email) {
        return res.status(403).send("Google account is not verified");
      }

      // const { email_verified, email, name } = response.payload;
      // const image = response.payload.picture;

      // if (email_verified) {
      //   let user = await User.findOne({ email });

      //   if (user) {
      //     const token = signToken(user._id);
      //     res.status(200).json({
      //       token,
      //       name: user.name,
      //       email: user.email,
      //       role: user.role,
      //       image: user.image,
      //     });
      //   } else {
      //     let password = email + process.env.TOKEN_KEY;
      //     const user = await User.create({
      //       name,
      //       email,
      //       password,
      //       image,
      //       verified: true,
      //     });

      //     const token = signToken(user._id);
      //     res.status(200).json({
      //       token,
      //       name: user.name,
      //       email: user.email,
      //       role: user.role,
      //       image: user.image,
      //     });
      //   }
      // } else {
      //   return res.status(400).json("Google login failed. Please try again.");
      // }
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
          verified: true,
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
