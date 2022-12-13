import express, { Express } from 'express'
import { userRouter } from './users/users'
import { Server } from 'http'
import { LoggerService } from './logger/logger-service'

export class App {
   app: Express
   server: Server
   port: number
   logger: LoggerService

   constructor(logger: LoggerService) {
      this.app = express()
      this.port = 9001
      this.logger = logger
   }

   // метод, дополняющий наше приложение маршрутом
   useRoutes() {
      this.app.use('/users', userRouter)

   }

   // метод инициализации нашего приложения
   public async init() {
      this.useRoutes()
      this.server = this.app.listen(this.port)
      this.logger.log('Сервер запущен на http://localhost:' + this.port)

   }
}