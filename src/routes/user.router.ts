import express from "express";
import UserController from "../controllers/user.controller";
import  jwt from 'jsonwebtoken';
import data from '../config/database'
import { verifyToken } from "../middlewares/token-verify";
const router = express.Router();

router.get("/", async (_req, res) => {
  if(!verifyToken(_req,['ADMINISTRADOR'])){
    return res.status(401).send({message: "No autorizado"})
  }
  const controller = new UserController();
  const response = await controller.getUsers();
  return res.send(response);
});

router.post("/", async (req, res) => {
  if(!verifyToken(req,['ADMINISTRADOR'])){
    return res.status(401).send({message: "No autorizado"})
  }
  const controller = new UserController();
  const response = await controller.createUser(req.body);
  return res.send(response);
});
router.put("/", async (req, res) => {
  if(!verifyToken(req,['ADMINISTRADOR'])){
    return res.status(401).send({message: "No autorizado"})
  }
  const controller = new UserController();
  const response = await controller.updateUser(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  if(!verifyToken(req,['ADMINISTRADOR'])){
    return res.status(401).send({message: "No autorizado"})
  }
  const controller = new UserController();
  const response = await controller.getUser(req.params.id);
  if (!response)
    return res.status(404).send({message: "No user found"})
  return res.send(response);
});

export default router
