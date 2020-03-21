import axios from 'axios'
export function deletePic (id) {
  return axios({
    method: 'get',
    url: 'temp/ossAjax/deleteById',
    params: {
      id
    }
  })
}
export function getPicList (params) {
  return axios({
    method: 'get',
    url: 'temp/admin/user/listfile',
    params
  })
}
