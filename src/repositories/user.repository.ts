
import {User, RoleEnum} from '../models'
import dataSource from "../config/database";
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

export interface IUserPayload{
  role: RoleEnum;

}
export class UserRepository extends Repository<User> {

  private readonly userRepository = dataSource.AppDataSource.getRepository(User);

  public constructor() {
      super(User, dataSource.AppDataSource.manager);
  }

  public async findAll(): Promise<User[]> {
      return this.userRepository.find();
  }
  public getUsers  = async () :Promise<Array<User>> => {
    return this.userRepository.find();
  }

  public async createUser (payload: any) :Promise<User> {
    const hash = await bcrypt.hash("1234", 10);
    const newUser = await this.userRepository.save({
      ...payload,
      password: hash
    })
    delete newUser.password;
    return newUser;
  }
  public async updateUser (payload: any)  {
    const user = await this.userRepository.findOneBy({email:payload.email});

    return await this.userRepository.update({
      email: payload.email,
    }, {
      email: payload.email,
      firstName:payload.firstName,
      lastName:payload.lastName,
      role:payload.role
    });;
  }

  async changePass(payload: any) {
    const user = await this.userRepository.findOneBy({email:payload.email})

    let compare = false;
    if (user){
      compare = await bcrypt.compare(payload.oldPassword, user.password);
      if(compare){
        const hash = await bcrypt.hash(payload.password, 10);
        return await this.userRepository.update({
          email: payload.email,
        }, {
          password: hash,
        });
      }

    }

    return null;
  }
  public async login (payload: any) :Promise<User|null> {
    console.log("Login ",payload)

    const user = await this.userRepository.findOneBy({email:payload.email})
    console.log("user ",user)
    let compare = false;
    if (user){
      compare = await bcrypt.compare(payload.password, user.password);
      if(compare)
        return user;
    }

    return null;
  }

  public async getUser(id: number) :Promise<User | null>{
    console.log("getUSer di ",id)
    const user = await this.userRepository.findOneBy({id: id})
    if (!user)
    return null
    return user
  }
}

