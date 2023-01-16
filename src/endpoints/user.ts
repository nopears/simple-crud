import {users} from '../db'
import {v4, validate} from 'uuid'
import {ServerResponse} from 'http'
import {User} from '../types/user'

export const getAllUsers = (res: ServerResponse) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.write(JSON.stringify(users))
  res.end()
}

export const getUser = (id: string, res: ServerResponse) => {
  const user = users.filter( (u) => u.id===id )

  if (validate(id)) {
    if (user.length === 0) {
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.write('User not found')
      res.end()
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.write(JSON.stringify(user[0]))
      res.end()
    }
  } else {
    res.writeHead(400, {'Content-Type': 'text/plain'})
    res.write('User id is invalid')
    res.end()
  }
}

export const addUser = (body: any, res: ServerResponse) => {
  try {
    const user: User = JSON.parse(body) as User

    user['id'] = v4()
    users.push(user)
    res.writeHead(201, {'Content-Type': 'application/json'})
    res.write(JSON.stringify(user))
    res.end()
  }
  catch {
    res.writeHead(400, {'Content-Type': 'text/plain'})
    res.write('Wrong body')
    res.end()
  }

}

export const changeUser = (id: string, body: any, res: ServerResponse) => {
  const user = users.filter( (u) => u.id===id )

  if (validate(id)) {
    if (user.length === 0) {
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.write('User not found')
      res.end()
    } else {
      const newUser: User = {...JSON.parse(body), id} as User

      if (newUser.username && newUser.hobbies && newUser.age) {
        users[users.findIndex((user => user.id===id))] = newUser

        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write(JSON.stringify(newUser))
        res.end()
      } else {
        res.writeHead(400, {'Content-Type': 'text/plain'})
        res.write('Wrong body')
        res.end()
      }
    }

  } else {
    res.writeHead(400, {'Content-Type': 'text/plain'})
    res.write('User id is invalid')
    res.end()
  }
}

export const deleteUser = (id: string, res: ServerResponse) => {
  const user = users.filter( (u: User) => u.id===id )

  if (validate(id)) {
    if (user.length === 0) {
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.write('User not found')
      res.end()
    } else {
      const index = users.findIndex( (u: User) => u.id === user[0].id )
      users.splice(index, 1)

      res.writeHead(204, {'Content-Type': 'text/plain'})
      res.end()
    }
  } else {
    res.writeHead(400, {'Content-Type': 'text/plain'})
    res.write('User id is invalid')
    res.end()
  }
}