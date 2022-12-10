import http from 'http'

const host = "localhost"
const port = 9001

const server = http.createServer((request, response) => {
   // обработка запроса на сервер
   response.statusCode = 200
   response.setHeader('Content-Type', 'text/plain')
   response.end('Привет, Azrubael !!!')
})

// прослушивание порта в цикле, не останавливая сервер
server.listen(port, host, () => {
   console.log('Сервер запущен на '+ host + ':' + port)
})