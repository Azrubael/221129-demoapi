// здесь роутинг, связанный исключительнос пользователями

import express from 'express'

const userRouter = express.Router()

userRouter.use((req, res, next) => {
   console.log('Moddleware handler for "users.js". Current time is ', Date.now())
   next()
})

userRouter.post('/login', (req, res) => {
   res.send('login')
})

userRouter.post('/register', (req, res) => {
   res.send('register')
})

export { userRouter }