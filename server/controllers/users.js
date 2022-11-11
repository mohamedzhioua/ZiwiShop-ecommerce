const User = require("../models/user");
const  validator = require('validator');
const bcrypt = require('bcryptjs')


module.exports = {

  signup: async (req, res) => {
    let regex =
      /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/i;
    try {
      const {name, email, password } = req.body;
      console.log(req.body);
      if (!email || !password || !name) {
        return res.status(400).send({ message: "please fill all the fields " });
      }else if (!validator.isEmail(email)){
        return res.status(400).send({
            message:"Format Email required"
          });
      } else if (!regex.test(password)) {
        return res.status(400).send({
          message:
            "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long",
        });
      }
      const emailExist = await User.findOne({email}) ;
      if (emailExist){
        return res.status(401).send({message:"Email User already Exist please try another Email"})
      }
      const hashedPassword = bcrypt.hashSync(password,8) 
    await User.create({
      name,
      email,
      password:hashedPassword
    })
    res.status(201).send({ message: "user added with success" })


    } catch (error) {
       res
        .status(401)
        .json({ message: "Something went wrong" });
    }
  },
};
