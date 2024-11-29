import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/ecommerce/user.model.js';
import bcrypt from 'bcrypt';

// Controller for user registration 
const registerUser = asyncHandler(async (req, res) => {
   const { username, email, password } = req.body;

   // Validate input
   if (!username || !email || !password) {
      return res.status(400).json({ 
         success: false,
         message: "All fields are required!" 
      });
   }

   // Check if user already exists
   const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
   });

   if (existingUser) {
      return res.status(409).json({ 
         success: false,
         message: "User already exists with this email or username" 
      });
   }

   // Hash password
   const hashedPassword = await bcrypt.hash(password, 10);

   // Create new user
   const newUser = await User.create({
      username,
      email,
      password: hashedPassword
   });

   // Return response (exclude password)
   res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
         id: newUser._id,
         username: newUser.username,
         email: newUser.email
      }
   });
});

const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(400).json({ 
         success: false,
         message: "All fields are required!" 
      });
   }

   // Find user by email
   const user = await User.findOne({ email });

   if (!user) {
      return res.status(404).json({ 
         success: false,
         message: "User not found" 
      });
   }

   // Check password
   const isMatch = await bcrypt.compare(password, user.password);

   if (!isMatch) {
      return res.status(401).json({ 
         success: false,
         message: "Invalid credentials" 
      });
   }

   // Successful login
   res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
         id: user._id,
         username: user.username,
         email: user.email
      }
   });
});

const getAllUsers = asyncHandler(async (req, res) => {
   const users = await User.find({});
   
   if (users.length === 0) {
      return res.status(404).json({ 
         success: false,
         message: "No users found!" 
      });
   }
   
   res.status(200).json({
      success: true,
      users: users.map(user => ({
         id: user._id,
         username: user.username,
         email: user.email
      }))
   });
});

const getUserById = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const user = await User.findById(id);

   if (!user) {
      return res.status(404).json({ 
         success: false,
         message: "User not found!" 
      });
   }

   res.status(200).json({
      success: true,
      user: {
         id: user._id,
         username: user.username,
         email: user.email
      }
   });
});

const updateUser = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const userExist = await User.findOne({ _id: id });

   if (!userExist) {
      return res.status(404).json({ 
         success: false,
         message: "User not found!" 
      });
   }

   const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
   res.status(200).json({
      success: true,
      user: {
         id: updatedUser._id,
         username: updatedUser.username,
         email: updatedUser.email
      }
   });
});

const deleteUser = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const user = await User.findById(id);

   if (!user) {
      return res.status(404).json({ 
         success: false,
         message: "User not found!" 
      });
   }

   await User.findByIdAndDelete(id);
   res.status(200).json({
      success: true,
      message: "User successfully deleted"
   });
});

export { 
   registerUser, 
   loginUser, 
   getAllUsers,
   getUserById,
   updateUser,
   deleteUser
};