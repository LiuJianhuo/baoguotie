import request from '@/utils/request'
const baseUrl = 'http://139.196.178.156:8080/'
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
    url: 'admin/user/zuce',
    params
  })
}
// 获取验证码
export function getIdentifyingCode (params) {
  return request({
    method: 'get',
    url: 'api/code/getcode',
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
// 获取执行用户列表 admin/user/zhixing
export function getZXUserList (params) {
  return request({
    method: 'get',
    url: 'admin/user/zhixing',
    params
  })
}

// 添加报备
export function addReport (params) {
  return request({
    method: 'get',
    url: 'admin/user/register',
    params
  })
}
//  包裹贴报备修改
export function updateReport (params) {
  return request({
    method: 'get',
    url: 'admin/user/update',
    params
  })
}
//  导出报备
export function exportReports (params) {
  const temp = Object.keys(params).map(key => {
    return `${key}=${params[key]}`
  })
  window.location.href = baseUrl + 'admin/user/ExcelDownloads?' + temp.join('&')
}
