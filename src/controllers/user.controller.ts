import { Get, Route, Tags,  Post, Body, Path, Put } from "tsoa";
import {User} from '../models'

import {IUserPayload, UserRepository} from '../repositories/user.repository'
import { RoleEnum } from "../models/role.enum";
@Route("users")
@Tags("User")
export default class UserController {
  private readonly userRepository:UserRepository = new UserRepository();
  constructor(){

  }
  @Get("/")
  public async getUsers(): Promise<Array<User>> {
    return this.userRepository.getUsers()
  }

  @Post("/")
  public async createUser(@Body() body: IUserPayload): Promise<any> {
    if(body && body.role == RoleEnum.ADMINISTRADOR)
      return{mensaje:"NO PUEDES CREAR MAS ADMINISTRADORES"}
    return this.userRepository.createUser(body)
  }
  @Put("/")
  public async updateUser(@Body() body: IUserPayload) {
    return this.userRepository.updateUser(body)
  }

  @Get("/:id")
  public async getUser(@Path() id: string): Promise<User | null> {
    return this.userRepository.getUser(Number(id))
  }
}
