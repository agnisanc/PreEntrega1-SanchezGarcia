import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { authorization } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.delete("/:id", UserController.delete);
router.put("/:id", UserController.update);

export default router;