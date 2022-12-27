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
import { sign } from 'jsonwebtoken' // синхронная, используем callback, обернутый Promise
import { IConfigService } from '../config/config-service-interface'

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {
		super(loggerService)
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		])
	}

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		console.log('Login request body:', req.body)
		const result = await this.userService.validateUser(req.body)
		if (!result) {
			return next(
				new HTTPError(401, 'Ошибка авторизации', 'Контекcтный метод: login')
			)
		}
		const jwt = await this.signJWT(
			req.body.email,
			this.configService.get('SECRET')
		)
		this.ok(res, { jwt })
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

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 999), //  <<<=== issue at
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err)
					}
					resolve(token as string)
				}
			)
		})
	}
}
