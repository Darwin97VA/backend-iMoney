import connection from './models'
import express, { NextFunction, Request, Response } from 'express'
import { createServer } from 'http'

import io from './socket.io'
import routes from './routes'
import tests from './tests'

const PORT = process.env.PORT || 3090

const Logger = (req: Request, _res: Response, next: NextFunction) => {
  console.log(req.body, req.headers)
  next()
}

// Database
connection()
  .then((_connection) => {
    // Express
    const app = express()
    // app.use(Logger)
    app.use(routes)

    // HTTP
    const http = createServer(app)

    // Socket IO
    io(http)

    http.listen(PORT, () => console.log(`Running in ${PORT} port.`))

    // console.log('5 segundos')
    // setTimeout(() => {
    //   tests()
    // }, 5000)
  })
  .catch((error) => console.log(error))
