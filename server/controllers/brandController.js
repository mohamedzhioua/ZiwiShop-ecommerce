const BrandValidation = require("../validator/BrandValidation");
const IdParamsValidation = require("../validator/IdParamsValidation");
const Brand = require("../models/brand");

module.exports = {
  //  ---------------------------------------- //GetBrands//--------------------------- //

  GetBrands: async (req, res) => {
    try {
      const brands = await Brand.aggregate([
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
      return res.status(200).json(brands);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },

  //  ---------------------------------------- //AddSize//--------------------------- //

  AddBrand: async (req, res) => {
    try {
      const { name } = req.body;
      const { errors, isValid } = BrandValidation(req.body);
      if (!isValid) {
        res.status(404).json(errors);
      }
      const existingBrand = await Brand.findOne({ name });
      if (existingBrand) {
        errors.name = "Brand with the same name already exists";
        return res.status(404).json(errors);
      }
      const newBrand= await Brand.create({
        name,
       });
      return res.status(200).json(newBrand);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //updateSize//--------------------------- //

  UpdateBrand: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const { errors, isValid } = BrandValidation(req.body);
      const { errors: paramsErrors, isValid: isParamsValid } =
        IdParamsValidation(req.params);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      if (!isParamsValid) {
        return res.status(400).json(paramsErrors);
      }

      const brand = await Brand.findById(id);

      if (!brand) {
        return res.status(404).json({ error: "Brand not found" });
      }

      brand.name = name || brand.name;
 
      await brand.save();

      return res.status(200).json(brand);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //GetOneSize//--------------------------- //

  GetOneBrand: async (req, res) => {
    try {
      const { id } = req.params;
      const { errors, isValid } = IdParamsValidation(req.params);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const brand = await Brand.findById(id).lean();

      if (!brand) {
        return res.status(404).json({ error: "Brand not found" });
      }

      return res.status(200).json(brand);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },

  //  ---------------------------------------- //DeleteSize//--------------------------- //

  DeleteBrand: async (req, res) => {
    try {
      const { id } = req.params;
      const { errors, isValid } = IdParamsValidation(req.params);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const brand = await Brand.findById(id);

      if (!brand) {
        return res.status(404).json({ error: "Brand not found" });
      }

      await brand.remove();

      return res.status(200).json();
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
};
