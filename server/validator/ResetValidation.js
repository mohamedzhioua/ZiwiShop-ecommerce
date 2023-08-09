const validator = require("validator");
const isEmpty = require("./IsEmpty");

module.exports = function SignupValidation(data) {
  let regex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/i;
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

  // Password checks
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!regex.test(data.password)) {
    errors.password =
      "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long";
  }

  // Confirm Password checks
  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords not matches";
  }

  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Required confirmPassword";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
