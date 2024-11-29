import {Router} from "express";
    import { orderUser } from "../Controllers/OrderController.js";
  
const router = Router();

router.route("/order").post(orderUser);


export default router