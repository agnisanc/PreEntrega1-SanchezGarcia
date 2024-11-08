import { Router } from "express";
import  AuthController from "../controller/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js"
import { userDto } from "../dto/user.dto.js"
import { authDto } from "../dto/auth.dto.js"
import { generateToken } from "../utils/jwt.js";


const router = Router();

router.post("/login", validate (authDto), authenticate("login"), AuthController.login);

router.post("/register", validate(userDto), authenticate("register"), AuthController.register);

router.get("/current", authenticate("jwt"), AuthController.current);


export default router;
