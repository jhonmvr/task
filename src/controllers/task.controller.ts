import { UserRepository } from "../repositories/user.repository";
import { Task } from "../models/task";
import { ITaskPayload, TaskRepository } from "../repositories/task.repository";
import { Get, Route, Tags,  Post, Body, Path, Put, Delete, Query } from "tsoa";
import { RoleEnum } from "../models/role.enum";

@Route("tasks")
@Tags("Task")
export default class TaskController {
  private readonly taskRepository:TaskRepository = new TaskRepository();
  private readonly userRepository:UserRepository = new UserRepository();
  constructor(){

  }
  @Get("/")
  public async getTasks(@Query() id?: string): Promise<Array<Task>> {
    return this.taskRepository.getTasks(Number(id))
  }

  @Post("/")
  public async createTask(@Body() body: ITaskPayload): Promise<any|null> {
    const user = await this.userRepository.getUser(Number(body.user.id));
    if(user && user.role !== RoleEnum.EJECUTOR)
      return{mensaje:"Solo se puede asignar a un EJECUTOR"}

    return this.taskRepository.createTask(body);

  }
  @Put("/")
  public async updateTask(@Body() body: ITaskPayload) {

    return this.taskRepository.updateTask(body)
  }

  @Put("/updateComment")
  updateComment(@Body() body: ITaskPayload) {

    return this.taskRepository.updateComment(body)
  }


  @Get("/:id")
  public async getTask(@Path() id: string): Promise<Task | null> {
    return this.taskRepository.getTask(Number(id))
  }
  @Delete("/:id")
  public async deleteTask(id: string) {
    return this.taskRepository.deleteTask(Number(id))
  }
}
