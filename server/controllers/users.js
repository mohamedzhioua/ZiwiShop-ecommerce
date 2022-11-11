const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  //  ---------------------------------------- //signup method to add a new user//--------------------------- //

  signup: async (req, res) => {
    let regex =
      /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/i;
    try {
      const { name, email, password } = req.body;
      if (!email || !password || !name) {
        return res.status(400).send({ message: "please fill all the fields " });
      } else if (!validator.isEmail(email)) {
        return res.status(400).send({
          message: "Format Email required",
        });
      } else if (!regex.test(password)) {
        return res.status(400).send({
          message:
            "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long",
        });
      }
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(401).send({
          message: "Email User already Exist please try another Email",
        });
      }
      const hashedPassword = bcrypt.hashSync(password, 8);
      await User.create({
        name,
        email,
        password: hashedPassword,
      });
      res.status(201).send({ message: "user added with success" });
    } catch (error) {
      res.status(401).send({ message: "Something went wrong" });
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
      const token = jwt.sign(
        { id: user._id },
         "zhioua_IS_Alive" ,
        { expiresIn: "3d" }
      );
      const options= {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        httpOnly: true,
        sameSite: "lax",
      } 
      res.cookie("Authorization", token, options);
     res.status(201).json({message:"welcom"+ user.name +"to you home page",token,user})
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Something went wrong" })
    }
  },
};
