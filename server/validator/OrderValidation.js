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
    const { firstName,lastName, address, country, city, state, street1, zipCode } = data.shippingAddress;
    if (validator.isEmpty(firstName)) {
      errors.shippingAddress = "firstNameis required for shipping";
    }
    if (validator.isEmpty(lastName)) {
        errors.shippingAddress = "lastName is required for shipping";
      }
    if (validator.isEmpty(address)) {
      errors.shippingAddress = "Address is required for shipping";
    }
    if (validator.isEmpty(country)) {
      errors.shippingAddress = "Country is required for shipping";
    }
    if (validator.isEmpty(city)) {
      errors.shippingAddress = "City is required for shipping";
    }
    if (validator.isEmpty(state)) {
      errors.shippingAddress = "State is required for shipping";
    }
    if (validator.isEmpty(street1)) {
      errors.shippingAddress = "Street1 is required for shipping";
    }
    if (validator.isEmpty(zipCode)) {
      errors.shippingAddress = "Zip code is required for shipping";
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
  if (!data.itemsPrice || !validator.isNumeric(data.itemsPrice.toString(), { no_symbols: true })) {
    errors.itemsPrice = "Invalid items price";
  }

  // ShippingPrice checks
  if (!data.shippingPrice || !validator.isNumeric(data.shippingPrice.toString(), { no_symbols: true })) {
    errors.shippingPrice = "Invalid shipping price";
  }


  // TotalPrice checks
  if (!data.totalPrice || !validator.isNumeric(data.totalPrice.toString(), { no_symbols: true })) {
    errors.totalPrice = "Invalid total price";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
