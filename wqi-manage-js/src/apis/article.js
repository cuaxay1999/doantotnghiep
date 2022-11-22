import request from '@/utils/request'

export function creaetArticle(data) {
  return request.post('/articles', data)
}

export function getArticles(params) {
  return request.get('/articles', { params })
}

export function getArticleById(id) {
  return request.get('/articles/' + id)
}

export function deleteArticle(id) {
  return request.delete('/articles/' + id)
}
