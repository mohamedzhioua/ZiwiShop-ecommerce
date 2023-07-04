const SizeValidation = require("../validator/SizeValidation");
const IdParamsValidation = require("../validator/IdParamsValidation");
const Size = require("../models/Size");

module.exports = {
  //  ---------------------------------------- //GetSizes//--------------------------- //

  GetSizes: async (req, res) => {
    try {
      const sizes = await Size.find().lean();
      return res.status(200).json(sizes);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },

  //  ---------------------------------------- //AddSize//--------------------------- //

  AddSize: async (req, res) => {
    try {
      const { name, value } = req.body;
      const { errors, isValid } = SizeValidation(req.body);
      if (!isValid) {
        res.status(404).json(errors);
      }
      const existingSize = await Size.findOne({ name });
      if (existingSize) {
        errors.name = "Size with the same name already exists";
        res.status(404).json(errors);
      }
      const newSize = await Size.create({
        name,
        value,
      });
      return res.status(200).json(newSize);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //updateSize//--------------------------- //

  UpdateSize: async (req, res) => {
    try {
      const { sizeId } = req.params;
      const { name, value } = req.body;
      const { errors, isValid } = SizeValidation(req.body);
      const { errors: paramsErrors, isValid: isParamsValid } =
        IdParamsValidation(req.params);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      if (!isParamsValid) {
        return res.status(400).json(paramsErrors);
      }

      const size = await Size.findById(sizeId);

      if (!size) {
        return res.status(404).json({ error: "Size not found" });
      }

      size.name = name || size.name;
      size.value = value || size.value;

      await size.save();

      return res.status(200).json(size);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
};
