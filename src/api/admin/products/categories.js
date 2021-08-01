/**
 * @author zhouxingchao
 * @date 2021/7/9 14:09
 */


import request from '@/router/axios'

export function getCategoryTree() {
  return request({
    url: '/admin/products/categories/tree',
    method: 'get',
  })
}

export function addCategory(obj) {
  return request({
    url: '/products/categories',
    method: 'post',
    data: obj
  })
}

export function updateCategory(obj) {
  return request({
    url: '/products/categories/' + obj.id,
    method: 'put',
    data: obj
  })
}

export function delCategory(id) {
  return request({
    url: '/products/categories/' + id,
    method: 'delete',
  })
}

export function getCategories(query, id, name) {
  return request({
    url: '/products/categories/page?id=' + id + '&name=' + name,
    method: 'get',
    params: query
  })
}

export function getHome() {
  return request({
    url: '/products/categories/homePath',
    method: 'get',
  })
}

export function uploadDelete(path) {
  return request({
    url: '/products/categories?path=' + path,
    method: 'delete',
  })
}


