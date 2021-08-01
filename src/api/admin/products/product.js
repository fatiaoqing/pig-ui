/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */

import request from '@/router/axios'

export function addProduct(obj) {
    return request({
      url: '/products',
      method: 'post',
      data: obj
    })
  }
export function delProduct(id) {
    return request({
        url: '/products/' + id,
        method: 'delete'
    })
  }
export function putProduct(obj) {
    return request({
        url: '/products',
        method: 'put',
        data: obj
    })
  }
export function getProduct(page, categoryId, text) {
    return request({
        url: '/products?categoryId=' + categoryId + '&text=' + text,
        method: 'get',
    })
  }
export function getTree() {
  return request({
    url: '/products/categories/tree',
    method: 'get',
  })
}
export function getHome() {
  return request({
    url: '/upload/FileUriPrefix',
    method: 'get',
  })
}
export function uploadDelete(path) {
  return request({
    url: '/upload',
    method: 'delete',
    params: path,
  })
}
export function getDpFlags(dpFlag, dpFlags) {
  return request({
    url: '/products/relation/dpFlag?dpFlag=' + dpFlag + '&dpFlags=' + dpFlags,
    method: 'get',
  })
}
export function getProductRelation(pid, page){
  return request({
    url: '/products/relation?pid=' + pid + '&page=' + page,
    method: 'get',
  })
}
export function addProductRelation(obj, pid) {
  return request({
    url: '/products/relation?pid=' + pid,
    method: 'post',
    data: 'obj',
  })
}
export function delProductRelation(id) {
  return request({
    url: '/products/relation/' + id,
    method: 'delete'
  })
}
