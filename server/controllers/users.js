const User = require("../models/user");


module.exports ={
    signup:async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const hashedPassword = bcrypt.hashSync(Password, 8);

    await Users.create({ Email, Password: hashedPassword });
    res.status(201).json({ message: "user added with success" });
  } catch (error) {
    console.log(error.message);
    res
      .status(401)
      .json({ message: "Email User already Exist please try another Email" });
  }
}
}