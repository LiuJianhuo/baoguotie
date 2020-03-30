import axios from 'axios'

const IS_DEVLOPMENT_ENV = process.env.NODE_ENV === 'development'

const request = (config = { method: 'get', params: {}, query: {}, url: '' }) => {
  // 开发环境不是以url中api/开头的，需要再url前加temp/，进行代理，解决跨域问题
  if (IS_DEVLOPMENT_ENV && config.url.indexOf('ap1i/') < 0) {
    config.url = 'temp/' + config.url
  }
  return new Promise((resolve, reject) => {
    // console.log(config.url)
    axios(config).then(({ data }) => {
      // if (data.success || data.code === 1000 || data.code === '1000' || !data.code) {
      if (data.success) {
      // console.log(data)
        resolve(data.data)
      } else {
        reject(new Error(data.msg))
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export default request
