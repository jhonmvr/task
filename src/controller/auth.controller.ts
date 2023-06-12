import { Request, Response } from "express";
import { AuthRepository } from "../repositories/auth.repository";
export class AuthController {
  constructor(private readonly authRepository:AuthRepository) {}

  public login = async (req: Request, res: Response) => {
    console.log("params",req.query)
    const response = await this.authRepository.login();
    res.send(response);
  };
}

