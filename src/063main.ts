// это будет основная точка входа для запуска приложения
import { App } from "./app";
import { ExceptionFilter } from "./errors/exection-filter";
import { LoggerService } from "./logger/logger-service";
import { UserController } from './users/users-controller'

async function bootstrap() {
   // dependency ingection
   const logger = new LoggerService
   const app = new App(
      logger,
      new UserController(logger),
      new ExceptionFilter(logger)
   )
   await app.init()
}

bootstrap()