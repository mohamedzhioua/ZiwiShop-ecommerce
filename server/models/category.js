const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
      /**
   * OPTIONAL: Parent category id
   * Ex: Electronics > Mobile
   * In case of mobile it will store id of electronics category
   */
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "category", // Reference to the Category model itself
    },
     /**
   * Is category a leaf category
   * Leaf category have product as child
   * Non leaf category have category as child
   * Ex: Electronics > Mobile
   * Here electronics is not leaf category because it doesn't have any product
   * Mobile is leaf category because it has products as child
   */
    isLeaf: {
      type: Boolean,
      default: false,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", CategorySchema);
