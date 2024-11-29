import { Router } from "express";
import { 
   loginUser, 
   registerUser, 
   getAllUsers, 
   getUserById,
   updateUser,
   deleteUser 
} from "../Controllers/UserController.js";

const router = Router();

// User authentication routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// User management routes
router.route("/update/:id").put(updateUser);  //  ----/:id
router.route("/get/:id").get(getUserById);      // ---/:id
router.route("/getAllUsers").get(getAllUsers);
router.route("/delete/:id").delete(deleteUser);    // ----/:id

export default router;