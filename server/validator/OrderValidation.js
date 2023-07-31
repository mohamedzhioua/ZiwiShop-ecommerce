const validator = require("validator");
const isEmpty = require("./IsEmpty");

module.exports = function OrderValidation(data) {
  let errors = {};

  // OrderItems checks
  if (!Array.isArray(data.orderItems) || data.orderItems.length === 0) {
    errors.orderItems = "Order items are required";
  } else {
    data.orderItems.forEach((item, index) => {
      if (!item.name || !item.quantity || !item.price || !item.product) {
        errors.orderItems = `Incomplete information for order item at index ${index}`;
      }
    });
  }

  // ShippingAddress checks
  if (!data.shippingAddress) {
    errors.shippingAddress = "Shipping address is required";
  } else {
    const { firstName, lastName, country, city, state, street1, zipCode } = data.shippingAddress;
     const addressErrors = [];
  
    if (validator.isEmpty(firstName)) {
      addressErrors.push("First name is required for shipping");
    }
    if (validator.isEmpty(lastName)) {
      addressErrors.push("Last name is required for shipping");
    }
    if (validator.isEmpty(country)) {
      addressErrors.push("Country is required for shipping");
    }
    if (validator.isEmpty(city)) {
      addressErrors.push("City is required for shipping");
    }
    if (validator.isEmpty(state)) {
      addressErrors.push("State is required for shipping");
    }
    if (validator.isEmpty(street1)) {
      addressErrors.push("Street1 is required for shipping");
    }
    if (validator.isEmpty(zipCode.toString())) {
      addressErrors.push("Zip code is required for shipping");
    }
  
  
    if (addressErrors.length > 0) {
      errors.shippingAddress = addressErrors.join(", ");
    }
  }
  

  // PaymentMethod checks
  if (validator.isEmpty(data.paymentMethod)) {
    errors.paymentMethod = "Payment method is required";
  }

  // UserEmail checks
  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = "Invalid user email";
  }

  // UserPhone checks
  if (!data.phoneNumber || !validator.isMobilePhone(data.phoneNumber.toString(), "any", { strictMode: false })) {
    errors.phoneNumber = "Invalid user phone number";
  }

// ItemsPrice checks
if (typeof data.itemsPrice !== "number" || data.itemsPrice <= 0) {
    errors.itemsPrice = "Invalid items price";
  }
  

  // ShippingPrice checks
  if (typeof data.shippingPrice !== "number" || data.shippingPrice < 0) {
    errors.shippingPrice = "Invalid shipping price";
  }


  // TotalPrice checks
 
  if (typeof data.totalPrice !== "number" || data.totalPrice <= 0) {
    errors.totalPrice = "Invalid total  price";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
