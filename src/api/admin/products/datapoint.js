import request from '@/router/axios'

export function fetchList (query, keyWord) {
  return request({
    url: '/admin/products/datapoints?keyWord='+keyWord,
    method: 'get',
    params: query
  })
}

export function delObj (id) {
  return request({
    url: '/admin/products/datapoints/' + id,
    method: 'delete'
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/products/datapoints',
    method: 'post',
    data: obj
  })
}

export function putObj (obj, id) {
  return request({
    url: '/admin/products/datapoints/'+id,
    method: 'put',
    data: obj
  })
}
