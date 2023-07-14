  const Product = require("../models/product");
  const Size = require("../models/size");
  const Category = require("../models/category");
  const Brand = require("../models/brand");
  const Image = require("../models/image");

module.exports = {
 
 
  //  ---------------------------------------- //GetProducts//--------------------------- //
  GetClientProducts: async (req, res) => {
    try {
      console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      const products = await Product.aggregate([
        {
          $match: {isFeatured: true},
        },
        {
          $lookup: {
            from: "images",
            localField: "images",
            foreignField: "_id",
            as: "images",
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category.parentCategory",
            foreignField: "_id",
            as: "parentCategory",
          },
        },
        {
          $lookup: {
            from: "sizes",
            localField: "sizes",
            foreignField: "_id",
            as: "sizes",
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            price: 1,
            quantity: 1,
            images: { _id:1, url: 1},
            sizes: { _id: 1, name: 1 },
            category: {
              _id: 1,
              name: { $arrayElemAt: ["$category.name", 0] },
              parentCategory: { $arrayElemAt: ["$parentCategory.name", 0] },
            },
            createdAt: 1,
            updatedAt: 1,
            isFeatured:1,
            isArchived:1,
           },
        },
      ]);

      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
 
 
};
