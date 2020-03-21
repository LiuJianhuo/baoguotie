<template>
  <div class="login mb-mode">
    <div class="img-wrap">
      <img src="@/assets/mb-logo.png" alt="">
      <img class="mb-logo-append" src="@/assets/mb-logo-append.png" alt="">
    </div>
    <form class="form">
      <div class="input-group clearfix">
        <img class="input-group__icon" src="@/assets/phone.png" alt="">
        <div class="input-group__input-warp">
          <input class="input-group__input" type="text">
        </div>
      </div>
      <div class="input-group clearfix">
        <img class="input-group__icon" src="@/assets/pwd.png" alt="">
        <div class="input-group__input-warp">
          <input class="input-group__input" type="text">
        </div>
      </div>
    </form>
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
  &.login {
    width: 100%;
    .img-wrap {
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
    }
  }
  .form {
    margin-top: 20px;
    box-sizing: border-box;
    padding: 0px 20px;
  }
  .input-group {
    height: 40px;
    margin-bottom: 10px;
    .input-group__input-warp {
      margin-left: 40px;
    }
    .input-group__icon {
      width: 20px;
      height: 26px;
      float: left;
      line-height: 26px;
      padding: 7px 5px;
    }
    .input-group__input {
      box-sizing: border-box;
      width: 100%;
      // width: calc(100% - 45px);
      // margin-left: 40px;
      height:40px;
      border-radius:4px;
      border:1px solid rgba(51,51,51,1);
    }
  }
}
  .login {
    .login-beijing {
      height: 100vh;
      width: 100vw;
      background: url("../assets/login-beijing.png");
      .login-top {
        width: 100%;
        height:80px;
        text-align: center;
        background:rgba(255,255,255,1);
        font-size:30px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:80px;
      }
      .login-content {
        // position: relative;
        // display: flex;
        .login-login {
          // position: absolute;
          float: right;
          margin-right: 220px;
          margin-top: 10  0px;
          height: auto;
          width:499px;
          height:486px;
          background:rgba(255,255,255,1);
          border-radius:10px;
          border:1px solid rgba(151,151,151,1);
            .btn {
              width:300px;
              text-align: center;
              height:50px;
              background:rgba(229,1,19,1);
              border-radius:32px;
              font-size:22px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(255,255,255,1);
              line-height:50px;
              margin-top: 90px;
              position: relative;
              left:50%;
              transform:translateX(-50%);
            }
          .login-login-top {
            p {
              text-align: center;
              line-height: 43px;
              font-size:30px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(51,51,51,1);
              line-height:42px;
              margin-bottom: 50px;
            }
          }
        }
      }
    }
  }
</style>

<style lang="less">
.login-login {
  .el-input__inner {
    width: 340px;
  }
}
</style>
