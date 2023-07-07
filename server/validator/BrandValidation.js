const validator = require("validator");
const isEmpty = require("./IsEmpty");

module.exports = function BrandValidation(data) {
  let errors = {};

   data.name = !isEmpty(data.name) ? data.name : "";

  // Name checks
  if (validator.isEmpty(data.name)) {
    errors.name = "Brand name is required";
} else if (data.name.length < 2) {
    errors.name = "Brand name must have a minimum of 2 letters";
}
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
