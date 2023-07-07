const ProductValidation = require("../validator/ProductValidation");
const IdParamsValidation = require("../validator/IdParamsValidation");
const Product = require("../models/product");
const Size = require("../models/size");
const Category = require("../models/category");

module.exports = {
 //  ---------------------------------------- //GetCategories&sizes//--------------------------- //

 Getoptions: async (req, res) => {
  try {
    const options = {};

    const sizeAggregation = Size.aggregate([{ $project: { _id: 0, name: 1 } }]);
    const categoryAggregation = Category.aggregate([{ $project: { _id: 0, name: 1 } }]);

    const [sizeNames, categoryNames] = await Promise.all([
      sizeAggregation.exec(),
      categoryAggregation.exec()
    ]);

    options.sizes = sizeNames.map(size => size.name);
    options.categories = categoryNames.map(category => category.name);

    return res.status(200).json(options);
  } catch (error) {
    return res.status(500).send("Error: " + error.message);
  }
},
 
};
