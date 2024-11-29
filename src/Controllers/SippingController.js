import asyncHandler from "../utils/asyncHandler.js";


const sippinguser = asyncHandler(async(req, res) =>{
    console.log("sipping user hit api ")

    const { orderId, shippingMethod, shippingCost, shippingAddress, shippingCity, shippingState, shippingPostalCode, trackingNumber, shippingStatus, shippingDate, estimatedDeliveryDate} = req.body;

    if (!orderId || !shippingMethod || !shippingCost || !shippingAddress || !shippingCity || !shippingState || !shippingPostalCode || !trackingNumber || !shippingStatus || !shippingDate || !estimatedDeliveryDate) {
        console.log("Missing required feild");
        return res.status(400).json({ message: "All feild requred"})

    }
     console.log("Recievd data:", {orderId, shippingMethod, shippingCost, shippingAddress, shippingCity, shippingState, shippingPostalCode, trackingNumber, shippingStatus, shippingDate, estimatedDeliveryDate});

         // Simulate saving to a database (replace with your DB logic)
       const sippuser = {
        id: Date.now(),
        orderId,
        shippingMethod,
        shippingCost,
        shippingAddress,
        shippingCity,
        shippingState,
        shippingPostalCode,
        trackingNumber,
        shippingStatus,
        shippingDate,
        estimatedDeliveryDate,
       };
       console.log("Sipping saved:", sippuser)

   // Respond to the client
     res.status(201).json({
        message: "sipping product successfully!",
        user: sippuser,
     });

});

export { sippinguser }

