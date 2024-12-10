import { Router } from "express";
import { cartuser, getAllcart } from "../Controllers/CartsController.js";
// import { getAllcart} from "../Controllers"

const router = Router();

router.route("/cart").post(cartuser)

router.route('/getAllcart').get(getAllcart)

export default router