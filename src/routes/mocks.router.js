import { Router } from "express";
import { dataMock } from "../controller/mocks.controller.js";

const router = Router();

router.get("/users/:n", dataMock.createUsers);
router.get("/products/:n", dataMock.createProducts);

export default router;