import mongoose from 'mongoose'

const shippingSchema = new mongoose.Schema({
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',  
      required: true
    },
    shippingMethod: {  
      type: String,
      enum: ['Standard', 'Express', 'Overnight'],
      required: true
    },
    shippingCost: { 
      type: Number,
      required: true
    },
    shippingAddress: {  // addresss
      type: String,
      required: true
    },
    shippingCity: {  // city
      type: String,
      required: true
    },
    shippingState: {  // state
      type: String,
      required: true
    },
    shippingPostalCode: {  
      type: String,
      required: true
    },
    trackingNumber: {  
      type: String,
    },
    shippingStatus: { 
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered'],
      default: 'Pending'
    },
    shippingDate: { 
      type: Date,
      default: Date.now
    },
    estimatedDeliveryDate: {  // deliverd 
      type: Date
    }
  }, { timestamps: true });


  export const Shipping = mongoose.model("Shipping", shippingSchema)