import request from '@/utils/request'
export function deletePic (id) {
  return request({
    method: 'get',
    url: 'ossAjax/deleteById',
    params: {
      id
    }
  })
}
// 创建用户id [代理报备]
export function createUserId (params) {
  return request({
    method: 'get',
    url: 'admin/user/creatId',
    params
  })
}
export function getPicList (params) {
  return request({
    method: 'get',
    url: 'admin/user/listfile',
    params
  })
}
// 登录
export function login (params) {
  return request({
    method: 'get',
    url: 'admin/user/login',
    params
  })
}
// 注册
export function register (params) {
  return request({
    method: 'get',
    url: '',
    params
  })
}
// 获取验证码
export function getIdentifyingCode (params) {
  return request({
    method: 'get',
    url: '',
    params
  })
}

//  获取用户列表
export function getUserList (params) {
  return request({
    method: 'get',
    url: 'admin/user/list',
    params
  })
}

//  用户注册
export function userRegister (params) {
  return request({
    method: 'get',
    url: 'admin/user/register',
    params
  })
}
