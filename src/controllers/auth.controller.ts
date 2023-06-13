import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import data from "../config/database";

import {IUserPayload, UserRepository} from '../repositories/user.repository'
import  jwt from 'jsonwebtoken';
import { User } from "src/models";
@Route("login")
@Tags("Auth")
export default class AuthController {
  private readonly userRepository:UserRepository = new UserRepository();
  constructor(){

  }


  @Post("/")
  public async login(@Body() body: IUserPayload): Promise<any> {
    try{
      const user =await this.userRepository.login(body);
      if(user){

        if(user.isFirtsLogin){
         return {user:user, mensaje:"debes cambiar la contrasena",token:":("};
        }

        const payload = {
          sub: user.email,
          role:user.role
        }
        const token = jwt.sign(payload, data.Secret);
        return {user:user,token:token};
      }


    }catch(e){
      console.log("error",e)
    }
    return null;

  }
  @Post("/change")
  public async changePass(@Body() body: IUserPayload): Promise<any> {
    try{
     // console.log("changePass",body)
      const user =await this.userRepository.changePass(body);
      console.log("response ",user)
     return user;


    }catch(e){
      console.log("error",e)
    }
    return null;

  }

}
