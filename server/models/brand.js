const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = new Schema(
  {
    name: {
        type: String,
        trim: true,
        required: true,
      },
      images: [
        {
          type: Schema.Types.ObjectId,
          ref: "image",
        },
      ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("brand", BrandSchema);
