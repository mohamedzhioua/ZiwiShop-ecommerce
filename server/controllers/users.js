const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../models/user");
// Load input validation
const SignupValidation = require("../validator/SignupValidation");

module.exports = {
  //  ---------------------------------------- //signup method to add a new user//--------------------------- //

  signup: async (req, res) => {
    const { name, email, password } = req.body;
    const { errors, isValid } = SignupValidation(req.body);
    try {
      if (!isValid) {
        res.status(404).json(errors);
      }
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(404).json({
          message: "Email already Exist please try another Email",
        });
      }
      const hashedPassword = bcrypt.hashSync(password, 8);
      await User.create({
        name,
        email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "user added with success" });
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
  },
  //  ---------------------------------------- //signin method to add a new user//--------------------------- //
  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).send({ message: "please fill all the fields" });
      //find the user
      const user = await User.findOne({ email });
      if (!user)
        return res.status(404).send({
          message:
            "Email does not exist ! please Enter the right Email or You can make account",
        });
      // Compare sent in password with found user hashed password
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch)
        return res.status(400).send({ message: "Wrong Password" });
      // generating a token and storing it in a cookie
      const token = jwt.sign({ id: user._id }, "zhioua_IS_Alive", {
        expiresIn: "3d",
      });
      const options = {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        httpOnly: true,
        sameSite: "lax",
      };
      res.cookie("Authorization", token, options);
      res.status(201).json({
        message: "welcom " + user.name + " to your home page",
        token,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Something went wrong" });
    }
  },
};
