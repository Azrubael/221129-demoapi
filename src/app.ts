import express, { Express } from 'express'
// import { userRouter } from './users/users'
import { UserController } from './users/users-controller'
import { Server } from 'http'
import { LoggerService } from './logger/logger-service'
import { ExceptionFilter } from './errors/exection-filter'

export class App {
   app: Express
   server: Server
   port: number
   logger: LoggerService
   userController: UserController
   exceptionFilter: ExceptionFilter

   constructor(
      logger: LoggerService,
      userController: UserController,
      exceptionFilter: ExceptionFilter) {
      this.app = express()
      this.port = 9001
      this.logger = logger
      this.userController = userController
      this.exceptionFilter = exceptionFilter
   }

   // метод, дополняющий наше приложение маршрутом
   useRoutes() {
      this.app.use('/users', this.userController.router)
   }

   // метод для обработки исключений
   useExceptionFilters() {
      this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
   }

   // метод инициализации нашего приложения
   public async init() {
      this.useRoutes()
      this.useExceptionFilters()
      this.server = this.app.listen(this.port)
      this.logger.log('Сервер запущен на http://localhost:' + this.port)

   }
}