import asyncHandler from '../utils/asyncHandler.js';

                                                    
const orderUser = asyncHandler(async (req, res) => {
    console.log("Register User API Hit");           
                                                        
                                                      
    // Destructure and validate input               
    const { productId, quantity, orderPrice, customer, orderItems, address, shippingAddress } = req.body;
 
    if (!productId || !quantity || !orderPrice || !customer || !orderItems || !address || !shippingAddress) {
       console.log("Missing required fields");
       return res.status(400).json({ message: "All fields are required!" });
    }
 
    console.log("Received data:", { productId, quantity, orderPrice, customer, orderItems,  address, shippingAddress});
 
    // Simulate saving to a database (replace with your DB logic)
    const orderUser = {
       id: Date.now(),
       productId,
       quantity,
       orderPrice,
       customer, 
       orderItems,
       address, 
       shippingAddress
    };
            
    console.log("User saved:", orderUser); 
                                                
    // Respond to the client
    res.status(201).json({                      
       message: "User registered successfully!",
       user: orderUser,
    });
 });
 
 
    export { orderUser }