<template>
  <div class="page">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<!-- element-ui 公共样式 -->
<style lang="less">
.el-image-viewer__canvas {
  .el-image-viewer__img {
    min-width: 300px;
  }
}
.el-image-viewer__wrapper {
  .el-icon-circle-close {
    color: #ffffff;
  }
}
</style>
<style lang="less">
.c-red {
  color: #F56C6C;
  margin-right: 4px;
}
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  opacity: .8;
}
.clearfix::after, .clearfix::before {
  display: block;
  content: ' ';
  clear: both;
}
* {
  padding: 0px;
  margin: 0px;
}
</style>
<style lang="less" scope>
body {
  width: 100%;
}
.page {
  width: 100%;
}
</style>
