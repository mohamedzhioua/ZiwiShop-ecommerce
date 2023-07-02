 const validator = require("validator");
const isEmpty = require("./IsEmpty");

module.exports = function IdParamsValidation(data) {
  let errors = {};

  data.id = !isEmpty(data.id) ? data.id : "";

   if (validator.isEmpty(data.id)) {
    errors.id = "ID is required";
  } else if (!validator.isMongoId(data.id)) {
    errors.id = "Invalid ID";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
