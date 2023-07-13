const ProductValidation = require("../validator/ProductValidation");
const IdParamsValidation = require("../validator/IdParamsValidation");
const Product = require("../models/product");
const Size = require("../models/size");
const Category = require("../models/category");
const Brand = require("../models/brand");
const Image = require("../models/image");
const { removeFromCloudinary } = require("../utils/cloudinaryHandler");

function createCategories(categories, parentCategory = null) {
  const categoryList = [];
  let category;
  if (parentCategory === null) {
    category = categories.filter((cat) => cat.parentCategory === null);
  } else {
    category = categories.filter((cat) =>
      parentCategory.equals(cat.parentCategory)
    );
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      parentCategory: cate.parentCategory,
      childCategories: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}
module.exports = {
  //  ---------------------------------------- //GetCategories&sizes&Brands//--------------------------- //
 
  Getoptions: async (req, res) => {
    try {
      const options = {};

      const getSizeNames = Size.find({}, { name: 1, _id: 1 }).lean().exec();
      const categories = await Category.find({}).lean().exec();
      const getBrandNames = Brand.find({}, { name: 1, _id: 1 }).lean().exec();

      const [sizeNames, brandNames] = await Promise.all([
        getSizeNames,
        getBrandNames,
      ]);

      options.sizes = sizeNames;
      options.categories = createCategories(categories);
      options.brands = brandNames;

      return res.status(200).json(options);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //AddProduct//--------------------------- //

  AddProduct: async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        category,
        sizes,
        quantity,
        brand,
        isFeatured,
        isArchived,
      } = req.body;
      const { errors, isValid } = ProductValidation(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const createdImages = await Promise.all(
        req.body.images.map(async (imageData) => {
          const { url, cloudinary_id } = imageData;
          const newImage = await Image.create({ url, cloudinary_id });
          return newImage._id;
        })
      );

      const newProduct = await Product.create({
        name,
        description,
        price,
        category,
        sizes,
        images: createdImages,
        quantity,
        brand,
        isArchived,
        isFeatured,
      });

      return res.status(200).json(newProduct);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //GetOneProduct//--------------------------- //
  GetOneProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { errors, isValid } = IdParamsValidation(req.params);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const product = await Product.findById(id)
        .populate("images", "_id url cloudinary_id")
        .select(
          "_id name price quantity images sizes category brand isFeatured isArchived description"
        );

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //GetProducts//--------------------------- //
  GetProducts: async (req, res) => {
    try {
      const products = await Product.aggregate([
        {
          $match: {},
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
          $project: {
            _id: 1,
            name: 1,
            price: 1,
            quantity: 1,
            images: { _id: 1, url: 1, cloudinary_id: 1 },
            sizes: { _id: 1, name: 1 },
            category: {
              _id: 1,
              name: { $arrayElemAt: ["$category.name", 0] },
              parentCategory: { $arrayElemAt: ["$parentCategory.name", 0] },
            },
          },
        },
      ]);

      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
    //  ---------------------------------------- //DeleteProductImages//--------------------------- //
    DeleteProductImages: async (req, res) => {
    try {
      const { id } = req.params;
      const { url, _id ,cloudinary_id } = req.body;
      const { errors, isValid } = IdParamsValidation(req.params);
      if (!isValid) {
        return res.status(400).json(errors);
      }
     
      const image = await Image.findById(_id);
      const product = await Product.findById(id);
 
      if (!image) {
        return res.status(400).json("image not found");
      }
       await removeFromCloudinary(cloudinary_id);
       await image.remove()
       product.images.pull(_id);
       await product.save();
       return res.status(200).json();
     } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
    },
};
