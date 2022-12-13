
import { Router, Response } from 'express'
import { LoggerService } from '../logger/logger-service'
import { IControllerRoute } from './route-interface'
export { Router } from 'express'

export abstract class BaseController {
   private readonly _router: Router

   constructor(private logger: LoggerService) {
      this._router = Router()
   }

   // getter для _routers
   get router() {
      return this._router
   }

   // методы, использующие абстракцию класса
   public send<T>(res: Response, code: number, message: T) {
      res.type('application/json')
      return res.status(200).json(message)
   }
   public ok<T>(res: Response, message: T) {
      return this.send<T>(res, 200, message)
   }
   public created(res: Response) {
      return res.sendStatus(201)
   }

   protected bindRoutes(routes: IControllerRoute[]) {
      for (const route of routes) {
         this.logger.log(`[${route.method}] ${route.path}`)
         // сохранение контекста для 'route.func' методом 'bind'
         const handler = route.func.bind(this)
         this.router[route.method](route.path, handler)
      }
      
   }
} 