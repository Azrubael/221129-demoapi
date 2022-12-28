// middleware, отвечающий за авторизацию

import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { IMiddleware } from './middleware-interface'

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		// верификация токена
		if (req.headers.authorization) {
			// Приходит 'Bearer JWT.подпись', поэтому отрезаем ненужное
			verify(
				req.headers.authorization.split(' ')[1],
				this.secret,
				(err, payload) => {
					if (err) {
						next()
					} else if (payload) {
						req.user = payload.email
						next()
					}
				}
			)
		} else {
			next()
		}
	}
}
