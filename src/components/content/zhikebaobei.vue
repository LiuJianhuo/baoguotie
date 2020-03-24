<template>
  <div class="kehu">
    <div class="top">
      <input class="searchVal" v-model="input" placeholder="请输入需要搜索的内容">
      <button class="btn-1">搜索</button>
      <button class="btn-2" @click="outerVisible=true; id()">新增直客报备</button>
    </div>
    <div class="center">
      <div class="center-1">
        <div>客户名称</div>
        <div>联系方式</div>
         <div>客户价格</div>
        <div>客户来源</div>
        <div>投放城市</div>
        <div>投放网点</div>
        <div>投放周期</div>
        <div>投放数量</div>
        <!-- <div>合约金额</div> -->
        <div>合同影印件</div>
        <div>报备时间</div>
      </div>
      <div class="center-2">
        <ul v-for="item in list" :key="item.id">
          <li>
            <div>{{item.username}}</div>
            <div>{{item.phone || '--'}}</div>
            <div>{{item.ctprice}}</div>
            <div>{{item.ctsource}}</div>
            <div>{{item.province}} {{item.city}}</div>
            <div>{{item.dot}}</div>
            <div>{{item.startTime}}{{item.endTime && '-' + item.endTime}}</div>
            <div>{{item.number}}</div>
            <!-- <div>{{item.price}}</div> -->
            <!-- <div><img :src="item.contractimg" alt=""></div> -->
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
    <el-dialog :visible.sync="outerVisible">
      <div class="kehu-1">
        <p>直客报备</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="客户名称" prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入客户名称"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号" v-pure-number></el-input>
          </el-form-item>
          <el-form-item label="客户价格" prop="ctprice">
            <el-input v-model="ruleForm.ctprice" @input="hanldeFormatNumberWithFocus" placeholder="请输入客户价格" @blur="handleFormatNumberAfterBlur"></el-input>
          </el-form-item>
          <el-form-item label="客户来源" prop="ctsource" class="custom-from-item">
            <!-- <el-input v-model="ruleForm.ctsource" placeholdetngr="请输入客户来源"></el-input> -->
            <el-select v-model="ruleForm.ctsource" placeholder="请选择客户来源">
              <el-option label="中快总部" value="中快总部"></el-option>
              <el-option label="华东区域" value="华东区域"></el-option>
              <el-option label="华南区域" value="华南区域"></el-option>
              <el-option label="华中区域" value="华中区域"></el-option>
              <el-option label="华北区域" value="华北区域"></el-option>
              <el-option label="西南区域" value="西南区域"></el-option>
              <el-option label="西北区域" value="西北区域"></el-option>
              <el-option label="东北区域" value="东北区域"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="投放城市" prop="city">
            <el-input v-model="ruleForm.city" placeholder="投放城市"></el-input>
          </el-form-item> -->
          <div class="jfbdv"><span class="c-red">*</span>投放城市</div>
          <el-form-item prop="province">
            <el-select v-model="ruleForm.region" placeholder="地区  （必 填）" class="aj6" @change="handleRegionChange">
              <el-option v-for="(item, index) in regionList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
            <el-select v-model="ruleForm.province" placeholder="省份  （必 填）" class="aj6" @change="handleProvinceChange">
              <el-option v-for="(item, index) in provinceList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
            <el-select v-model="ruleForm.city" placeholder="城市  （必 填）" class="aj6" @change="handleCityChange">
              <el-option v-for="(item, index) in cityList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投放网点" prop="dot">
            <el-input v-model="ruleForm.dot" placeholder="请输入投放网点"></el-input>
          </el-form-item>
           <el-form-item label="投放周期">
              <el-col :span="10">
                <el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.startTime" style="width: 80%;"></el-date-picker>
              </el-col>
              <el-col :span="10">
                <el-date-picker type="date" placeholder="选择结束日期" v-model="ruleForm.endTime" style="width: 80%;"></el-date-picker>
              </el-col>
            </el-form-item>
          <el-form-item label="投放数量" prop="number">
            <el-input v-model="ruleForm.number" placeholder="投放数量" @input="val => ruleForm.number = val.match(/\d*/)[0]"></el-input>
          </el-form-item>
          <!-- <el-form-item label="合约金额" prop="price">
            <el-input v-model="ruleForm.price" placeholder="请输入合约金额" @input="handleFormateToNumber" @blur="e => {ruleForm.price = ruleForm.price.endsWith('.') ? ruleForm.price.replace('.', '') : ruleForm.price}"></el-input>
          </el-form-item> -->
            <div style="text-align:left;margin-bottom: 10px"><span class="c-red">*</span>合同影印件</div>
            <div class="clearfix">
              <el-upload
                class="avatar-uploader"
                :action="actions.uploadHeadPotrait3 + '&bindId=' + userid"
                :show-file-list="false"
                :on-error="handleUploadError"
                :on-success="handleAvatarSuccess1"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div class="loading" v-loading="loading" element-loading-text="拼命上传中"></div>
              </el-upload>
            </div>
            <!-- <el-upload
              class="avatar-uploader"
              :action="actions.uploadHeadPotrait3 + '&bindId=' + userid"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
          <el-form-item>
            <el-button class="submit-btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProvinceMap, getCityMap, getRegionMap } from '@/components/uitl/china-location'
