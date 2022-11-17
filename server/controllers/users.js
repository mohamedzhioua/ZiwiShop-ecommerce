const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../models/user");
// Load input validation
const SignupValidation = require("../validator/SignupValidation");
const SigninValidation = require("../validator/SigninValidation");
module.exports = {
  //  ---------------------------------------- //signup method to add a new user//--------------------------- //

  signup: async (req, res) => {
    const { name, email, password } = req.body;
    const { errors, isValid } = SignupValidation(req.body);

    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        await User.findOne({ email }).then(async (exist) => {
          if (exist) {
            errors.email = "Email already in use";
            res.status(404).json(errors);
          } else {
            const hashedpassword = bcrypt.hashSync(password, 8);
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
      console.log(error.message);
    }
  },
  //  ---------------------------------------- //signin method to add a new user//--------------------------- //
  signin: async (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = SigninValidation(req.body);

    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        await User.findOne({ email }).then(async (user) => {
          if (!user) {
            errors.email=
              "Email does not exist ! please Enter the right Email or You can make account";
            res.status(404).json(errors);
          }
          // Compare sent in password with found user hashed password
          const passwordMatch = bcrypt.compareSync(password,user.password);
          if (!passwordMatch) {
            errors.password = "Wrong Password";
            res.status(404).json(errors);
          } else {
            // generating a token and storing it in a cookie
            const token = jwt.sign({ id: user._id }, "zhioua_DOING_GOOD", {
              expiresIn: "3d",
            });
            const options = {
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
              httpOnly: true,
              sameSite: "lax",
            };
            // res.cookie("Authorization", token, options);
            res.status(201).json({
              message: "welcom " + user.name + " to your home page",
              token,
              user,
            });
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};
