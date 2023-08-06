const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");

module.exports = {
  //  ---------------------------------------- //signup method to add a new user//--------------------------- //

  getInfo: async (req, res) => {
    try {
      const userCount = await User.countDocuments();
      const productsInStockResult = await Product.aggregate([
        { $match: { countInStock: { $gt: 0 } } },
        { $group: { _id: null, totalProductsInStock: { $sum: '$countInStock' } } }
      ]);
      const totalProductsInStock = productsInStockResult.length > 0
      ? productsInStockResult[0].totalProductsInStock
      : 0;
      const paidOrderCount = await Order.countDocuments({ isPaid: true });

      const revenueResult = await Order.aggregate([
        { $unwind: "$orderItems" },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: {
                $multiply: ["$orderItems.price", "$orderItems.quantity"],
              },
            },
          },
        },
      ]);

      const info = {
        userCount,
        productsInStock:totalProductsInStock,
        paidOrderCount,
        totalRevenue:revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0,
      };

      res.status(200).json(info);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
