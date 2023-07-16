  const Product = require("../models/product");
const IdParamsValidation = require("../validator/IdParamsValidation");


module.exports = {
 //  ---------------------------------------- //GetProducts//--------------------------- //
  GetClientProducts: async (req, res) => {
    try {
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
            countInStock: 1,
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
 //  ---------------------------------------- //GetOneProduct//--------------------------- //
 GetClientOneProduct: async (req, res) => {
  try {
    const { id } = req.params;
    const { errors, isValid } = IdParamsValidation(req.params);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const product = await Product.findById(id)
      .populate("images", "_id url")
      .populate("sizes", "_id name value")
      .populate({
        path: "category",
        select: "_id name parentCategory",
        populate: {
          path: "parentCategory",
          select: "name",
        },
      })
      .select(
        "_id name price countInStock images sizes category brand isFeatured isArchived description"
      );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).send("Error: " + error.message);
  }
},



 
};
