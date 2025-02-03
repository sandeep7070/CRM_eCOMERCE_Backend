import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import Product from '../models/ecommerce/product.model.js';
// import cloudinary from 'cloudinary'
import { uploadOnCloudinary } from '../utils/cloudinary.js';
// import path from 'path';
// import DatauriParser from 'datauri/parser.js';


// Add this function directly in the file
const getDataUri = (file) => {
    if (!file) {
        console.error('No file provided');
        return null;
    }

    const parser = new DatauriParser();

    // Add more detailed logging to understand the file object
    console.log('File object:', {
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        buffer: file.buffer ? 'Buffer exists' : 'No buffer',
        size: file.size
    });

    // Validate file object more thoroughly
    if (!file.buffer) {
        throw new Error('File buffer  missing');
    }

    if (!file.originalname) {
        throw new Error('Original filename  missing');
    }

    try {
        return parser.format(path.extname(file.originalname), file.buffer);
    } catch (error) {
        console.error('Error geturi', error);
        throw new Error('faild error parse: ' + error.message);
    }
};


const createProduct = asyncHandler(async (req, res) => {
    try {
        const { description, name, price, stock, attributes, } = req.body;
        const file = req.file.path;

        //  required fields
        if (!description || !name || !price || !stock || !attributes) {
            return res.status(400).json({
                success: false,
                message: "Missing  product hit "
            });
        }

        // Validate file
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Product image is required!"
            });
        }

        // Detailed error handling for Cloudinary upload
        let mycloud;
        try {
            mycloud = await uploadOnCloudinary(file)

        } catch (cloudinaryError) {
            console.error('Cloudinary not upload', cloudinaryError);
            return res.status(500).json({
                success: false,
                message: "Failed  upload image  Cloudinary",
                error: cloudinaryError.message
            });
        }
     
        console.log(mycloud)

        // Create product
        const newProduct = await Product.create({
            description,
            name,
            price,
            stock,
            coverImage: mycloud || '',
            attributes: attributes || {}
        });

        res.status(201).json(
            {
            success: true,
            message: "Product created successfully!",
            product: {
                id: newProduct._id,
                name: newProduct.name,
                description: newProduct.description,
                price: newProduct.price,
                stock: newProduct.stock,
                coverImage: newProduct.coverImage,
                attributes: newProduct.attributes
            }
        }       
    );                                               
 } catch (error) {
        console.error("Product not  creation ", error);
        res.status(500).json({
            success: false,
            message: "Error creating product",
            error: error.message
        });
    }
});                                                       
                                                                                                                 
// Get all products                                      
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
 
    if (products.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No products found!"
        });
    }


    res.status(200).json({
        success: true,
        products
    });
});

// Get product by ID
const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    // Remove any colon if present and trim whitespace
    const cleanId = id.replace(':', '').trim();
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(cleanId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID format"
        });
    }

    const product = await Product.findById(cleanId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found!"
        });
    }
 
    res.status(200).json({
        success: true,
        product: {
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            attributes: product.attributes
        }
    });
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
    const cleanId = req.params.id.replace(':', '').trim();
    
    if (!mongoose.Types.ObjectId.isValid(cleanId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID format"
        });
    }

    const productExists = await Product.findOne({ _id: cleanId });
    // Rest of your code...
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const cleanId = req.params.id.replace(':', '').trim();
    
    if (!mongoose.Types.ObjectId.isValid(cleanId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID format"
        });
    }

    const product = await Product.findById(cleanId);
    // Rest of your code...
});

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};