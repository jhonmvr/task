import {DataSource} from 'typeorm'
import {User} from '../models'
import { Task } from '../models/task';

import bcrypt from 'bcrypt';

const AppDataSource = new DataSource ({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 15432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "express-ts",
  entities: [User,Task],
  synchronize: true,
});
const TestDataSource  = new DataSource ({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 15432,
  username: process.env.POSTGRES_USER || "test",
  password: process.env.POSTGRES_PASSWORD || "test",
  database: process.env.POSTGRES_DB || "test",
  entities: [User,Task],
  synchronize: true,
});
AppDataSource.initialize()
    .then(async () => {
      const userRepository = AppDataSource.getRepository(User);
      const usersCount = await userRepository.count();

      // Si no hay registros en la tabla, inserta un nuevo registro
      if (usersCount === 0) {
        const hash = await bcrypt.hash("admin123", 10);
        const newUser = new User();
        newUser.firstName = "Jhon";
        newUser.lastName = "Romero";
        newUser.email = "admin@mail.com";
        newUser.password = hash;
        newUser.role = "ADMINISTRADOR";
        newUser.isFirtsLogin = false;

        await userRepository.save(newUser);
        console.log("Se ha insertado un nuevo registro en la base de datos.");

        console.log("Data Source has been initialized!")
      }
    }).catch((err) => {
        console.error("Error during Data Source initialization", err)
    });

const Secret = process.env.JWT_SECRET || 'ajjZ!mqBWZt62A9'

export default {AppDataSource, TestDataSource, Secret};


