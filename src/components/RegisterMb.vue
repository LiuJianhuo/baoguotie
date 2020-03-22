<template>
  <div class="register mb-mode">
    <div class="img-wrap">
      <div class="line-over"></div>
      <img src="@/assets/mb-logo.png" alt="">
      <img class="mb-logo-append" src="@/assets/mb-logo-append.png" alt="">
      <p class="title">注册</p>
    </div>
    <el-form class="form" ref="form" :model="form" @submit.native.prevent>
      <el-form-item class="predend-icon-item">
        <el-input v-model="form.name" placeholder="请输入手机号">
          <template slot="prepend"><img class="icon" src="@/assets/phone.png" alt=""></template>
        </el-input>
      </el-form-item>
      <el-form-item class="predend-icon-item append-icon-item">
        <el-input v-model="form.name" placeholder="请输入验证码">
          <template slot="prepend"><img class="icon" src="@/assets/phone.png" alt=""></template>
          <template slot="append"><div class="code-box-warp"><button class="code-box" :class="timeId ? 'active' : ''" @click="handleGetCode">{{codeText}}</button></div></template>
        </el-input>
      </el-form-item>
      <el-form-item class="predend-icon-item">
        <el-input v-model="form.name" placeholder="请输入密码">
          <template slot="prepend"><img class="icon" src="@/assets/pwd.png" alt=""></template>
        </el-input>
      </el-form-item>
      <el-form-item class="predend-icon-item">
        <el-input v-model="form.name" placeholder="确认密码">
          <template slot="prepend"><div class="icon"></div></template>
        </el-input>
      </el-form-item>
      <div class="btn-group">
        <button class="btn" @click="handleRegister">注册</button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      timeId: null,
      codeText: '获取验证码',
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
  methods: {
    // 获取验证码
    handleGetCode () {
      // timeId 定时器存在，说明还在倒计时，不能获取验证码
      if (this.timeId) {
        return
      }
      let remainTime = 60
      this.codeText = remainTime + 's后重新获取'
      this.timeId = setInterval(() => {
        this.codeText = --remainTime + 's后重新获取'
        if (remainTime < 0) {
          clearInterval(this.timeId)
          this.timeId = null
          this.codeText = '获取验证码'
        }
      }, 1000)
    },
    handleRegister () {},
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
      img {
        width: 100%;
        vertical-align: top;
      }
      .mb-logo-append {
        margin-top: -3px;
        // padding-top: 1px;
        background-color: #fe2a50;
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
}
</style>
