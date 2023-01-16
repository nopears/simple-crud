import {IncomingMessage, ServerResponse} from 'http'
import {getUser, getAllUsers, addUser, changeUser, deleteUser} from './endpoints/user'

export const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  switch(req.method) {
    case 'GET': {
      if (req.url === '/api/users') {
        getAllUsers(res)
      } else if (req.url && /\/api\/users\/[a-zA-Z0-9-]+$/.test(req.url)) {
        const id = req.url.split('/').slice(-1)[0]

        getUser(id, res)
      } else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('Request not found')
        res.end()
      }
      break
    }
    case 'POST': {
      if (req.url === '/api/users') {
        let body = ''

        req.on('data', (data) => {
          body += data
        })

        req.on('end', () => {
          addUser(body, res)
        })
      } else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('Request not found')
        res.end()
      }
      break
    }
    case 'PUT': {
      if (req.url && /\/api\/users\/[a-zA-Z0-9-]+$/.test(req.url)) {
        let body = ''
        const id = req.url.split('/').slice(-1)[0]

        req.on('data', (data) => {
          body += data
        })

        req.on('end', () => {
          changeUser(id, body, res)
        })
      } else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('Request not found')
        res.end()
      }
      break
    }
    case 'DELETE': {
      if (req.url && /\/api\/users\/[a-zA-Z0-9-]+$/.test(req.url)) {
        const id = req.url.split('/').slice(-1)[0]

        deleteUser(id, res)
      } else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('Request not found')
        res.end()
      }
      break
    }
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.write('Request method not found')
      res.end()
  }
}