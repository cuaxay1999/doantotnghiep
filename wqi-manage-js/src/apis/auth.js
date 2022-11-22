import request from '@/utils/request'

export function login(data) {
  return request.post('/login', data)
}

export function getInfor() {
  return request.get('/me')
}

// export function activeAdmin(id) {
//   return request.put('/auth/owner-place/approve/' + id)
// }

// export function disableAdmin(id) {
//   return request.put('/auth/owner-place/disable/' + id)
// }
