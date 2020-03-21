<template>
  <div class="daili">
    <div class="top">
      <input class="input" v-model="searchVal" placeholder="请输入需要搜索的内容">
      <button class="btn-1" @click="handleSearch">搜索</button>
      <button class="btn-2" @click="xinzengdailibaobei=true">新增代理报备</button>
    </div>
    <div class="center">
      <div class="center-1">
        <div>代理公司</div>
        <div>联系方式</div>
        <div>代理城市</div>
        <div>代理价格</div>
        <div>合同影印件</div>
        <div>报备时间</div>
      </div>
      <div class="center-2">
        <ul v-for="item in list" :key="item.id">
          <li>
            <div>{{item.username}}</div>
            <div>{{item.phone}}</div>
            <div>{{item.province}} {{item.city}}</div>
            <div>{{item.price}}</div>
            <div>
              <el-image
                style="width: 120px; height: 63px"
                :src="item.contractimg"
                :preview-src-list="[item.contractimg]">
              </el-image>
            </div>
            <div>{{item.createTime}}</div>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog :visible.sync="xinzengdailibaobei">
      <div class="daili-1">
        <p>代理报备</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="代理公司" prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入代理公司名称"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <div><span class="c-red">*</span>代理城市</div>
          <el-form-item prop="province">
            <el-select v-model="ruleForm.region" placeholder="地区  （必 填）" class="aj6" @change="handleRegionChange">
              <el-option v-for="(item, index) in regionList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
            <el-select v-model="ruleForm.province" placeholder="省份  （必 填）" class="aj6" @change="handleProvinceChange">
              <el-option v-for="(item, index) in provinceList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
            <el-select v-model="ruleForm.city"  placeholder="城市  （必 填）" class="aj6" @change="handleCityChange">
              <el-option v-for="(item, index) in cityList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理价格" prop="price">
            <el-input v-model="ruleForm.price" placeholder="请输入代理价格，保留小数点后两位"></el-input>
          </el-form-item>
            <div>合同影印件</div>
            <div class="clearfix knjsovosv">
              <el-upload
                class="avatar-uploader"
                :action="actions.uploadHeadPotrait3 + '&bindId=' + userid"
                :show-file-list="false"
                :on-success="handleAvatarSuccess1"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
        <el-dialog
          title=""
          :visible.sync="centerDialogVisible"
          width="50%"
          append-to-body>
          <div class="dbsiv">提交成功</div>
          <span slot="footer" class="dialog-footer">
            <div class="beivbibvsifv" type="primary" @click="centerDialogVisible1">返 回</div>
          </span>
        </el-dialog>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProvinceMap, getCityMap, getRegionMap } from '@/components/uitl/china-location'
