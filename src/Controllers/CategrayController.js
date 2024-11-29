import asyncHandler from "../utils/asyncHandler.js";

const categrayuser = asyncHandler( async(req, res) => {
    console.log("Categray User Api Hit")

    const {name} = req.body;

    if (!name) {
        console.log("Missing requerd field");
        return res.status(400).json({ message: "All fields are required!"})
    }

    console.log("Recived data:", { name });

        // Simulate saving to a database (replace with your DB logic)
      const categroyuser = {
        id: Date.now(),
        name,
      };

      console.log("User saved:", categroyuser)

          // Respond to the client
   res.status(201).json({
    message: "User registered successfully!",
    user: categroyuser,
   });
});

export { categrayuser }
