import express, { Express } from 'express'
import { Server } from 'http'
import { inject, injectable } from 'inversify'
import { ExceptionFilter } from './errors/exection-filter'
import { ILogger } from './logger/logger-interface'
import { TYPES } from './types'
import { UserController } from './users/users-controller'
import 'reflect-metadata' 

@injectable()
export class App {
   app: Express
   server: Server
   port: number

   constructor(
      @inject(TYPES.ILogger) private logger: ILogger,
      @inject(TYPES.UserController) private userController: UserController,
      @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter
   ) {
      this.app = express()
      this.port = 9001
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
      this.logger.log('Сервер запущен по адресу http://localhost:' + this.port)

   }
}
