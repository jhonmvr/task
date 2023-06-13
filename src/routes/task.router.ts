import express from "express";
import TaskController from "../controllers/task.controller";
import  jwt from 'jsonwebtoken';
import data from '../config/database'
import { verifyToken } from "../utils/token-verify";
const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new TaskController();
  const response = await controller.getTasks();
  return res.send(response);
});

router.post("/", async (req, res) => {
  try{
    const controller = new TaskController();
    const response = await controller.createTask(req.body);
    return res.send(response);
  }catch(e){
    return res.status(404).send(e);
  }
});
router.put("/", async (req, res) => {
  const controller = new TaskController();
  const response = await controller.updateTask(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {

  if(!verifyToken(req,['EJECUTOR'])){
    return res.status(401).send({message: "No autorizado"})
  }
  const controller = new TaskController();
  const response = await controller.getTask(req.params.id);
  if (!response)
    return res.status(404).send({message: "No user found"})
  return res.send(response);
});
router.delete("/:id", async (req, res) => {

  if(!verifyToken(req,['EJECUTOR'])){
    return res.status(401).send({message: "No autorizado"})
  }
  const controller = new TaskController();
  const response = await controller.deleteTask(req.params.id);
  if (!response)
    return res.status(404).send({message: "No user found"})
  return res.send(response);
});

export default router
