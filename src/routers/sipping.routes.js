import { Router } from "express";
import { sippinguser } from "../Controllers/SippingController.js";


const router = Router();

router.route("/sipping").post(sippinguser)

export default router