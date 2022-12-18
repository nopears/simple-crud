import {IncomingMessage, ServerResponse} from 'http'
import {getAll, get} from './endpoints/user'

export const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  switch(req.method) {
    case 'GET': {
      if (req.url === '/api/users') {
        getAll(res)
      } else if (req.url && /\/api\/users\/[a-zA-Z0-9-]+$/.test(req.url)) {
        const id = req.url.split('/')[-1]

        get(id, res)
      } else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('Request not found')
        res.end()
      }
      break
    }
    case 'POST': {
      const body = ''

      if (req.url === '/api/users') {
        getAll(res)
      } else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('Request not found')
        res.end()
      }
    }
  }
}