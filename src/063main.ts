// это будет основная точка входа для запуска приложения
import { App } from "./app";
import { LoggerService } from "./logger/logger-service";
import { UserController } from './users/users-controller'

async function bootstrap() {
   // dependency ingection
   const logger = new LoggerService
   const app = new App(logger, new UserController(logger))
   await app.init()
}

bootstrap()