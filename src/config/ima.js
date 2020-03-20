import baseURL from '@/config/request.config.js'
// const baseUrl = 'https://139.196.170.121:8080/'
const baseUrl = baseURL
const prefix = process.env.NODE_ENV === 'production' ? baseUrl : 'temp/'
const actions = {
  // uploadBusinessLicense: prefix + 'ossAjax/picturesUpload?findex=business', // 上传
  // uploadFrontIDCard: prefix + 'ossAjax/picturesUpload?findex=cardFront',
  // uploadBackIDCard: prefix + 'ossAjax/picturesUpload?findex=cardbackt',
  // uploadHoldIDCard: prefix + 'ossAjax/picturesUpload?findex=cardhold',
  uploadBusinessLicense: prefix + 'ossAjax/picturesRestUpload?findex=business', // 上传
  uploadFrontIDCard: prefix + 'ossAjax/picturesRestUpload?findex=cardFront',
  uploadBackIDCard: prefix + 'ossAjax/picturesRestUpload?findex=cardbackt',
  uploadHoldIDCard: prefix + 'ossAjax/picturesRestUpload?findex=cardhold',
  updateBusinessLicense: prefix + 'ossAjax/picturesRestUpload?findex=business', // 修改
  updateFrontIDCard: prefix + 'ossAjax/picturesRestUpload?findex=cardFront',
  updateBackIDCard: prefix + 'ossAjax/picturesRestUpload?findex=cardbackt',
  updateHoldIDCard: prefix + 'ossAjax/picturesRestUpload?findex=cardhold',
  uploadHeadPotrait: prefix + 'ossAjax/pictures?findex=headpic', // 上传头像
  uploadHeadPotrait3: prefix + 'ossAjax/pictures?findex=contract', // 上传头像
  uploadHeadPotrait4: prefix + 'ossAjax/pictures?findex=execute', // 上传头像
  uploadHeadPotrait1: prefix + 'ossAjax/pictures?findex=headpic1', // 上传头像
  uploadHeadPotrait2: prefix + 'ossAjax/pictures?findex=headpic2', // 上传头像
  uploadGoodsPic: prefix + 'ossAjax/uploadGoodimg?findex=goodimg' // 上传商品图片
}

export default actions
