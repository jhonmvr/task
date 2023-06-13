import express from "express";
import boom from "@hapi/boom";
import AuthController from "../controllers/auth.controller";

const router = express.Router();



router.post("/", async (req, res,next) => {
  const controller = new AuthController();
  const response = await controller.login(req.body);
  if (!response)
    return res.status(404).send({message: "No user found"})

  return res.send(response);
});

router.post("/change", async (req, res,next) => {
  const controller = new AuthController();
  const response = await controller.changePass(req.body);
  if (!response)
    return res.status(404).send({message: "No user found"})

  return res.send(response);
});


export default router
