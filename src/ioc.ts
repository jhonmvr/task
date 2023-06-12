import { ContainerBuilder } from "node-dependency-injection";
import { AuthRepository } from "./repositories/auth.repository";
import { AuthController } from "./controller/auth.controller";


const container = new ContainerBuilder();
container.register("auth.repository", AuthRepository)
const authRepository = container.get("auth.repository");
container.register("auth.controller", AuthController).addArgument(authRepository);


export default container;
