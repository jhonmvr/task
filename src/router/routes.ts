
import { Request, Response,Router } from "express";
import { AuthController } from "../controller/auth.controller";
import container from "../ioc";
//import { AuthController } from "../controller/auth.controller";
const router: Router = Router();
const authController: AuthController = container.get("auth.controller");
router.get("/auth/login", authController.login);

export { router };

