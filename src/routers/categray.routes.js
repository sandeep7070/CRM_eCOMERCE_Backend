import { Router } from "express";
import { categrayuser } from "../Controllers/CategrayController.js";

const router = Router();

router.route("/categray").post(categrayuser);

export default router ;