const Product = require("../models/product");
const IdParamsValidation = require("../validator/IdParamsValidation");
const Category = require("../models/category");
const Brand = require("../models/brand");
const addHrefFieldToBrands = require("../utils/brandsHandler");
const createCategories = require("../utils/categoriesHandler");
const mongoose = require("mongoose");

module.exports = {
  //  ---------------------------------------- //GetProducts//--------------------------- //
  GetClientProducts: async (req, res) => {
    try {
      const products = await Product.aggregate([
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

  //  ---------------------------------------- //GetCategories&sizes&Brands//--------------------------- //

  GetBrandsCategories: async (req, res) => {
    try {
      const options = {};

      const categories = await Category.find({}).lean().exec();
      const getBrandNames = await Brand.find({}, { name: 1, _id: 1 })
        .lean()
        .exec();

      options.categories = createCategories(categories);
      options.brands = addHrefFieldToBrands(getBrandNames);

      return res.status(200).json(options);
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
      const queryFilter =
        searchQuery && searchQuery !== "all"
          ? {
              name: {
                $regex: searchQuery,
                $options: "i",
              },
            }
          : {};
      const categoryFilter = category && category !== "all" ? { category: mongoose.Types.ObjectId(category) } : {};
      const priceFilter =
        price && price !== "all"
          ? {
              price: {
                $gte: Number(price.split("-")[0]),
                $lte: Number(price.split("-")[1]),
              },
            }
          : {};

      const brandFilter =
        brand && brand !== "all"
          ? { "brand.name": { $in: brand.split(".") } }
          : {};

      const sizeFilter =
        size && size !== "all"
          ? { "size.name": { $in: size.split(".") } }
          : {};

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
      // const products = await Product.find({
      //   ...queryFilter,
      //   ...categoryFilter,
      //   ...brandFilter,
      //   ...sizeFilter,
      //   ...priceFilter,
      // })
      //   .sort(sortOption)
      //   .skip(pageSize * (page - 1))
      //   .limit(pageSize);

      // const countProducts = await Product.countDocuments({
      //   ...queryFilter,
      //   ...categoryFilter,
      //   ...brandFilter,
      //   ...sizeFilter,
      //   ...priceFilter,
      // });
      const products = await Product.aggregate([
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
      as: "brand"
    }
  },
  {
    $lookup: {
      from: "sizes",
      localField: "sizes",
      foreignField: "_id",
      as: "sizes"
    }
  },
  {
    $lookup: {
      from: "images", 
      localField: "images",
      foreignField: "_id",
      as: "images"
    }
  },
        { $sort: sortOption() },
        { $skip: (page - 1) * pageSize },
        { $limit: pageSize },
      ]);
       return res.status(200).json(products);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
};
