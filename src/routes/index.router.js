import { Router } from "express";
import userRoutes from "./users.router.js";
import productRoutes from "./product.router";
import cartRoutes from "./cart.router.js";
import authRoutes from "./auth.router.js";
import { authenticate, authorization } from "../middlewares/auth.middleware.js";


const router = Router();

router.use("/authorize", authRoutes)
router.use("/products", productRoutes);
router.use("/cart", authenticate("jwt"), authorization(["user"]), cartRoutes);
router.use("/users", authenticate("jwt"), authorization(["admin"]), userRoutes);


export default router;