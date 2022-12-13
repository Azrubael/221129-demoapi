// это будет основная точка входа для запуска приложения
import { App } from "./app";
import { LoggerService } from "./logger/logger-service";


async function bootstrap() {
   // dependency ingection
   const app = new App(new LoggerService())
   await app.init()
}

bootstrap()