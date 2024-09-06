import { Router } from "express";
import { ProductController } from "../controller/product.controller.js"
import { validate } from "../middlewares/validate.middleware.js"
import { authenticate, authorization } from "../middlewares/auth.middleware.js";
import { productDto } from "../dto/product.dto.js";

const router = Router();

router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.post("/", authenticate("jwt"), authorization(["admin"]), validate(productDto), ProductControllet.create);

export default router;