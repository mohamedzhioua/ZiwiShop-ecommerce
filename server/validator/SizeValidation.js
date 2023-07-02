const validator = require("validator");
const isEmpty = require("./IsEmpty");

module.exports = function SizeValidation(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator
  data.name = !isEmpty(data.name) ? data.name : "";
  data.value = !isEmpty(data.value) ? data.value : "";

  // Name checks
  if (validator.isEmpty(data.name)) {
    errors.name = "Size name is required";
  }else if (data.name.length < 2) {
    errors.name = "Size name must have a minimum of 2 letters";
}
  // Value checks
  if (validator.isEmpty(data.value)) {
    errors.value = "Size value is required";
  }else if (data.value.length < 1) {
    errors.name = "Size value must have a minimum of 1 letter";
}

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
