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
        return res.status(404).json("order not found");
      }
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //PayOrder//--------------------------- //

  PayOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const { errors, isValid } = IdParamsValidation(req.params);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json("order not found");
      }

      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();

      return res.status(200).json(updatedOrder);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //GetMyOrders//--------------------------- //
  GetMyOrders: async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id })
        .populate({
          path: "orderItems.images",
          model: "image",
        })
        .lean();
      if (!orders) {
        return res.status(404).json("order not found");
      }

      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
};
