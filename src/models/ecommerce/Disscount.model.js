import mongoose from "mongoose"

const discountSchema = new mongoose.Schema({
    code: { 
      type: String, 
      required: true, 
      unique: true,  
    },
    type: { 
      type: String, 
      enum: ['percentage', 'fixed'],
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    },
    minPurchaseAmount: { 
      type: Number, 
      default: 0  
    },
    startDate: { 
      type: Date, 
      required: true 
    },
    endDate: { 
      type: Date, 
      required: true 
    },
    active: { 
      type: Boolean, 
      default: true 
    },
    applicableTo: { 
      type: String, 
      enum: ['PRODUCT', 'ORDERS'], 
      default: 'ORDERS'
    },
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'orders',  
  }, 
},{timestamps: true})

export const Order = mongoose.model("Discount", discountSchema)