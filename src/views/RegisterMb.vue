<template>
  <div class="register mb-mode">
    <div class="img-wrap">
      <img src="@/assets/mb-logo.jpg" alt="">
      <div class="logo-append-wrap">
        <div class="line-over"></div>
        <img class="logo-append" src="@/assets/mb-logo-append.png" alt="">
        <img class="logo-text" src="@/assets/logo-text.png" alt="">
      </div>
      <p class="title">注册</p>
    </div>
    <el-form class="form" ref="form" :model="form" @submit.native.prevent :rules="rules">
      <el-form-item class="predend-icon-item" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" v-pure-number>
          <template slot="prepend"><img class="icon" src="@/assets/phone.png" alt=""></template>
        </el-input>
      </el-form-item>
      <el-form-item class="predend-icon-item append-icon-item" prop="code">
        <el-input v-model="form.code" placeholder="请输入验证码">
          <template slot="prepend"><img class="icon" src="@/assets/identifying-code.png" alt=""></template>
          <template slot="append"><div class="code-box-warp"><button class="code-box" :class="timeId ? 'active' : ''" @click="handleGetCode">{{codeText}}</button></div></template>
        </el-input>
      </el-form-item>
      <el-form-item class="predend-icon-item" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码">
          <template slot="prepend"><img class="icon" src="@/assets/pwd.png" alt=""></template>
        </el-input>
      </el-form-item>
      <el-form-item class="predend-icon-item" prop="passwordAgain">
        <el-input v-model="form.passwordAgain" type="password" placeholder="请输入确认密码">
          <template slot="prepend"><div class="icon"></div></template>
        </el-input>
        <router-link :to="{ name: 'loginMb' }" class="login-link">登录</router-link>
      </el-form-item>
      <div class="btn-group">
        <button class="btn" @click="handleRegister">注册</button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { register, getIdentifyingCode } from '@/api'
export default {
  data () {
    const validatePwdAgain = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入确认密码'))
      }
      if (this.form.password && this.form.password !== value) {
        return callback(new Error('密码和确认密码不一致'))
      }
      return callback()
    }
    const validatePhone = (rule, value, callback) => {
      if (value && !(/^1\d{10}/.test(value))) {
        return callback(new Error('手机号不正确'))
      }
      return callback()
    }
    return {
      form: {
        phone: '',
        code: '',
        password: '',
        passwordAgain: ''
      },
      timeId: null,
      codeText: '获取验证码',
      rules: {
        phone: [
          { required: true, message: '请输入手机号' },
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ],
        passwordAgain: [
          { required: true, validator: validatePwdAgain, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取验证码
    handleGetCode () {
      // timeId 定时器存在，说明还在倒计时，不能获取验证码
      if (this.timeId) {
        return
      }
      if (!this.form.phone) {
        this.$message({ message: '请先输入手机号', type: 'error', duration: 900 })
        return
      }
      let remainTime = 60
      getIdentifyingCode({
        phone: this.form.phone,
        type: 2
      }).then(data => {
        this.$message({ message: '验证码发送成功', type: 'success', duration: 900 })
        this.codeText = remainTime + 's后重新获取'
        this.timeId = setInterval(() => {
          this.codeText = --remainTime + 's后重新获取'
          if (remainTime < 0) {
            clearInterval(this.timeId)
            this.timeId = null
            this.codeText = '获取验证码'
          }
        }, 1000)
      }).catch(err => {
        this.$message({ message: err.message, type: 'error', duration: 900 })
      })
    },
    handleRegister () {
      this.$refs.form.validate(valid => {
        if (valid) {
          register(this.form).then(data => {
            this.$confirm('您已注册成功', {
              confirmButtonText: '去登录',
              showCancelButton: false,
              showClose: false,
              center: true
            }).then(() => {
              this.$router.push({ name: 'loginMb' })
            })
          }).catch(err => {
            this.$message({ message: err.message, type: 'error', duration: 900 })
          })
        }
      })
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
<style lang="less" scoped>
.mb-mode {
  &.register {
    width: 100%;
    .title {
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 1.866667rem;
      // top: 9.12rem;
      font-size:20px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
     .img-wrap {
      position: relative;
      width: 100%;
      .logo-append-wrap {
        width: 100%;
        position: relative;
        .logo-text {
          position: absolute;
          top: -0.30rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: 5.6rem;
          width: 8rem;
        }
      }
      img {
        width: 100%;
        vertical-align: top;
      }
      .logo-append {
        margin-top: -3px;
        // padding-top: 1px;
        background-color: #fe2a50;
        padding-top: .4rem;
        border: none;
        outline: none;
      }
      .line-over {
        position: absolute;
        height: 2px;
        background-color: #ffffff;
        bottom: -1px;
        width: 100%;
      }
    }
  }
  .form {
    margin-top: -10px;
    box-sizing: border-box;
    padding: 0px 13.67px;
    background-color: #ffffff;
  }
  .code-box {
    display: block;
    width: 113px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #DCDFE6;
    border-radius: 3.3px;
    margin-left: 7px;
    color: #666666;
    background-color: #ffffff;
    &.active {
      color: #fe2a50;
    }
  }
  .login-link {
    position: absolute;
    bottom: -22px;
    right: 0px;
    height: 22px;
    line-height: 22px;
    font-size: 14px;
    text-decoration: underline;
  }
}
</style>
<style lang="less">
@media screen and (max-width: 800px) {
  .el-message {
    min-width: 300px;
    .el-icon-error {
      font-size: 15px;
    }
  }
  .el-message-box {
    width: 8rem;
  }
}
</style>
