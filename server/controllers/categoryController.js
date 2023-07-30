const CategoryValidation = require("../validator/CategoryValidation");
const IdParamsValidation = require("../validator/IdParamsValidation");
const Category = require("../models/category");

module.exports = {
  //  ---------------------------------------- //GetCategories//--------------------------- //
  GetCategories: async (req, res) => {
    try {
      const categories = await Category.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "parentCategory",
            foreignField: "_id",
            as: "parentCategory",
          },
        },
        {
          $unwind: {
            path: "$parentCategory",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            parentCategory: "$parentCategory.name",
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //AddCategory//--------------------------- //

  AddCategory: async (req, res) => {
    try {
      const { name, parentCategory, isLeaf } = req.body;
      const { errors, isValid } = CategoryValidation(req.body);
      if (!isValid) {
        res.status(400).json(errors);
      }
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        errors.name = "Category with the same name already exists";
        return res.status(400).json(errors);
      }
      const newCategory = await Category.create({
        name,
        parentCategory,
        isLeaf,
      });
      return res.status(200).json(newCategory);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //UpdateCategory//--------------------------- //

  UpdateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, parentCategory, isLeaf } = req.body;
        const { errors, isValid } = CategoryValidation(req.body);
      const { errors: paramsErrors, isValid: isParamsValid } =
        IdParamsValidation(req.params);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      if (!isParamsValid) {
        return res.status(400).json(paramsErrors);
      }
      const category = await Category.findById(id);
       if (!category) {
        return res.status(400).json("Category not found");
      }
       
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        {
          name,
          parentCategory : parentCategory === "" ? null : parentCategory,
          isLeaf,
        },
        { new: true }
      );
       return res.status(200).json(updatedCategory);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //GetOneCategory//--------------------------- //

  GetOneCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { errors, isValid } = IdParamsValidation(req.params);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const category = await Category.findById(id)
        .populate("parentCategory", "name")
        .lean();

      if (!category) {
        return res.status(400).json("Category not found");
      }

      if (category.parentCategory) {
        const parentCategory = await Category.findById(
          category.parentCategory
        ).lean();
        if (parentCategory) {
          category.parentCategory = parentCategory.name;
        }
      }
      // try {
      //   const { id } = req.params;
      //   const { errors, isValid } = IdParamsValidation(req.params);
      //   if (!isValid) {
      //     return res.status(400).json(errors);
      //   }

      //   const category = await Category.findById(id)
      //     .populate("parentCategory", "name isLeaf") // Include the 'isLeaf' field in the population
      //     .lean();

      //   if (!category) {
      //     return res.status(400).json("Category not found");
      //   }

      //   if (category.parentCategory) {
      //     if (category.parentCategory.isLeaf) {
      //       const parentCategory = await Category.findById(
      //         category.parentCategory._id // Use the '_id' field to query the parent category
      //       ).lean();
      //       if (parentCategory) {
      //         category.parentCategory = parentCategory.name;
      //       }
      //     } else {
      //       category.parentCategory = category.parentCategory.name;
      //     }
      //   }

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },

  //  ---------------------------------------- //DeleteCategory//--------------------------- //

  DeleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { errors, isValid } = IdParamsValidation(req.params);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const category = await Category.findById(id);
      if (!category) {
        return res.status(400).json("Category not found");
      }
      await category.remove();
      return res.status(200).json();
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //GetCategoryParents//--------------------------- //

  GetCategoryParents: async (req, res) => {
    try {
      const parentCategories = await Category.find({ isLeaf: false });
      if (!parentCategories) {
        return res.status(400).json("No Parent categories found");
      }
      return res.status(200).json(parentCategories);
      return res.status(200).json();
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
};
