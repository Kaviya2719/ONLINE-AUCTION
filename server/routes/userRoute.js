// userRoute.js
import express from "express";
import { create, login, getAllUsers } from "../controller/userController.js";

const router = express.Router();

router.post("/signup", create);
router.post("/login", login);
router.get("/user", getAllUsers); // Example of a protected route

export default router;
