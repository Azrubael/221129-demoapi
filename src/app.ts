import express, { Express } from 'express'
import { Server } from 'http'
import { inject, injectable } from 'inversify'
import { ILogger } from './logger/logger-interface'
import { TYPES } from './types'
import { json } from 'body-parser'
import 'reflect-metadata'
import { IConfigService } from './config/config-service-interface'
import { IExceptionFilter } from './errors/exception-filter-interface'
import { UserController } from './users/users-controller'
import { PrismaService } from './database/prisma-service'
import { AuthMiddleware } from './common/auth-middleware'

@injectable()
export class App {
	app: Express
	server: Server
	port: number

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService
	) {
		this.app = express()
		this.port = 9001
	}

	useMiddleware(): void {
		this.app.use(json())
		// this.app.use(express.json())
		// вариант POST JSON, т.к. соотв метод имеется в "express": "^4.18.2"
		const authMiddleware = new AuthMiddleware(
			this.configService.get('SECRET')
		)
		// связывание контекста для 'authMiddleware'
		this.app.use(authMiddleware.execute.bind(authMiddleware))
	}

	// метод, дополняющий наше приложение маршрутом
	useRoutes(): void {
		this.app.use('/users', this.userController.router)
	}

	// метод для обработки исключений
	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
	}

	// метод инициализации нашего приложения
	public async init(): Promise<void> {
		// важен порядок - промежуточное ПО должно быть первым
		this.useMiddleware()
		this.useRoutes()
		this.useExceptionFilters()
		await this.prismaService.connect()
		this.server = this.app.listen(this.port)
		this.logger.log('Сервер запущен по http://localhost:' + this.port)
	}
}
