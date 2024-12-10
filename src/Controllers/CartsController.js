import asyncHandler from "../utils/asyncHandler.js";



const cartuser = asyncHandler(async (req, res) => {
    const { productId, quantity, total } = req.body;

    if (!productId || !quantity || !total) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const newCart = new Cart({
        productId,
        quantity,
        total
    });

    const savedCart = await newCart.save();

    res.status(201).json({
        message: "Cart registered successfully",
        cart: savedCart
    });
});


const getAllcart = asyncHandler(async (req, res) => {
    try {
        const cart = await Cart.find({});

        if (cart.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No cart items found'
            });
        }    

        res.status(200).json({
            success: true,
            count: cart.length,
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving cart items',
            error: error.message
        });
    }
});




export { cartuser, getAllcart}
