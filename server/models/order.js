const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        images: [
            {
              type: Schema.Types.ObjectId,
              ref: "image",
            },
          ],
        price: { type: Number, required: true },
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      country: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      street1: { type: String, required: true },
      street2: { type: String },
      zipCode: { type: Number, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number},
    totalPrice: { type: Number, required: true },
    user: {  type: Schema.Types.ObjectId, ref: "user", required: true },
    userEmail: { type: String , required: true }, 
    userPhone: { type: Number , required: true },  
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", OrderSchema);
