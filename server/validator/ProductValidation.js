const validator = require("validator");
const isEmpty = require("./IsEmpty");

module.exports = function ProductValidation(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator
  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.sizes = !isEmpty(data.sizes) ? data.sizes : [];
  data.images = !isEmpty(data.images) ? data.images : [];
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";
  
  // Name checks
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Description checks
  if (validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  } else if (!validator.isLength(data.description, { min: 10, max: 300 })) {
    errors.description = "Description must be between 10 and 300 characters";
  }

  // Price checks
  if (validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  } else if (!validator.isNumeric(data.price)) {
    errors.price = "Price must be a valid number";
  }

  // Category checks
  if (validator.isEmpty(data.category)) {
    errors.category = "Category field is required";
  }

  // Sizes checks
// Sizes checks
if (!Array.isArray(data.sizes)) {
  data.sizes = [data.sizes]; // Convert to array with a single element
}

if (data.sizes.length === 0) {
  errors.sizes = "Size field is required";
}

  // Images checks
  if (!Array.isArray(data.images) || data.images.length === 0) {
    errors.images = "You must choose at least 1 image";
  } else if (data.images.length > 5) {
    errors.images = "You can only choose up to 5 images";
  }

   // Quantity checks
   if (validator.isEmpty(data.quantity)) {
    errors.quantity = "Quantity field is required";
  } else if (!validator.isNumeric(data.quantity)) {
    errors.quantity = "Quantity must be a valid number";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
