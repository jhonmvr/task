

import dataSource from "../config/database";
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { Task } from "../models/task";
import { User } from "../models";

export interface ITaskPayload{
  id:number,
  user:User

}
export class TaskRepository extends Repository<Task> {

  private readonly taskRepository = dataSource.AppDataSource.getRepository(Task);

  public constructor() {
      super(Task, dataSource.AppDataSource.manager);
  }

  public async findAll(): Promise<Task[]> {
      return this.taskRepository.find();
  }
  public getTasks  = async (id?:number) :Promise<Array<Task>> => {
    if(id)
      return this.findBy({user:{id:id}});
    return this.taskRepository.find();
  }

  public async createTask (payload: any) :Promise<Task> {

    const newTask = await this.taskRepository.save({
      ...payload
    })
    return newTask;
  }
  public async updateTask (payload: any)  {
    const user = await this.taskRepository.findOneBy({id:payload.id, state:'ASIGNADO'});

    return await this.taskRepository.update({
      id: payload.id,
    }, {
      descripcion:payload.descripcion,
      state:payload.state
    });;
  }
  public async updateComment (payload: any)  {
    console.log("updateComment",payload)
    const user = await this.taskRepository.findOneBy([{id:payload.id,state:'FINALIZADO_ERROR'},{id:payload.id,state:'FINALIZADO_EXITO'}]);

    console.log("user",user)
    if(user)
      return await this.taskRepository.update({
        id: payload.id,
      }, {
        comment:payload.comment
      });
    return {mensaje:"no puedes hacer eso"}
  }


  public async getTask(id: number) :Promise<Task | null>{
    const user = await this.taskRepository.findOneBy({id: id})
    if (!user)
    return null
    return user
  }


  public async deleteTask(id: number) {
    const user = await this.taskRepository.findOneBy({id: id, state:'ASIGNADO'})
    if (!user)
      return null
    return user
  }

}

