const SizeValidation = require("../validator/SizeValidation");
const IdParamsValidation = require("../validator/IdParamsValidation");
const Size = require("../models/size");

module.exports = {
  //  ---------------------------------------- //GetSizes//--------------------------- //

  GetSizes: async (req, res) => {
    try {
      const sizes = await Size.aggregate([
        {
          $project: {
            id: "$_id",
            name: 1,
            value: 1,
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
        return res.status(404).json(errors);
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
      const { id } = req.params;
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

      const size = await Size.findById(id);

      if (!size) {
        return res.status(404).json("Size not found");
      }

      size.name = name || size.name;
      size.value = value || size.value;

      await size.save();

      return res.status(200).json(size);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
  //  ---------------------------------------- //GetOneSize//--------------------------- //

  GetOneSize: async (req, res) => {
    try {
      const { id } = req.params;
      const { errors, isValid } = IdParamsValidation(req.params);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const size = await Size.findById(id).lean();

      if (!size) {
        return res.status(404).json("Size not found");
      }

      return res.status(200).json(size);
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },

  //  ---------------------------------------- //DeleteSize//--------------------------- //

  DeleteSize: async (req, res) => {
    try {
      const { id } = req.params;
      const { errors, isValid } = IdParamsValidation(req.params);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const size = await Size.findById(id);

      if (!size) {
        return res.status(404).json("Size not found");
      }

      await size.remove();

      return res.status(200).json();
    } catch (error) {
      return res.status(500).send("Error: " + error.message);
    }
  },
};
