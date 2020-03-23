<template>
  <div class="index mb-mode">
    <nav class="nav">
      <img class="user-pic" src="@/assets/user.png" alt="">
      <span class="user-name">{{item.username}}</span>
      <button class="btn" @click="handleLoginOut">退出</button>
    </nav>
    <div class="img-wrap">
      <img src="@/assets/logo.png" alt="">
    </div>
    <div class="bd box">
      <div class="box-item clearfix">
        <div class="control-prepend">
          <img class="icon" src="@/assets/city-icon.png" alt="">
          <label class="label" for="">投放城市：</label>
        </div>
        <div class="control col-2">
          <el-select v-model="form.province" placeholder="请选择省份" @change="handleProvinceChange">
            <el-option
              v-for="(item, index) in provinceList"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-select v-model="form.city" placeholder="请选择城市" @click="handleCityChange">
            <el-option
              v-for="(item, index) in cityList"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="box-item clearfix">
        <div class="control-prepend">
          <img class="icon" src="@/assets/date-icon.png" alt="">
          <label class="label" for="">投放日期：</label>
        </div>
        <div class="control date">
          <el-input
            placeholder="请选择日期"
            v-model="form.dttime"
            loading
            @click.native="showDatePicker = true"
            disabled>
            <i slot="suffix" class="el-input__icon el-icon-date" @click="showDatePicker = true"></i>
          </el-input>
        </div>
      </div>
      <div class="box-item clearfix">
        <div class="control-prepend">
          <img class="icon" src="@/assets/netdot-icon.png" alt="">
          <label class="label" for="">投放网点：</label>
        </div>
        <div class="control col-2">
          <el-select v-model="form.dot" placeholder="请选择网点" @change="handleNetdotChange">
            <el-option
              v-for="(item, index) in netDotList"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="box-item clearfix">
        <div class="control-prepend">
          <img class="icon" src="@/assets/number-icon.png" alt="">
          <label class="label" for="">投放数量：</label>
        </div>
        <div class="control value">
          {{item.number}}
        </div>
      </div>
      <div class="box-item clearfix">
        <div class="control-prepend">
          <img class="icon" src="@/assets/print-icon.png" alt="">
          <label class="label width-auto" for="">印刷物流证明：</label>
        </div>
      </div>
      <div class="pic-display">
        <ul class="list clearfix" @click="handleShowPicGallary([item.headpic, item.headpic1])">
          <li class="list__item">
            <img class="pic" :src="item.headpic">
          </li>
          <li class="list__item">
            <img class="pic" :src="item.headpic1">
          </li>
        </ul>
      </div>
      <div class="box-item clearfix">
        <div class="control-prepend">
          <img class="icon" src="@/assets/pic-icon.png" alt="">
          <label class="label width-auto" for="">图片证明：</label>
        </div>
      </div>
      <div class="pic-display">
        <ul class="list scroll clearfix" @click="handleShowPicGallary(contractimgList)">
          <li class="list__item" v-for="(item, index) in contractimgList" :key="index">
            <img class="pic" :src="item">
          </li>
        </ul>
        <div class="side-bar-more">
          <img src="@/assets/more1.png" alt="">
        </div>
      </div>
      <div class="box-item clearfix">
        <div class="control-prepend">
          <img class="icon" src="@/assets/video-icon.png" alt="">
          <label class="label width-auto" for="">视频证明：</label>
        </div>
      </div>
      <div>
        <video class="video" :src="item.executeimg" controls></video>
      </div>
    </div>
    <div class="pic-gallary" :class="showPicGallary ? 'show' : ''" >
      <van-swipe class="gallary-swipe" indicator-color="#FF2746" :loop="false">
        <van-swipe-item v-for="(item, index) in picGallaryList" :key="index">
          <div class="gallary-box">
            <img :src="item" alt="">
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="mask" :class="showMask ? 'show' : ''" ref="mask"></div>
    <van-popup v-model="showDatePicker"
       position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @confirm="handleDatePickerConfirm"
        @cancel="showDatePicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getProvinceList, getCityListFromProvinceName } from '@/components/uitl/jsAddress'
