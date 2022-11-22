import request from '@/utils/request'

export function createDevice(data) {
  return request.post('/devices', data)
}

export function getDevices(params) {
  return request.get('/devices', { params })
}

export function getDeviceById(id) {
  return request.get('/devices/' + id)
}

export function updateDevice(id, data) {
  return request.put('/devices/' + id, data)
}
