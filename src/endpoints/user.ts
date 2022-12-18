import {users} from '../db'
import {validate} from 'uuid'
import {ServerResponse} from 'http'

export const getAll = (res: ServerResponse) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.write(JSON.stringify(users))
  res.end()
}

export const get = (id: string, res: ServerResponse) => {
  const user = users.filter( (u) => u.id===id )
  if (user.length === 0) {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.write('User not found')
    res.end()
  } else if (validate(id)) {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.write(user)
    res.end()
  } else {
    res.writeHead(400, {'Content-Type': 'text/plain'})
    res.write('User id is invalid')
    res.end()
  }
}