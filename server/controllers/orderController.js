const OrderValidation = require("../validator/OrderValidation");
const IdParamsValidation = require("../validator/IdParamsValidation");
const Order = require("../models/order");

module.exports = {
  //  ---------------------------------------- //CreatOrder//--------------------------- //

  CreateOrder: async (req, res) => {
    try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      email,
      phoneNumber,
    } = req.body;
    const { errors, isValid } = OrderValidation(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
      const newOrder = await Order.create({
        orderItems,
        shippingAddress: {
          ...shippingAddress,  
          fullName: `${firstName} ${lastName}`,  
        },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        userEmail: email,
        userPhone: phoneNumber,
        user: req.user._id,
      });
      return res.status(201).json(newOrder);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
};
