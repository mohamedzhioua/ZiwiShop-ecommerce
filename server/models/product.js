const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    sku: {
      type: String
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
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
    countInStock: {
      type: Number,
      required: true,
     },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'brand',
      default: null
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

 
module.exports = mongoose.model("product", ProductSchema);
