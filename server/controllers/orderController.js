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
    const { firstName, lastName } = shippingAddress;
       const newOrder = await Order.create({
        orderItems,
        shippingAddress: {
           fullName: `${firstName} ${lastName}`,  
           ...shippingAddress,
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
    //  ---------------------------------------- //GetOneOrder//--------------------------- //

    GetOneOrder: async (req, res) => {
      try {
        const { id } = req.params;
        const { errors, isValid } = IdParamsValidation(req.params);
        if (!isValid) {
          return res.status(400).json(errors);
        }
        const order = await Order.findById(id)
      .populate({
        path: "orderItems.images",
        model: "image",  
      })
      .lean();

        if (!order) {
          return res.status(400).json("order not found");
        }
        return res.status(200).json(order);
    } catch (error) {
       return res.status(500).send("Error: " + error.message);
    }
  },
};