import { getRegionList, getProvinceListFromRegionName, getCityListFromProvinceName, getAreaListFromCityName } from '@/components/uitl/jsAddress.js'
import actions from '../../config/ima'
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      regionList: getRegionList(),
      provinceList: null,
      cityList: null,
      areaList: null,
      xinzengdailibaobei: false,
      actions,
      provinceMap: getProvinceMap(), // 省份
      cityMap: null, // 城市
      centerDialogVisible: false,
      imageUrl1: '',
      list: [],
      userid: '',
      searchVal: '',
      ruleForm: {
        region: '',
        username: '',
        city: '',
        price: '',
        contract: '',
        province: '',
        phone: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入代理公司名称', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入代理城市', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入代理价格', trigger: 'blur' }
        ],
        contract: [
          { required: true, message: '请输入合同影印件', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.id()
    this.getList()
  },
  methods: {
    handleSearch () {
    },
    beforeAvatarUpload () {},
    handleRegionChange (regionName) {
      console.log(regionName)
      this.ruleForm.province = ''
      this.ruleForm.city = ''
      this.ruleForm.area = ''
      this.provinceList = getProvinceListFromRegionName(regionName)
      console.log(getProvinceListFromRegionName(regionName))
    },
    id () {
      this.$axios({
        method: 'get',
        url: 'temp/admin/user/creatId',
        // url: 'admin/user/creatId',
        data: {}
      }).then(data => {
        console.log(data)
        this.userid = data.data.data
        console.log(this.userid)
      })
    },
    getList () {
      const region = localStorage.getItem('region')
      this.$axios({
        method: 'get',
        url: 'temp/admin/user/list',
        // url: 'admin/user/list',
        params: {
          userType: 1,
          region: region,
          page: 1,
          row: 10
        }
      }).then(data => {
        console.log('这是代理报备数据')
        console.log(data)
        this.list = data.data.data.list
        console.log(this.list)
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm (ruleForm) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // alert('submit!')
          const region = localStorage.getItem('region')
          this.$axios({
            method: 'get',
            url: 'temp/admin/user/register',
            // url: 'admin/user/register',
            params: {
              username: this.ruleForm.username,
              city: this.ruleForm.city,
              price: this.ruleForm.price,
              contract: this.ruleForm.contract,
              phone: this.ruleForm.phone,
              userType: 1,
              region: region,
              id: this.userid,
              state: 0
            }
          }).then(data => {
            console.log('成功')
            this.centerDialogVisible = true
            this.ruleForm = ''
            this.getList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    centerDialogVisible1 () {
      this.centerDialogVisible = false
      this.xinzengdailibaobei = false
      this.ruleForm = ''
    },
    handleAvatarSuccess1 (res, file) {
      this.imageUrl1 = URL.createObjectURL(file.raw)
    },
    // 处理省份改变
    handleProvinceChange (provinceName) {
      this.ruleForm.city = null
      this.ruleForm.area = null
      this.cityList = getCityListFromProvinceName(provinceName)
    },
    // 处理城市改变
    handleCityChange (cityName) {
      this.ruleForm.area = ''
      this.areaList = getAreaListFromCityName(cityName)
      console.log('小地球')
      console.log(this.areaList)
    },
    // 处理城市选择
    handleCitySelect () {
      if (this.ruleForm.province) {
        console.log(this.ruleForm.province)
        this.cityMap = getCityMap(this.ruleForm.province)
      }
    },
    // 处理地区选择
    handleAreaSelect () {
      if (this.ruleForm.city) {
        this.areaMap = getRegionMap(this.ruleForm.city)
      }
    }
  }
}
</script>

<style lang="less">
.el-form-item__content {
  text-align: center;
}
  .el-select {
    width: 30%;
  }
.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}
.dialog-footer {
  text-align: center;
  line-height: 60px;
  margin: 0 auto;
}
.beivbibvsifv {
  width:370px;
  height:60px;
  background:rgba(229,1,19,1);
  border-radius:32px;
  // height:30px;
  font-size:22px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:60px;
  margin: 0 auto;
  margin-bottom: 30px;
}
.dbsiv {
  // width: 100%;
  text-align: center;
  margin: 0 auto;
  font-size:30px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
  margin-top: 150px;
  margin-bottom: 250px;
}
.daili-1 {
  // background-color: aqua;
  padding: 50px 100px;
  box-sizing: border-box;
  p {
    font-size: 24px;
    text-align: center;
  }
  .el-button--primary {
    width:370px;
    height:60px;
    background:rgba(229,1,19,1);
    border-radius:32px;
    // margin: 0 auto;
    text-align: center;
  }

}
</style>

<style lang="less" scoped>

  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .daili {
    padding: 70px 70px;
    width: 100%;
    min-height: 100%;
    background-color: #fff;
    margin: 0 auto;
    box-sizing: border-box;
    // .daili-1 {
    //   width: 470px;
    //   text-align: center;
    //   margin: 0 auto;
    //   padding-top: 120px;
    //   p{
    //     font-size:30px;
    //     font-family:PingFangSC-Medium,PingFang SC;
    //     font-weight:500;
    //     color:rgba(51,51,51,1);
    //     line-height:42px;
    //     margin-bottom: 70px;
    //   }
    // }
    .top {
      // width: 100%;
      // margin: 0 auto;
      input {
        float: left;
        padding: 0 15px;
        box-sizing: border-box;
        width:468px;
        height:53px;
        border-radius:10px 0 0 10px;
        border:1px solid rgba(203,204,205,1);
        border-right: none;
      }
      .btn-1 {
        float: left;
        padding: 0;
        width: 80px;
        height:53px;
        border:1px solid rgba(203,204,205,1);
        border-left: none;
        border-radius: 0 10px 10px 0;
        text-align: center;
        line-height: 51px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-size: 18px;
        color: #fff;
        background-color: rgb(160, 163, 163);
        margin-right: 20px;
        cursor:pointer;
      }
      .btn-1:active {
        background-color: aqua;
        border-radius: 0 10px 10px 0;
        color: red;
      }
      .btn-2 {
        width:166px;
        height:53px;
        border-radius:10px;
        border:1px solid rgba(179,179,179,1);
        background-color: #fff;
        font-size:18px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        cursor:pointer;
      }
    }
    .center {
      margin-top: 30px;
      .center-1 {
        width:100%;
        height:50px;
        border-radius:10px;
        padding: 0 30px;
        box-sizing: border-box;
        border:1px solid rgba(216,216,216,1);
        display: flex;
        div {
          flex: 1;
          line-height: 50px;
          text-align: center;
          height:25px;
          font-size:18px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
      }
      .center-2 {
        width: 100%;
        // height:579px;
        border-radius:10px;
        border:1px solid rgba(216,216,216,1);
        margin-top: 10px;
        padding: 0 30px;
        box-sizing: border-box;
        ul {
          margin: 0;
          padding: 0;
          li {
            width: 100%;
            height: 63px;
            display: flex;
            text-align: center;
            div {
              height: 63px;
              flex: 1;
              font-size:14px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(95,95,95,1);
              line-height: 63px;
              border-bottom: 1px solid rgba(216,216,216,1);
              img {
                width:120px;
                height:63px;
                // margin: 20px auto;
              }
            }
          }
        }
      }
    }
  }
</style>
