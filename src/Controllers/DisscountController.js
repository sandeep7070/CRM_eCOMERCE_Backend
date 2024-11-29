    // import asyncHandler from "../utils/asyncHandler";

    // const createDiscount = asyncHandler(async (req, res) => {
    //     console.log("disscount user Api hit")

    //     const {code, type, price, minPurchaseAmount, startDate, endDate, active, applicableTo, productId} = req.body;

    //     if (!code || !type || !price || !minPurchaseAmount || !startDate || !endDate || !active || !applicableTo || !productId) {
    //         console.log("missing requred field")
    //         return res.status(400).json({ message: "All fields are requred" });
    //     }
    //     console.log("Receive all data", {code, type, price, minPurchaseAmount, startDate, endDate, active, applicableTo, productId});
        
    //     // simulate saving to a database (replase with your db logic)

    //     const dissuser = {
    //         id: Date.now(),
    //         code,
    //         type,
    //         price,
    //         minPurchaseAmount,
    //         startDate,
    //         endDate,
    //         active,
    //         applicableTo,
    //         productId
    //     };
    //     console.log("User disscount save:", dissuser)

    //     // Reasponse the Client 
    //     res.status(201).json({
    //         message: "User disscount successfuly",
    //         user: dissuser,
    //     });

    // });

    // export { createDiscount }