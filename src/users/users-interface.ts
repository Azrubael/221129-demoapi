import { Request, Response, NextFunction} from 'express'

// интерфейс для имплементации в рамках 'users-controller.ts'
export interface IUserController {
   login: (req: Request, res: Response, next: NextFunction) => void
   register: (req: Request, res: Response, next: NextFunction) => void
}
