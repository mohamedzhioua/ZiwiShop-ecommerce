const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "category", // Reference to the Category model itself
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", CategorySchema);
