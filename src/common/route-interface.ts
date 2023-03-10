import { NextFunction, Request, Response, Router } from 'express'
import { IMiddleware } from './middleware-interface'

export interface IControllerRoute {
	path: string
	func: (req: Request, res: Response, next: NextFunction) => void
	// method_wrong: 'get' | 'post' | 'delete' | 'patch' | 'put'
	//более правильный путь импортирования через интерфейс
	// в этом случае typescript на уровне компилятора выявит опечатки и др. нессотв.
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
	// мидлваре для обработки роутов в ./src/users/usres-controller.ts'
	middlewares?: IMiddleware[]
}

export type ExpressReturnType = Response<any, Record<string, any>>
