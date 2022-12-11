import express from 'express'
import { userRouter } from './users/users.js'

const port = 9001
const app = express()

app.use((req, res, next) => {
   console.log('Current time is ', Date.now())
   next()
})

app.all('/hel?lo', (req, res, next) => {
   // '?' говорит об опциональности одного символа
   // '*' говорит о наличии любого символа
   // '+' говорит о наличии любого числа указанных символов
   // '(ell)?' для необязательной группы символов
   // '/.*a$/' regexp, где $ означает окончание строки
   console.log('All')
   next()
})

const callBack = (req, res, next) => {
   console.log('CallBack')
   next()
}

app.get('/hello', callBack, (req, res) => {
   res.type('application/json')
   res.send('Привет, Azrubael !!!')
})

app.use('/users', userRouter)

app.listen(port, () => {
   console.log('Сервер запущен на http://localhost:' + port)
})