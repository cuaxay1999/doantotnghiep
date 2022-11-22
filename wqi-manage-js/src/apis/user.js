import request from '@/utils/request'

export function getUsers(params) {
  return request.get('/users', { params })
}

export function register(data) {
  return request.post('/register', data)
}

export function disableUser(id) {
  return request.put('/users/disable/' + id)
}

export function activeUser(id) {
  return request.put('/users/active/' + id)
}

export function updateUser(id, data) {
  return request.put('/users/' + id, data)
}

export function getUserById(id) {
  return request.get('/users/' + id)
}