import { getPicList } from '@/api/index'
export default {
  data () {
    return {
      minDate: new Date(1995, 0, 1),
      currentDate: new Date(),
      provinceList: getProvinceList(),
      showDatePicker: false,
      cityList: null,
      netDotList: null, // 网点列表
      item: {},
      showMask: false, // 显示遮罩
      showPicGallary: false, // 显示图片展览
      form: {
        province: '',
        city: '',
        dot: '',
        dttime: ''
      },
      contractimgList: [], // 图片证明列表
      picGallaryList: null,
      rules: {
        userword: [
          { required: true, message: '请输出用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输出密码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    this.$refs.mask.addEventListener('click', this.handleMaskClick)
    this.$refs.mask.addEventListener('touchmove', this.handleMaskTouchMove, true)
  },
  beforeDestroy () {
    this.$refs.mask.removeEventListener('click', this.handleMaskClick)
  },
  methods: {
    handleMaskTouchMove (e) {
      console.log(e.cancelable)
      if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault()
      }
      // e.preventDefault()
    },
    formatDate (date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    handleLoginOut () {
      localStorage.removeItem('region')
      this.$router.push({ name: 'loginMb' })
    },
    // 日期选择确认
    handleDatePickerConfirm (date) {
      console.log(date)
      this.form.dttime = this.formatDate(date)
      this.showDatePicker = false
    },
    // 获取图片证明
    handleGetContactimgList (id) {
      getPicList({
        findex: 'contract',
        bindId: id
      }).then(({ data }) => {
        this.contractimgList = data && data.map(({ url }) => {
          return url
        })
      }).catch(err => {
        console.log(err)
      })
    },
    handleMaskClick ({ currentTarget }) {
      if (currentTarget === this.$refs.mask) {
        this.handleHiddenPicGallary()
      }
    },
    handleShowPicGallary (list) {
      this.picGallaryList = list
      this.showMask = true
      this.showPicGallary = true
      // 滚动的Y距离
      // this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      document.body.classList.add('overflow-hidden')
    },
    handleHiddenPicGallary () {
      document.body.classList.remove('overflow-hidden')
      // window.scrollTo(0, this.scrollTop)
      this.showMask = false
      this.showPicGallary = false
    },
    getList () {
      const region = localStorage.getItem('region')
      this.$axios({
        method: 'get',
        url: 'temp/admin/user/list',
        // url: 'admin/user/list',
        params: {
          userType: 3,
          region: region,
          page: 1,
          row: 10
        }
      }).then(res => {
        const list = res.data.data.list
        this.item = list && list[0]
        this.handleGetContactimgList(list[0].id)
      })
    },
    // 省份改变
    handleProvinceChange (val) {
      this.form.city = null
      this.form.dot = null
      this.cityList = getCityListFromProvinceName(val)
    },
    // 城市改变
    handleCityChange () {
      this.form.dot = null
    },
    // 网点改变
    handleNetdotChange (val) {
      console.log(val)
    },
    onSubmit () {
      console.log('submit!')
    },
    login () {
      console.log('我点击了登录按钮')
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'get',
            url: 'temp/admin/user/login',
            // url: 'admin/user/login',
            params: {
              username: this.form.username,
              password: this.form.password
            }
          }).then(data => {
            // console.log('我是登录成功')
            // console.log(data.data.data.region)
            // console.log(data)
            // console.log(data.data.msg)
            // const msg = data.data.msg
            if (data.data.code === '10000') {
              // alert('登录' + msg)
              this.$message({ message: '登录成功', type: 'success', duration: 900 })
              localStorage.setItem('region', data.data.data.region)
              const region = localStorage.getItem('region')
              const time = setTimeout(() => {
                this.$router.push({ name: 'index' })
                clearTimeout(time)
              }, 250)
              // return false
              console.log(region)
            } else {
              return false
            }
          })
          // alert('登陆成功')
        } else {
          console.log('失败了')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
//element ui 表单控件样式
.box-item {
  height: 40px;
  line-height: 40px;
  .control {
    &.col-2 {
      .el-select {
        width: calc(50% - 5px);
        margin-right: 10px;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
    &.date {
      .el-input {
        width: 5.866667rem;
      }
    }
  }
  .el-select {
    vertical-align: top;
  }
  .el-input {
    vertical-align: top;
    &.is-disabled {
      .el-input__inner {
        // border-color: #fefefe;
        color: #000;
        background-color: #ffffff;
      }
    }
  }
}
.el-picker-panel {
  position: fixed !important;
  top: 0px !important;
  left:0px !important;
  margin: 0px auto;
  left: 50% !important;
  margin-left: -155px !important;
  &.el-date-picker {
    width: 310px;
  }
  .popper__arrow {
    display: none;
  }
}
</style>
<style lang="less" scoped>
.mb-mode {
  &.index {
    width: 100%;
    .img-wrap {
      padding-top: 40px;
      width: 100%;
      img {
        width: 100%;
        vertical-align: top;
      }
    }
    .nav {
      position: fixed;
      width: 100%;
      text-align: right;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      z-index: 500;
      background-color: #ffffff;
      // padding: 5px;
      .user-pic {
        padding-top: 11px;
        width: 16px;
        height: 16px;
        vertical-align: top;
        margin-right: 2px;
      }
      .user-name {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        color: #888;
        vertical-align: top;
      }
      .btn {
        // margin-right: 15px;
        margin-left: 5px;
        vertical-align: top;
        background-color: #ffffff;
        color: #888;
        padding: 0px 8px;
        text-decoration: underline;
      }
    }
    .bd {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 14px;
    }
    .box-item {
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
      .control-prepend {
        float: left;
      }
      .control {
        // width: 100%;
        margin-left: 89px;
      }
      .icon {
        padding-top: 12.335px;
        width: 12px;
        height: 12px;
        vertical-align: top;
        margin-right: 10px;
      }
      .label {
        display: inline-block;
        vertical-align: top;
        width:67px;
        height: 40px;
        line-height: 40px;
        font-size:13px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(102,102,102,1);
        &.width-auto {
          width: auto;
        }
      }
      .value {
        font-size:15px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
      }
      .el-select {
        vertical-align: top;
      }
    }
    .pic-display {
      position: relative;
      .list {
        height: 2.666667rem;
        .list__item {
          float: left;
          width: calc(50% - 10px);
          margin-right: 10px;
          height: 2.666667rem;
          border: 1px solid #f7f5f5;
          overflow: hidden;
          border-radius: 6px;
          .pic {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
          &:last-child {
            margin-right: 0px;
          }
        }
        &.scroll {
          overflow-y: hidden;
          overflow-x: auto;
          white-space: nowrap;
          height: 2.72rem;
          &::-webkit-scrollbar {
            display: none;
          }
          .list__item {
            display: inline-block;
            vertical-align: top;
            float: none;
            width: 4.506667rem;
            height: 2.666667rem;
          }
        }
      }
      .side-bar-more {
        position: absolute;
        width: 20px;
        right: -1px;
        height: 100%;
        top: 0px;
        background: rgba(232, 232, 232, .4);
        background: rgba(245, 245, 245, .8);
        img {
          transform: translateY(-50%);
          position: absolute;
          top: 50%;
          left: 0px;
          width: 100%;
        }
      }
    }
    .video {
      width: 4.506667rem;
      height: 2.666667rem;
      border: 1px solid #f7f5f5;
      border-radius: 6px;
    }
    .pic-gallary {
      position: fixed;
      top: 4rem;
      width: 95%;
      z-index: 1000;
      left: 50%;
      display: none;
      transform: translateX(-50%);
      &.show {
        display: block;
      }
      .gallary-box {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .gallary-swipe {
        width: 100%;
        height: 5.333333rem;
        background-color: #ffffff;
      }
    }
  }
}
</style>
