import { Server as HttpServer } from 'http'
import socketIO from 'socket.io'

const initSocketIO = (httpServer: HttpServer) => {
  const io = socketIO(httpServer)
  //   https://socket.io/docs/v3/migrating-from-2-x-to-3-0/index.html#CORS-handling
}

export default initSocketIO
