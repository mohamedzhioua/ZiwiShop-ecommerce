const Product = require("../models/product");
const IdParamsValidation = require("../validator/IdParamsValidation");
const Category = require("../models/category");
const Brand = require("../models/brand");
const Size = require("../models/size");
const addHrefFieldToBrands = require("../utils/brandsHandler");
const createCategories = require("../utils/categoriesHandler");
const mongoose = require("mongoose");

module.exports = {
  //  ---------------------------------------- //GetProducts//--------------------------- //
  GetClientProducts: async (req, res) => {
    try {
      const { query } = req;
      const pageSize = 6;
      const page = query.page || 1;
      const [products, countProducts] = await Promise.all([
        Product.aggregate([
          {
            $match: { isFeatured: true },
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
              images: { _id: 1, url: 1 },
              sizes: { _id: 1, name: 1 },
              category: {
                _id: 1,
                name: { $arrayElemAt: ["$category.name", 0] },
                parentCategory: { $arrayElemAt: ["$parentCategory.name", 0] },
              },
              createdAt: 1,
              updatedAt: 1,
              isFeatured: 1,
              isArchived: 1,
            },
          },
          { $skip: (page - 1) * pageSize },
          { $limit: pageSize },
        ]),
        Product.countDocuments({}),
      ]);
      const totalPages = Math.ceil(countProducts / pageSize);
      const result = {
        products,
        page,
        pages: totalPages,
      };
      return res.status(200).json(result);
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
        return res.status(404).json("Product not found");
      }

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },

  //  ---------------------------------------- //GetCategories//--------------------------- //

  GetCategories: async (req, res) => {
    try {
      const options = {};

      let categories = await Category.find({}).lean().exec();
          categories = createCategories(categories);
 
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //GetSearchProducts//--------------------------- //
  GetSearchProducts: async (req, res) => {
    try {
      const { query } = req;
      const pageSize = 9;
      const page = query.page || 1;
      const category = query.category || "";
      const price = query.price || "";
      const brand = query.brand || "";
      const size = query.size || "";
      const sort = query.sort || "";
      const searchQuery = query.query || "";
      // query Filter
      const bran = await Brand.find({ name: { $regex: searchQuery, $options: "i" } }, "_id");
       
      const queryFilter = searchQuery && searchQuery !== "all"
          ? {
              $or: [
                { name: { $regex: searchQuery, $options: "i" } },
                { brand: { $in: bran.map(brand => brand._id) } },
               ],
            }
          : {};
      
          // category Filter
      const categoryFilter =
        category && category !== "all"
          ? { category: mongoose.Types.ObjectId(category) }
          : {};
          // price Filter
      const priceFilter =
        price && price !== "all"
          ? {
              price: {
                $gte: Number(price.split("-")[0]),
                $lte: Number(price.split("-")[1]),
              },
            }
          : {};
      //brand filter
      const brandNames = brand.split(".");
      const Brands = await Brand.find({ name: { $in: brandNames } }, "_id");
      const BIds = Brands.map((b) => b._id);
      const brandFilter = brand && brand !== "all" ? { brand: { $in: BIds } } : {};

      //sizes filter
      const sizeNames = size.split(".");
      const Sizes = await Size.find({ name: { $in: sizeNames } }, "_id");
      const SIds = Sizes.map((size) => size._id);
      const sizeFilter = size && size !== "all" ? { sizes: { $in: SIds } } : {};

      const sortOption = () => {
        switch (sort) {
          case "createdAt.asc":
            return { createdAt: 1 };
          case "createdAt.desc":
            return { createdAt: -1 };
          case "price.asc":
            return { price: 1 };
          case "price.desc":
            return { price: -1 };
          case "name.asc":
            return { name: 1 };
          case "name.desc":
            return { name: -1 };
          default:
            return { _id: -1 };
        }
      };

      const [products, countProducts] = await Promise.all([
        Product.aggregate([
          {
            $match: {
              ...queryFilter,
              ...categoryFilter,
              ...priceFilter,
              ...brandFilter,
              ...sizeFilter,
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
              from: "brands",
              localField: "brand",
              foreignField: "_id",
              as: "brand",
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
            $lookup: {
              from: "images",
              localField: "images",
              foreignField: "_id",
              as: "images",
            },
          },
          { $sort: sortOption() },
          { $skip: (page - 1) * pageSize },
          { $limit: pageSize },
        ]),
        Product.countDocuments({
          ...queryFilter,
          ...categoryFilter,
          ...priceFilter,
          ...brandFilter,
          ...sizeFilter,
        }),
      ]);
      const totalPages = Math.ceil(countProducts / pageSize);
      const sizeIds = await Product.find().distinct("sizes");
      const sizes = await Size.find({ _id: { $in: sizeIds } });
      const brandIds = await Product.find().distinct("brand");
      const brands = await Brand.find({ _id: { $in: brandIds } });
      const result = {
        products,
        countProducts,
        page,
        pages: totalPages,
        brands,
        sizes,
      };
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //getRelatedProducts//--------------------------- //

  getRelatedProducts: async (req, res) => {
  try {
    const { id } = req.params;
     const { errors, isValid } = IdParamsValidation(req.params);
    if (!isValid) {
      return res.status(400).json(errors);
    }
   const  relatedProducts = await Product.find({category:mongoose.Types.ObjectId(id)})
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
 
 if (!relatedProducts) {
   return res.status(404).json( "relatedProducts not found");
 }
    return res.status(200).json(relatedProducts);
  } catch (error) {
    return res.status(500).send("Error: " + error.message);    
  }
  }

};
