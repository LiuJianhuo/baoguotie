<template>
  <div class="kehu">
    <div class="top">
      <input class="input" v-model="searchForm.username" placeholder="请输入需要搜索的内容">
      <button class="btn-1" @click="handleSearch">搜索</button>
      <button class="btn reset-btn" @click="handleResetSearch">重置</button>
      <button class="btn-2" @click="outerVisible=true; id()">新增客户报备</button>
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
        <div>报备时间</div>
        <!-- <div>合约金额</div>
        <div>合同影印件</div> -->
      </div>
      <div class="center-2">
        <ul v-for="item in list" :key="item.id">
          <li>
            <div>{{item.username}}</div>
            <div>{{item.phone}}</div>
            <div>{{item.ctprice}}</div>
            <div>{{item.ctsource}}</div>
            <div>{{item.province}} {{item.city}}</div>
            <div>{{item.dot}}</div>
            <!-- <div>{{item.startTime}}到{{item.endTime}}</div> -->
            <div><div style="line-height: 20px;margin-top: 13px;border: none;">{{item.startTime}}到{{item.endTime}}</div></div>
            <div>{{item.number}}</div>
            <div>{{item.createTime}}</div>
            <!-- <div>{{item.price}}</div>
            <div><img :src="item.contractimg" alt=""></div> -->
          </li>
        </ul>
      </div>
      <el-pagination
        class="pagination"
        @current-change="handlePageNumChange"
        :current-page="searchForm.page"
        :page-size="searchForm.row"
        background
        layout="total, prev, pager, next, jumper"
        :total="totalPages">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="outerVisible">
      <div class="kehu-1">
        <p>客户报备</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="客户名称" prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入客户名称"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号" v-pure-number></el-input>
          </el-form-item>
          <el-form-item label="客户价格" prop="ctprice">
            <el-input v-model="ruleForm.ctprice" @input="hanldeFormatNumberWithFocus" placeholder="请输入客户价格保留小数点后两位" @blur="handleFormatNumberAfterBlur"></el-input>
          </el-form-item>
          <el-form-item label="客户来源" prop="ctsource" class="custom-from-item">
            <!-- <el-input v-model="ruleForm.ctsource" placeholder="请输入客户来源"></el-input> -->
            <el-select v-model="ruleForm.ctsource" placeholder="请选择客户来源">
              <el-option label="三通一达" value="三通一达"></el-option>
              <el-option label="代理公司" value="代理公司"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="投放城市" prop="city">
            <el-input v-model="ruleForm.city" placeholder="投放城市"></el-input>
          </el-form-item> -->
          <!-- <div class="jfbdv">投放城市</div> -->
          <div class="jfbdv"><span class="c-red">*</span>投放城市</div>
          <el-form-item prop="city">
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
           <el-form-item label="投放周期" prop="lanchCycle">
            <el-col :span="9">
              <el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.startTime" style="width: 83%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>
            <el-col :span="9">
              <el-date-picker type="date" placeholder="选择结束日期" v-model="ruleForm.endTime" style="width: 83%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="投放数量" prop="number">
            <el-input v-model="ruleForm.number" placeholder="投放数量" @input="val => ruleForm.number = val.match(/\d*/)[0]"></el-input>
          </el-form-item>
          <!-- <el-form-item label="投放时间" prop="cycle">
            <el-input v-model="ruleForm.cycle" placeholder="投放时间"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRegionList, getProvinceListFromRegionName, getCityListFromProvinceName, getAreaListFromCityName } from '@/components/uitl/jsAddress.js'
