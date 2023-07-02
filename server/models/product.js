const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    sizes: [
      {
        type: Schema.Types.ObjectId,
        ref: "size",
        required: true,
      },
    ],
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "image",
      },
    ],
    Featured: {
      type: String,
      required: true,
    },
    Archived: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
