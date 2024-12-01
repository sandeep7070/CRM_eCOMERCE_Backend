import { Router } from "express";
import { 
    createProduct, 
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct 
} from "../Controllers/ProductController.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

//     register route
router.route("/product").post(upload.single("coverImage"), createProduct);
// router.route("/product").post(createProduct);


// Additional  routes

router.route("/getAllproduct").get(getAllProducts);
router.route("/createProduct").get(createProduct);

//  /:id    requred  then  hit 

router.route("/getProductById/:id").get(getProductById); //     /:Id
router.route("/updateProduct/:id").put(updateProduct);    //    /:Id
router.route("/deleteProduct/:id").delete(deleteProduct);  //   /:Id



export default router;