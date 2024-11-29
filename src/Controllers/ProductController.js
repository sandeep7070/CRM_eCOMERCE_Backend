import asyncHandler from '../utils/asyncHandler.js';
import Product from '../models/ecommerce/product.model.js';
import cloudinary from 'cloudinary'
// import Product from '../models/productModel.js';

// Create a new product (already implemented)
const createProduct = asyncHandler(async (req, res) => {
    const { description, name, price, stock, attributes } = req.body;

    if (!description || !name || !price || !stock || !attributes) {
        console.log("Missing required fields");
        return res.status(400).json({ 
            success: false,
            message: "All fields are required!" 
        });
    }
    const file = req.file;

 const fileUri = getDataUri(file);

   const mycloud =  await cloudinary.v2.uploader.upload(fileUri.content);
    try {
        const newProduct = await Product.create({
            description,
            name, 
            price,
            stock,
             poster: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url,
             },
         attributes,
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            product: {
                id: newProduct._id,
                name: newProduct.name,
                description: newProduct.description,
                price: newProduct.price,
                stock: newProduct.stock,
                attributes: newProduct.attributes
            }
        });
    } catch (error) {
        console.error("Product creation error:", error);
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
        products: products.map(product => ({
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            attributes: product.attributes
        }))
    });
});

// Get product by ID
const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

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
    const { id } = req.params;
    const productExists = await Product.findOne({ _id: id });

    if (!productExists) {
        return res.status(404).json({ 
            success: false,
            message: "Product not found!" 
        });
    }

    // Validate input fields if needed
    const { description, name, price, stock, attributes } = req.body;
    
    const updateData = {};
    if (description) updateData.description = description;
    if (name) updateData.name = name;
    if (price) updateData.price = price;
    if (stock) updateData.stock = stock;
    if (attributes) updateData.attributes = attributes;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { 
        new: true,
        runValidators: true 
    });

    res.status(200).json({
        success: true,
        product: {
            id: updatedProduct._id,
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: updatedProduct.price,
            stock: updatedProduct.stock,
            attributes: updatedProduct.attributes
        }
    });
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({ 
            success: false,
            message: "Product not found!" 
        });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Product successfully deleted"
    });
});

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};