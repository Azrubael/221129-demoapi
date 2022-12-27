import 'reflect-metadata'
import { Request, Response, NextFunction } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '../common/base-controller'
import { HTTPError } from '../errors/http-error-class'
import { ILogger } from '../logger/logger-interface'
import { TYPES } from '../types'
import { IUserController } from './users-controller-interface'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'
import { ValidateMiddleware } from '../common/validate-middleware'
import { IUserService } from './users-service-interface'
import bodyParser from 'body-parser'

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService
	) {
		super(loggerService)
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{ path: '/loginew', method: 'post', func: this.logiNew },
		])
	}

	login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction
	): void {
		console.log('Login request body:', req.body)
		// имитация ошибки
		next(new HTTPError(401, 'Ошибка авторизации', 'Контекcтный метод: login'))
	}

	// функция logiNew создана в качестве упражнения
	async logiNew(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const result = await this.userService.validateUser(body)
		if (!result) {
			return next(
				new HTTPError(222, 'Такой пользователь не зарегистрирован!')
			)
		}
		this.ok(res, { email: body.email })
	}

	// это собственно работа контроллера
	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const result = await this.userService.createUser(body)
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует!'))
		}
		this.ok(res, { email: result.email, id: result.id })
	}
}
