import express, { Express } from 'express'
// import { userRouter } from './users/users'
import { UserController } from './users/users-controller'
import { Server } from 'http'
import { LoggerService } from './logger/logger-service'

export class App {
   app: Express
   server: Server
   port: number
   logger: LoggerService
   userController: UserController

   constructor(
      logger: LoggerService,
      userController: UserController) {
      this.app = express()
      this.port = 9001
      this.logger = logger
      this.userController = userController
   }

   // метод, дополняющий наше приложение маршрутом
   useRoutes() {
      this.app.use('/users', this.userController.router)
   }

   // метод инициализации нашего приложения
   public async init() {
      this.useRoutes()
      this.server = this.app.listen(this.port)
      this.logger.log('Сервер запущен на http://localhost:' + this.port)

   }
}