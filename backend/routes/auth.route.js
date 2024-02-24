import express from "express";
import { signup , signin} from "../controllers/auth.controller.js";
import { validateSignInInput, validateUserInput} from "../middleware/auth.js";

const router = express.Router();

router.post("/sign-up", validateUserInput(), signup);
router.post("/sign-in", validateSignInInput(), signin);

export default router;
