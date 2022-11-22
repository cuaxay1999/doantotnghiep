import request from '@/utils/request'

export function dashboard(params) {
  return request.get('/dashboard', { params })
}

export function getInfors(params) {
  return request.get('/infors', { params })
}
