import mongoose from "mongoose"
// import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema =  new mongoose.Schema({
    username: {
        type: String,
        required: false,
        unique: false,
        lowercase: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        
    },
    // avatar: {
    //   type: String, //clodinary url
    // },
    // coverImage: {
    //   type: String, // cloudinary
    // },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user', 
      },
      isActive: {
        type: Boolean,
        default: true, 
      },
},   
  {timestamps: true}
)

export const User = mongoose.model("User", userSchema)