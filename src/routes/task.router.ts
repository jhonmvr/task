import express from "express";
import TaskController from "../controllers/task.controller";
import  jwt from 'jsonwebtoken';
import data from '../config/database'
import { verifyToken } from "../middlewares/token-verify";
const router = express.Router();

router.get("/", async (_req, res) => {
  const decoded:any = verifyToken(_req,['ADMINISTRADOR','EJECUTOR']);
  if(!decoded){
    return res.status(401).send({message: "No autorizado"})
  }

  const controller = new TaskController();
  let response
  if(decoded.role=='ADMINISTRADOR')
    response = await controller.getTasks();
  else if(decoded.role=='EJECUTOR')
    response = await controller.getTasks(decoded?.id);
  else if(decoded.role=='AUDITOR')
    response = await controller.getTasks(decoded?.id);
  return res.send(response);
});

router.post("/", async (req, res) => {
  try{
    const decoded = verifyToken(req,['ADMINISTRADOR']);
    if(!decoded){
      return res.status(401).send({message: "No autorizado"})
    }
    const controller = new TaskController();
    const response = await controller.createTask(req.body);
    return res.send(response);
  }catch(e){
    return res.status(404).send(e);
  }
});
router.put("/", async (req, res) => {
  if(!verifyToken(req,['ADMINISTRADOR','EJECUTOR'])){
    return res.status(401).send({message: "No autorizado"})
  }
  const controller = new TaskController();
  const response = await controller.updateTask(req.body);
  return res.send(response);
});

router.put("/updateComment", async (req, res) => {
  if(!verifyToken(req,['ADMINISTRADOR','EJECUTOR'])){
    return res.status(401).send({message: "No autorizado"})
  }
  const controller = new TaskController();
  const response = await controller.updateComment(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  if(!verifyToken(req,['ADMINISTRADOR'])){
    return res.status(401).send({message: "No autorizado"})
  }
  const controller = new TaskController();
  const response = await controller.getTask(req.params.id);
  if (!response)
    return res.status(404).send({message: "No user found"})
  return res.send(response);
});
router.delete("/:id", async (req, res) => {
  if(!verifyToken(req,['ADMINISTRADOR'])){
    return res.status(401).send({message: "No autorizado"})
  }
  const controller = new TaskController();
  const response = await controller.deleteTask(req.params.id);
  if (!response)
    return res.status(404).send({message: "No user found"})
  return res.send(response);
});

export default router
