import express from "express";
import UserRouter from "./user.router";
import AuthRouter from "./auth.router";
import TaskRouter from "./task.router";

const router = express.Router();



router.use("/users", UserRouter)
router.use("/login", AuthRouter)
router.use("/tasks", TaskRouter)

export default router;
