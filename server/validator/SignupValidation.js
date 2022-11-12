const validator = require("validator");

module.exports = function SignupValidation  (data)  {
  let regex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/i;
  let errors = {};

  if (!data.name) {
    errors.name = "Name field is required";
  }
  if (!data.email) {
    errors.email = "Email field is required";
  } 
   if (!validator.isEmail(data.email)) {
    errors.email = "Format Email required";
  }
  if (!data.password) {
    errors.password = "Password field is required";
  } 
  else if (!regex.test(data.password)) {
    errors.password =
      "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long";
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0
}
};

 