import { getProvinceMap, getCityMap, getRegionMap } from '@/components/uitl/china-location'
import { createUserId, getUserList, userRegister } from '@/api'
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
    // 检查投放周期 结束要不能早于开始， 结束和开始必填
    const checkLanchCycle = (rule, value, callback) => {
      const { startTime, endTime } = this.ruleForm
      if (startTime && endTime) {
        callback(Date.parse(startTime) > Date.parse(endTime) ? new Error('投放结束日期不能早于开始日期') : '')
      }
      if (!startTime && !endTime) {
        return callback(new Error('请选择投放周期'))
      }
      if (!startTime) {
        return callback(new Error('请选择投放开始日期'))
      }
      return callback(new Error('请选择投放结束日期'))
    }
    return {
      regionList: getRegionList(),
      provinceList: null,
      cityList: null,
      centerDialogVisible: false,
      provinceMap: getProvinceMap(), // 省份
      cityMap: null, // 城市
      searchVal: '',
      list: '',
      outerVisible: false,
      ruleForm: {
        username: '',
        city: '',
        phone: '',
        ctprice: '', // 客户价格
        ctsource: '', // 客户来源
        startTime: '',
        endTime: '',
        province: '',
        dot: '',
        number: '',
        cycle: ''
      },
      searchForm: {
        userType: 2,
        username: '',
        region: localStorage.getItem('region'),
        row: 10,
        page: 1
      },
      totalPages: 0, // 总页数
      page: {
        row: 10,
        page: 1
      },
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
        number: [
          { required: true, message: '请输入投放数量', trigger: 'blur' }
        ],
        cycle: [
          { required: true, message: '请输入投放时间', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        lanchCycle: [
          { required: true, validator: checkLanchCycle }
        ]
      }
    }
  },
  created () {
    // this.setDialogWidth()
  },
  mounted () {
    // this.id()
    this.getList()
    // this.generateImgCode()
    window.onresize = () => {
      return (() => {
        // this.setDialogWidth()
      })()
    }
  },
  methods: {
    // 页码改变
    handlePageNumChange (val) {
      this.searchForm.page = val
      this.handleSearch()
    },
    // 搜索
    handleSearch () {
      this.getList()
    },
    // 重置搜索
    handleResetSearch () {
      this.searchForm = Object.assign({}, this.searchForm, this.page, { username: '' })
      this.getList()
    },
    hanldeFormatNumberWithFocus (val) {
      const num = val.match(/^\d+(\.?\d{0,2})/)
      this.ruleForm.ctprice = num && num[0]
    },
    handleFormatNumberAfterBlur () {
      const price = this.ruleForm.ctprice
      this.ruleForm.ctprice = price.endsWith('.') ? price.replace('.', '') : price
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
      getUserList(this.searchForm).then(data => {
        this.list = data.list
        this.totalPages = data.total
        console.log(this.list)
      }).catch(err => {
        console.log('客户报备失败:' + err.message)
      })
    },
    id () {
      if (this.userid) return
      createUserId().then(data => {
        console.log(data)
        this.userid = data
        console.log(this.userid)
      }).catch(err => {
        console.log('创建用户失败:' + err.message)
      })
    },
    submitForm (ruleForm) {
      const startTime = this.ruleForm.startTime
      console.log(startTime)
      console.log(startTime)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // alert('submit!')
          const region = localStorage.getItem('region')
          userRegister({
            username: this.ruleForm.username,
            city: this.ruleForm.city,
            dot: this.ruleForm.dot,
            number: this.ruleForm.number,
            startTime: this.ruleForm.startTime,
            endTime: this.ruleForm.endTime,
            phone: this.ruleForm.phone,
            region: region,
            ctprice: this.ruleForm.ctprice,
            ctsource: this.ruleForm.ctsource,
            state: 0,
            userType: 2,
            id: this.userid
          }).then(data => {
            this.outerVisible = false
            this.getList()
            this.resetRuleForm()
            this.$message({ message: '提交成功', type: 'success', duration: 900 })
          })
        }
      })
    },
    // 重置所填写的信息
    resetRuleForm () {
      const ruleForm = Object.assign({}, this.ruleForm)
      for (const key in ruleForm) {
        ruleForm[key] = null
      }
      this.ruleForm = ruleForm
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    centerDialogVisible1 () {
      this.centerDialogVisible = false
      this.outerVisible = false
      this.ruleForm = ''
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
.custom-from-item {
  .el-form-item__content {
    text-align: left;
  }
  .el-select {
    // display: block;
    width: 100%;
  }
}
.jfbdv {text-align: left;}
.kehu-1 {
  .el-button--primary {
    width:370px;
    height:60px;
    background:rgba(229,1,19,1);
    border-radius:32px;
    // margin-top: 70px;
  }

}
</style>

<style lang="less" scoped>
.kehu {
  width: 100%;
  // height: 100%;
  padding: 70px 10px;
    padding-bottom: 50px;
  padding-top: 10px;
  box-sizing: border-box;
  min-height: 100%;
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
</style>
