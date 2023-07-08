const CategoryValidation = require("../validator/CategoryValidation");
const IdParamsValidation = require("../validator/IdParamsValidation");
const Category = require("../models/category");

module.exports = {
  //  ---------------------------------------- //GetCategories//--------------------------- //
  GetCategories: async (req, res) => {
    try {
      const categories = await Category.aggregate([
        {
          $project: {
            id: "$_id",
            name: 1,
            createdAt: 1,
            _id: 0,
          },
        },
        {
          $sort: {
            createdAt: -1,
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
      const { name } = req.body;
      const { errors, isValid } = CategoryValidation(req.body);
      if (!isValid) {
        res.status(400).json(errors);
      }
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        errors.name = "Category with the same name already exists";
        return res.status(400).json(errors);
      }
      const newCategory = await Category.create({ name });
      return res.status(200).json(newCategory);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //UpdateCategory//--------------------------- //

  UpdateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
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
        return res.status(400).json("Category not found" );
      }
      category.name = name || category.name;
      await category.save();
      return res.status(200).json(category);
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
      const category = await Category.findById(id).lean();
      if (!category) {
        return res.status(400).json("Category not found");
      }
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
};
