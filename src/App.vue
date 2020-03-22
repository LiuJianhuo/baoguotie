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
// form input项
.el-form-item {
  &.predend-icon-item {
    .el-input-group__prepend {
      padding-left: 0px;
      padding-right: 9px;
      background-color: #ffffff;
      border: none;
      .icon {
        width: 11.55px;
        height: 15.33px;
      }
    }
    .el-input__inner {
      border-radius: 3.3px;
    }
  }
  &.append-icon-item {
    .el-input-group__append {
      padding-left: 0px;
      padding-right: 0px;
      background-color: #ffffff;
      border: none;
    }
  }
}
</style>
<!-- 公共样式 -->
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
// 按钮
button {
  border: none;
  outline: none;
}
.btn-group {
  text-align: center;
  .btn {
    background-color: #fe2a50;
    color: #ffffff;
    width:6.453333rem;
    font-size:14px;
    height: 40px;
    line-height: 40px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    border-radius: 60px;
  }
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
