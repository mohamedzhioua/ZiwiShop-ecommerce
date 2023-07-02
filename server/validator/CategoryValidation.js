const validator = require("validator");
const isEmpty = require("./IsEmpty");

module.exports = function CategoryValidation(data) {
  let errors = {};

   data.name = !isEmpty(data.name) ? data.name : "";

  // Name checks
  if (validator.isEmpty(data.name)) {
    errors.name = "Category name is required";
} else if (data.name.length < 2) {
    errors.name = "Category name must have a minimum of 2 letters";
}
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
