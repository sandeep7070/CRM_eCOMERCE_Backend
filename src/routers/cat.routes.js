import { Router } from "express";
import { cartuser } from "../Controllers/CartsController.js";


const router = Router();

router.route("/cate").post(cartuser)

export default router