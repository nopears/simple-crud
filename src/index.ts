import {createServer} from 'http'
import {requestHandler} from './requestHandler'
import 'dotenv/config'

const server = createServer(requestHandler)

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log('Server is listening on port: ' + PORT)
})