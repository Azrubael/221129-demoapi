import express, { Request, Response, NextFunction} from 'express'
import { userRouter } from './users/users.js'

const port = 9001
const app = express()

app.all('/hel?lo', (req, res, next) => {
   console.log('All')
   next()
})

const callBack = (req: Request, res: Response, next: NextFunction) => {
   console.log('CallBack')
   next()
}

app.get('/hello', callBack, (req, res) => {
   res.send('Привет, Azrubael !!!')
})

app.get('/hellow', (req, res) => {
   throw new Error('Error for aeldari!!!')
})

app.use('/users', userRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   console.log(err.message)
   // своя логика обработки ошибки
   
   res.status(500).send(err.message)
})

app.listen(port, () => {
   console.log('Сервер запущен на http://localhost:' + port)
})