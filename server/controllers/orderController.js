// const OrderValidation = require("../validator/OrderValidation");
const IdParamsValidation = require("../validator/IdParamsValidation");
const Order = require("../models/order");

module.exports = {
  //  ---------------------------------------- //CreatOrder//--------------------------- //

  CreatOrder: async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod ,itemsPrice ,shippingPrice,totalPrice,email , phoneNumber} = req.body;

    try {
     
      return res.status(200).json( );
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },

   

  
};
