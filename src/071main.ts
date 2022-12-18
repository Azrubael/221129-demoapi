// это будет основная точка входа для запуска приложения
import { Container, ContainerModule, interfaces } from 'inversify'
import { App } from './app'
import { ExceptionFilter } from './errors/exection-filter'
import { LoggerService } from './logger/logger-service'
import { ILogger } from './logger/logger-interface'
import { UserController } from './users/users-controller'
import { IUserController } from './users/users-interface'
import { TYPES } from './types'
import { IExceptionFilter } from './errors/exeption-filter-interface'

export interface IBootstrapReturn {
	appContainer: Container
	app: App
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService)
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
	bind<IUserController>(TYPES.UserController).to(UserController)
	bind<App>(TYPES.Application).to(App)
})

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container()
	appContainer.load(appBindings)
	const app = appContainer.get<App>(TYPES.Application)
	app.init()
	return { appContainer, app }
}

export const { app, appContainer } = bootstrap()
