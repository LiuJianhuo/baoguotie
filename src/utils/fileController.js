// 文件控制
const IMG_SIZE = 3
const imgSizeTooLarge = (file) => {
  return file.size / 1024 / 1024 > IMG_SIZE
}
export default {
  imgSizeTooLarge,
  IMG_SIZE
}
