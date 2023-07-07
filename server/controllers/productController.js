const ProductValidation = require("../validator/ProductValidation");
const IdParamsValidation = require("../validator/IdParamsValidation");
const Product = require("../models/product");
const Size = require("../models/size");
const Category = require("../models/category");
const Brand = require("../models/brand");

module.exports = {
 //  ---------------------------------------- //GetCategories&sizes//--------------------------- //

 Getoptions: async (req, res) => {
  try {
    const options = {};

    const getSizeNames = Size.find({}, { name: 1, _id: 0 }).lean().exec();
    const getCategoryNames = Category.find({}, { name: 1, _id: 0 }).lean().exec();
    const getBrandNames = Brand.find({}, { name: 1, _id: 0 }).lean().exec();
  
    const [sizeNames, categoryNames, brandNames] = await Promise.all([
      getSizeNames,
      getCategoryNames,
      getBrandNames
    ]);
    options.sizes = sizeNames.map(size => size.name);
    options.categories = categoryNames.map(category => category.name);
    options.brands = brandNames.map(brand => brand.name);
    
     return res.status(200).json(options);
  } catch (error) {
    return res.status(500).send("Error: " + error.message);
  }
},
 
};
