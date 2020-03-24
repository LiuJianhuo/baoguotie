// const baseURL = 'https://ht.hongrendaihuo.com:8080/'
const baseURL = 'http://139.196.178.156:8080/'
module.exports = {
  devServer: {
    proxy: {
      '/temp': {
        target: baseURL,
        changeOrigin: true,
        pathRewrite: {
          '^/temp': ''
        }
      },
      '/api': {
        // target: 'https://139.196.170.121:8080/',
        target: baseURL,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
