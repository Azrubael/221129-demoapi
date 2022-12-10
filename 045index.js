import express from 'express'

const port = 9001
const app = express()

app.get('/hello', (req, res) => {
   res.send('Привет, Azrubael !!!')
})

app.listen(port, () => {
    console.log('Сервер запущен на http://localhost:' + port)
})
