import { Router } from 'express';
import { validate } from "../middlewares/validate.middleware.js";
import { uuid } from "uuidv4";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";
import { cartDto } from "../dto/cart.dto.js";
import { CartController } from "../controller/cart.controller.js";

const router = Router();

router.get("/:id", CartController.getById);

router.post("/", validate(cartDto), CartController.create);

router.post("/:id/products", CartController.addProduct);

router.delete("/:id", CartController.delete);

router.delete("/:id/products(:productsId", CartController.deleteProduct);

router.delete("/:id/products", CartController.deleteAllProducts);

router.post("/:id/purchase", CartController.purchase);

export default router