import { getRegionList, getProvinceListFromRegionName, getCityListFromProvinceName, getAreaListFromCityName } from '@/components/uitl/jsAddress.js'
import { createUserId, getUserList, userRegister } from '@/api'
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
      searchVal: '',
      actions,
      imageUrl1: '',
      list: '',
      input: '',
      userid: '',
      provinceMap: getProvinceMap(), // 省份
      cityMap: null, // 城市
      centerDialogVisible: false,
      outerVisible: false,
      ruleForm: {
        username: '',
        city: '',
        dot: '',
        price: '',
        contract: '',
        province: '',
        phone: ''
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入投放城市', trigger: 'blur' }
        ],
        ctprice: [
          { required: true, message: '请输入客户价格', trigger: 'blur' }
        ],
        ctsource: [
          { required: true, message: '请输入客户来源', trigger: 'blur' }
        ],
        dot: [
          { required: true, message: '请输入投放网点', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入合约金额', trigger: 'blur' }
        ],
        contract: [
          { required: true, message: '请输入合同影印件', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入投放数量', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // this.id()
    this.getList()
  },
  methods: {
    hanldeFormatNumberWithFocus (val) {
      const num = val.match(/^\d+(\.?\d{0,2})/)
      this.ruleForm.ctprice = num && num[0]
    },
    handleFormatNumberAfterBlur () {
      const price = this.ruleForm.ctprice
      this.ruleForm.ctprice = price.endsWith('.') ? price.replace('.', '') : price
    },
    handleFormateToNumber (val) {
      const num = val.match(/^\d+(\.?\d{0,2})/)
      this.ruleForm.price = num && num[0]
    },
    beforeAvatarUpload () {
      if (this.userid) {
        // 上传失败，显示上传中提示
        this.loading = true
        return
      }
      this.$message({
        typ: 'error',
        message: '上传失败,请重新上传',
        duration: 900
      })
      return false
    },
    handleRegionChange (regionName) {
      console.log(regionName)
      this.ruleForm.province = ''
      this.ruleForm.city = ''
      this.ruleForm.area = ''
      this.provinceList = getProvinceListFromRegionName(regionName)
      console.log(getProvinceListFromRegionName(regionName))
    },
    getList () {
      const region = localStorage.getItem('region')
      getUserList({
        userType: 4,
        region: region,
        page: 1,
        row: 10
      }).then(data => {
        console.log('这是直客报备数据')
        console.log(data)
        this.list = data.list
        console.log(this.list)
      }).catch(err => {
        console.log('执客报备用户列表：' + err.message)
      })
    },
    id () {
      if (this.userid) return
      createUserId().then(data => {
        console.log(data)
        this.userid = data
        console.log(this.userid)
      }).catch(err => {
        console.log('执客报备用户id创建：' + err.message)
      })
    },
    submitForm (ruleForm) {
      this.$refs.ruleForm.validate((valid) => {
        const region = localStorage.getItem('region')
        if (valid) {
          // alert('submit!')
          userRegister({
            username: this.ruleForm.username,
            city: this.ruleForm.city,
            dot: this.ruleForm.dot,
            price: this.ruleForm.price,
            contract: this.ruleForm.contract,
            phone: this.ruleForm.phone,
            region: region,
            state: 0,
            userType: 4,
            id: this.userid
          }).then(data => {
            this.$message({ message: '提交成功', type: 'success', duration: 900 })
            this.ruleForm = ''
            this.getList()
          }).catch(err => {
            console.log('执客报备用户注册：' + err.message)
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    centerDialogVisible1 () {
      this.centerDialogVisible = false
      this.outerVisible = false
      this.ruleForm = ''
    },
    handleUploadError () {
      this.loading = false
      this.$message({
        type: 'error',
        message: '上传失败，请重新上传',
        duration: 900
      })
    },
    handleAvatarSuccess1 (res, file) {
      this.imageUrl1 = URL.createObjectURL(file.raw)
      this.loading = false
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
.kehu-1 {
  .el-button--primary {
    width:370px;
    height:60px;
    background:rgba(229,1,19,1);
    border-radius:32px;
    // margin-top: 70px;
  }
  .el-image-viewer__img {
    min-width: 300px;
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
.kehu {
  padding: 70px 10px;
  box-sizing: border-box;
}
.kehu {
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin: 0 auto;
  .kehu-1 {
    width: 470px;
    text-align: center;
    margin: 0 auto;
    // padding-top: 120px;
    p{
      font-size:30px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:42px;
      margin-bottom: 70px;
    }
  }
}
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
          border-bottom: 1px solid rgba(216,216,216,1);;
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
.submit-btn {
  margin-top: 15px;
}
</style>
