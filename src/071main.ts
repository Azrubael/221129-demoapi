// это будет основная точка входа для запуска приложения
import { Container } from 'inversify'
import { App } from "./app"
import { ExceptionFilter } from "./errors/exection-filter"
import { LoggerService } from "./logger/logger-service"
import { ILogger } from './logger/logger-interface'
import { UserController } from './users/users-controller'
import { TYPES } from './types'
import { IExceptionFilter } from './errors/exeption-filter-interface'

const appContainer = new Container()
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService)
appContainer.bind<IExceptionFilter>(TYPES.Exceptionfilter).to(ExceptionFilter)
appContainer.bind<UserController>(TYPES.UserController).to(UserController)
appContainer.bind<App>(TYPES.Application).to(App)

const app = appContainer.get<App>(TYPES.Application)

app.init()

export { app, appContainer }