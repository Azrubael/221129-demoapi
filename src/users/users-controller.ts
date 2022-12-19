import 'reflect-metadata'
import { Request, Response, NextFunction } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '../common/base-controller'
import { HTTPError } from '../errors/http-error-class'
import { ILogger } from '../logger/logger-interface'
import { TYPES } from '../types'
import { IUserController } from './users-interface'
import { UserLoginDto } from './dto/user-login.dto'
import { UserRegisterDto } from './dto/user-register.dto'

// Lesson #076
class Usr {}
const usrs = [new Usr()]

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService)
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		])
	}

	login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction
	): void {
		console.log('Login request body:', req.body)
		// имитация ошибки
		// next(new HTTPError(401, 'Ошибка авторизации', 'Контекcтный метод: login'))
	}

	register(
		req: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction
	): void {
		console.log('Register request body:', req.body)
		this.ok(res, 'register')
	}
}
