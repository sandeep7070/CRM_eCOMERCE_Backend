import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    }
})

const OrderSchema = new mongoose.Schema({
   orderPrice: {
    type: Number,
    required: true
   },
   customer:{
    type: mongoose.Schema.Type.ObjectId,
    ref: "User"
   },
   orderItems: {
    type: [orderItemSchema]
   },
   address: {
    type: String,

   },
   status: {
    type: String,
    enum: ["PENDING", "CANCELLED", "DELIVERED"],
    default: "PENDING"
   },
   shippingAddress: { 
    type: String, 
    required: true 
  },
  paymentStatus: { 
    type: String, 
    enum: ['PENDING', 'PAID', 'FAILED'], 
    default: 'PENDING' 
  },

},{timestamps: true})


export const Order = mongoose.model("Order", OrderSchema)