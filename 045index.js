import express from 'express'

const port = 9001
const app = express()

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
   res.send('Привет, Azrubael !!!')
})

app.listen(port, () => {
   console.log('Сервер запущен на http://localhost:' + port)
})