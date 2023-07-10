const ProductValidation = require("../validator/ProductValidation");
const IdParamsValidation = require("../validator/IdParamsValidation");
const Product = require("../models/product");
const Size = require("../models/size");
const Category = require("../models/category");
const Brand = require("../models/brand");
const Image = require("../models/image");

module.exports = {
  //  ---------------------------------------- //GetCategories&sizes&Brands//--------------------------- //
  Getoptions: async (req, res) => {
    try {
      const options = {};

      const getSizeNames = Size.find({}, { name: 1, _id: 1 }).lean().exec();
      const getCategoryNames = Category.aggregate([
        {
          $match: {
            parentCategory: null,
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parentCategory",
            as: "childCategories",
          },
        },
      ])
        .project({
          _id: 1,
          name: 1,
          childCategories: {
            $map: {
              input: "$childCategories",
              as: "child",
              in: {
                _id: "$$child._id",
                name: "$$child.name",
              },
            },
          },
        })
        .exec();
      const getBrandNames = Brand.find({}, { name: 1, _id: 1 }).lean().exec();

      const [sizeNames, categoryNames, brandNames] = await Promise.all([
        getSizeNames,
        getCategoryNames,
        getBrandNames,
      ]);
      options.sizes = sizeNames;
      options.categories = categoryNames.map((category) => {
        if (category.childCategories.length === 0) {
          return category.name;
        } else {
          return {
            name: category.name,
            childCategories: category.childCategories,
          };
        }
      });
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

      // Create image objects
      const createdImages = await Promise.all(
        req.body.images.map(async (imageData) => {
          const { url, cloudinary_id } = imageData;
          const newImage = await Image.create({ url, cloudinary_id });
          return newImage._id;
        })
      );

      // Create product using image IDs
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
   //  ---------------------------------------- //GetProducts//--------------------------- //

// GetProducts: async (req, res) => {
//   try {
//     const products = await Product.aggregate([
//       {
//         $match: {} // Empty match object retrieves all products
//       },
//       {
//         $lookup: {
//           from: 'images',
//           localField: 'images',
//           foreignField: '_id',
//           as: 'images'
//         }
//       },
//       {
//         $lookup: {
//           from: 'categories',
//           localField: 'category',
//           foreignField: '_id',
//           as: 'category'
//         }
//       },
//       {
//         $lookup: {
//           from: 'sizes',
//           localField: 'sizes',
//           foreignField: '_id',
//           as: 'sizes'
//         }
//       }
//     ]);

//     return res.status(200).json(products);
//   } catch (error) {
//     return res.status(500).send("Error: " + error.message);
//   }
// },
GetProducts: async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $match: {} // Empty match object retrieves all products
      },
      {
        $lookup: {
          from: 'images',
          localField: 'images',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category.parentCategory',
          foreignField: '_id',
          as: 'parentCategory'
        }
      },
      {
        $lookup: {
          from: 'sizes',
          localField: 'sizes',
          foreignField: '_id',
          as: 'sizes'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          images: { _id: 1, url: 1, cloudinary_id: 1 },
          sizes: { _id: 1, name: 1 },
          category: {
            _id: 1,
            name: { $arrayElemAt: ['$category.name', 0] },
            parentCategory: { $arrayElemAt: ['$parentCategory.name', 0] }
          }
        }
      }
    ]);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send("Error: " + error.message);
  }
},
};
