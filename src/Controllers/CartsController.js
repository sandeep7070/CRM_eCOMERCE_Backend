import asyncHandler from "../utils/asyncHandler.js";



const cartuser = asyncHandler( async(req, res) => {
    console.log("cart User Api hit")

    const { productId, quantity, total } = req.body

    if (!productId || !quantity || !total) {
        console.log("Missing requred field")
        return res.status(400).json({ message: "All fields are required!"})

    }
    console.log(" Recived data:", {productId, quantity, total})


    const catuser = {
        id: Date.now(),
        productId,
        quantity,
        total,
    }

    console.log("Carts saved", catuser)

    res.status(201).json({
        message: "Carts register successfully",
        user: catuser,
    });
});




export { cartuser }
