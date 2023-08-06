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
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      const soldOrderStatistics = await Order.aggregate([
        { $match: { isPaid: true, createdAt: { $gte: lastWeek } } },
        {
          $group: {
            _id: { $dayOfWeek: '$createdAt' },
            totalRevenue: { $sum: { $multiply: ['$totalPrice', 1] } }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      const dailyRevenue = Array(7).fill(0);
      soldOrderStatistics.forEach(stat => {
        dailyRevenue[stat._id - 1] = stat.totalRevenue;
      });
  
  
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const info = {
        userCount,
        productsInStock:totalProductsInStock,
        paidOrderCount,
        totalRevenue:revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0,
        dailyRevenue
      };

      res.status(200).json(info);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
