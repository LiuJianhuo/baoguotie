<template>
  <div class="zhixing">
    <div class="top">
      <input class="input" v-model="searchVal" placeholder="请输入需要搜索的内容">
      <button class="btn-1">搜索</button>
      <button class="btn-2" @click="outerVisible=true; id()">新增执行报备</button>
    </div>
    <div class="center">
      <div class="center-1">
        <div>客户名称</div>
        <div>联系方式</div>
        <div>投放城市</div>
        <div>投放网点</div>
        <div>投放日期</div>
        <div>投放数量</div>
        <div>印刷物流证明</div>
        <div>图片证明</div>
        <div>视频证明</div>
        <div>报备时间</div>
      </div>
      <div class="center-2">
        <ul v-for="(item, index) in list" :key="item.id">
          <li>
            <div>{{item.username}}</div>
            <div>{{item.phone || '--'}}</div>
            <div>{{item.province}} {{item.city}}</div>
            <div>{{item.dot}}</div>
            <div>{{item.dttime}}</div>
            <div>{{item.number}}</div>
            <div>
              <el-image
                style="width: 120px; height: 63px"
                :src="item.headpic"
                :preview-src-list="[item.headpic, item.headpic1]">
              </el-image>
            </div>
            <div>
              <el-image
                @click="handleGetPicList('contract', index, item)"
                style="width: 120px; height: 63px"
                :src="(item.contractimg && typeof item.contractimg === 'object') ? item.contractimg[0] : item.contractimg"
                :preview-src-list="(item.contractimg && typeof item.contractimg === 'object') ? item.contractimg : [item.contractimg]">
              </el-image>
            </div>
            <div>
              <!-- <el-image
                style="width: 120px; height: 63px"
                :src="item.executeimg"
                :preview-src-list="[item.executeimg]">
              </el-image> -->
              <video v-if="item.executeimg"
                style="width: 120px; height: 63px"
                :src="item.executeimg" controls>
              </video>
            </div>
            <div>{{item.createTime}}</div>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog :visible.sync="outerVisible">
      <div class="zhixing-1">
        <p class="p1">执行报备</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="客户名称" prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入客户名称"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号" v-pure-number></el-input>
          </el-form-item>
          <div><span class="c-red">*</span>投放城市</div>
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
          <div>
            <el-form-item label="投放日期" prop="dttime">
              <el-col :span="10">
                <el-date-picker type="date" placeholder="请选择投放日期" v-model="ruleForm.dttime" style="width: 85%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-col>
            </el-form-item>
          </div>
          <el-form-item label="投放数量" prop="number">
            <el-input v-model="ruleForm.number" placeholder="请输入投放数量"></el-input>
          </el-form-item>
          <div class="dhv clearfix">
            <div class="hjdiv clearfix">印刷物流证明</div>
          </div>
          <div class="hbdfbvdf">
            <el-upload
              class="avatar-uploader"
              :action="actions.uploadHeadPotrait + '&bindId=' + userid"
              :show-file-list="false"
              accept="image/*"
              :on-error="err => handleUplaodError('print', file)"
              :on-success="(res, file) => handleUploadSuccess('print', file, res)"
              :before-upload="(file) => handleUploadBefore('print', file)">
              <img v-if="uploadUrls.print" :src="uploadUrls.print" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon append-word yinshua"></i>
              <div class="loading" v-loading="loading.print" element-loading-text="拼命上传中"></div>
            </el-upload>
            <el-upload
              class="avatar-uploader wuliu"
              :action="actions.uploadHeadPotrait1 + '&bindId=' + userid"
              :show-file-list="false"
              accept="image/*"
              :on-success="(res, file) => handleUploadSuccess('logistics', file, res)"
              :on-error="err => handleUplaodError('logistics', file)"
              :before-upload="file => handleUploadBefore('logistics', file)">
              <img v-if="uploadUrls.logistics" :src="uploadUrls.logistics" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon append-word wuliu"></i>
              <div class="loading" v-loading="loading.logistics" element-loading-text="拼命上传中"></div>
            </el-upload>
          </div>
          <div class="sdivb clearfix">投放证明</div>
          <div class="drvdfvb clearfix">1、图片证明</div>
          <div class="hbdfbvdf action-box">
            <!-- 1-3 -->
            <el-upload
              :action="actions.uploadHeadPotrait3 + '&bindId=' + userid"
              :on-success="(res, file) => handleUploadSuccess('certificater1', file, res)"
              :on-remove="handleRemove"
              multiple
              accept="image/*"
              :limit="3"
              list-type="picture-card"
              :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus append-word front-pic" ></i>
              <!-- <el-button class="" size="small" type="primary">点击上传</el-button> -->
            </el-upload>
          </div>
          <div class="hbdfbvdf action-box">
            <!-- 3-10 -->
            <el-upload
              :action="actions.uploadHeadPotrait3 + '&bindId=' + userid"
              :on-success="(res, file) => handleUploadSuccess('certificater2', file, res)"
              :on-remove="handleRemove"
              multiple
              accept="image/*"
              :limit="10"
              list-type="picture-card"
              :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus append-word copy-paste"></i>
              <!-- <el-button class="" size="small" type="primary">点击上传</el-button> -->
            </el-upload>
          </div>
          <div class="hbdfbvdf action-box">
            <!-- 3-10 -->
            <el-upload
              :action="actions.uploadHeadPotrait3 + '&bindId=' + userid"
              :on-success="(res, file) => handleUploadSuccess('certificater3', file, res)"
              :on-remove="handleRemove"
              multiple
              accept="image/*"
              :limit="10"
              list-type="picture-card"
              :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus append-word order"></i>
              <!-- <el-button class="" size="small" type="primary">点击上传</el-button> -->
            </el-upload>
          </div>
          <div class="drvdfvb clearfix">2、视频证明</div>
          <div class="hbdfbvdf">
            <el-upload
              class="avatar-uploader"
              accept="video/mp4,audio/mp4"
              :action="actions.uploadVideo + '&bindId=' + userid"
              :show-file-list="false"
              :on-success="(res, file) => handleUploadSuccess('video', file, res)"
              :on-error="err => handleUplaodError('video', file)"
              :before-upload="file => handleUploadBefore('video', file)">
              <!-- <img v-if="imageUrl3" :src="imageUrl3" class="avatar"> -->
              <video v-if="uploadUrls.video" :src="uploadUrls.video" class="video" controls="controls"></video>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="loading" v-loading="loading.video" element-loading-text="拼命上传中"></div>
            </el-upload>
          </div>
          <el-form-item>
            <el-button class="submit-btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import actions from '../../config/ima'
import { getRegionList, getProvinceListFromRegionName, getCityListFromProvinceName, getAreaListFromCityName } from '@/components/uitl/jsAddress.js'

import { getProvinceMap, getCityMap, getRegionMap } from '@/components/uitl/china-location'
import { deletePic, getPicList, createUserId, getUserList, userRegister } from '@/api/index'

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
      searchVal: '',
      provinceList: null,
      cityList: null,
      actions,
      imageUrl1: '',
      userid: '',
      formatTime: '',
      list: '',
      provinceMap: getProvinceMap(), // 省份
      cityMap: null, // 城市
      centerDialogVisible: false,
      outerVisible: false,
      uploadUrls: {
        logistics: '', // 印刷物流
        print: '', // 印刷物流
        video: '',
        certificater1: [],
        certificater2: [],
        certificater3: []
      },
      loading: { // 用于上传图片是否显示上传中，动画效果
        logistics: false,
        print: false,
        video: false
      },
      ruleForm: {
        username: '',
        city: '',
        dttime: '',
        number: '',
        // dttime1: '',
        province: '',
        dot: '',
        phone: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入投放数量', trigger: 'blur' }
        ],
        dttime: [
          { required: true, message: '请输入投放日期', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入投放城市', trigger: 'blur' }
        ],
        dot: [
          { required: true, message: '请输入投放网点', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    handleGetPicList (findex, index, { id, contractimg }) {
      if (!contractimg) return
      if (typeof contractimg === 'object') return
      getPicList({
        findex,
        bindId: id
      }).then(data => {
        this.list[index].contractimg = data && data.map(({ url }) => {
          return url
        })
        console.log(this.list[index].contractimg)
      }).catch(err => {
        console.log(err)
      })
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
        userType: 3,
        region: region,
        page: 1,
        row: 10
      }).then(data => {
        console.log('这是执行报备数据')
        console.log(data)
        this.list = data.list
        console.log(this.list)
      }).catch(err => {
        console.log('执行报备列表失败：' + err.message)
      })
    },
    // 上传前
    handleUploadBefore (type, file) {
      if (this.userid) {
        // 上传失败，显示上传中提示
        this.loading[type] = true
        return
      }
      this.$message({
        typ: 'error',
        message: '上传失败,请重新上传',
        duration: 900
      })
      return false
    },
    // 上传成功
    handleUploadSuccess (type, file, res) {
      console.log('====')
      // console.log(file)
      // console.log(this.uploadUrls[type])
      console.log(res)
      console.log(file)
      // 上传成功，隐藏上传中提示
      if (this.loading[type]) this.loading[type] = false
      // certificater1: '',
      //   certificater2: '',
      //   certificater3: ''
      if (type && type.indexOf('certificater') > -1) {
        this.uploadUrls[type].push({ uid: file.uid, fileId: res.data.id })
      } else {
        this.uploadUrls[type] = URL.createObjectURL(file.raw)
      }
    },
    handleUplaodError (type, file) {
      // 上传失败，隐藏上传中提示
      if (this.loading[type]) this.loading[type] = false
    },
    handleRemove ({ uid }, fileList) {
      const { certificater3, certificater1, certificater2 } = this.uploadUrls
      const list = [...certificater3, ...certificater1, ...certificater2]
      list.forEach(item => {
        if (item.uid === uid) {
          console.log(item.fileId)
          deletePic(item.fileId).then(data => {
            console.log('删除成功')
          }).catch(Err => {
            this.$notify('删除失败')
          })
        }
      })
      // if (file) return
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      const isJPG = true
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    id () {
      // 用户id 存在，就没必要重新在创建
      if (this.userid) return
      createUserId().then(data => {
        console.log('=============')
        console.log(data)
        this.userid = data
      }).catch(err => {
        console.log('执行报备用户id失败：' + err.message)
      })
    },
    submitForm (formName) {
      // this.$message({ message: '提交成功', type: 'success', duration: 900 })
      // 印刷证明 物流证明必须上传
      //  logistics: '', // 印刷物流
      //   print: '', // 印刷物流
      //   video: '',
      //   certificater1: '',
      //   certificater2: '',
      //   certificater3: ''
      const { logistics, print } = this.uploadUrls
      if (!logistics) {
        this.$notify({
          title: '请上传印刷物流',
          type: 'error'
        })
        return
      }
      if (!print) {
        this.$notify({
          title: '请上传印刷物流',
          type: 'error'
        })
        return
      }
      this.$refs[formName].validate((valid) => {
        const region = localStorage.getItem('region')
        if (valid) {
          console.log(this.$refs[formName])
          userRegister({
            username: this.ruleForm.username,
            city: this.ruleForm.city,
            province: this.ruleForm.province,
            dot: this.ruleForm.dot,
            dttime: this.ruleForm.dttime,
            phone: this.ruleForm.phone,
            region: region,
            number: this.ruleForm.number,
            state: 0,
            userType: 3,
            id: this.userid
          }).then(data => {
            this.outerVisible = false
            this.$message({ message: '提交成功', type: 'success', duration: 900 })
            this.getList()
          }).catch(err => {
            console.log('执行报备注册失败：' + err.message)
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
.action-box {
  .el-upload--picture-card {
    width: 60px;
    height: 60px;
    line-height: 60px;
    position: relative;
    i {
      font-size: 18px;
    }
  }
  .el-upload-list--picture-card {
    .el-upload-list__item {
      width: 60px;
      height: 60px;
    }
  }
}
.el-select {
  width:30%;
}
.clearfix:after,
.clearfix:before{
  content: "";
  display: table;
  }
  .clearfix:after{
    clear: both;
    }
    .clearfix{
      *zoom: 1;
      }
.avatar-uploader {
  &.wuliu {
    .el-upload {
      margin-left: 15px;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  float: left;
}
.zhixing-1 {
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
  .submit-btn {
    margin-top: 15px;
    &.el-button--primary {
      width:370px;
      height:60px;
      background:rgba(229,1,19,1);
      border-radius:32px;
      margin-bottom: 40px;
    }
  }

}
</style>

<style lang="less" scoped>
.dialog-footer {
  margin-bottom: 40px;
}
.hbdfbvdf {
  width: 100%;
  // height: 180px;
  height: 133px;
  &.action-box {
    height: auto;
    padding-bottom: 5px;
  }
}
.p1 {
  text-align: center;
}
.dhv {
  height: 40px;
}
.zhixing {
  width: 100%;
  padding: 70px 10px;
  box-sizing: border-box;
  min-height: 100%;
  // height: 100%;
  background-color: #fff;
  // margin: 0 auto;
  .zhixing-1 {
    width: 470px;
    // text-align: center;
    height: 100%;
    margin: 0 auto;
    padding-top: 30px;
    p{
      font-size:30px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:42px;
      margin-bottom: 40px;
    }
    .hjdiv {
      font-size:18px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(68,65,65,1);
      line-height:18px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    .sdivb {
      font-size:18px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(68,65,65,1);
      line-height:25px;
      margin: 20px 0;
    }
    .drvdfvb {
      // display: block;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(135,136,137,1);
      line-height:20px;
      margin-bottom: 15px;
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
.append-word {
  &::after {
    position: absolute;
    display: block;
    // content: '物流证明';
    top: 50%;
    left: 50%;
    margin-top: 3px;
    text-align: center;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    width: 100px;
    margin-left: -50px;
    color: #a7a6a6;
  }
  &.wuliu {
    &::after {
      content: '物流证明';
    }
  }
  &.yinshua {
    &::after {
      content: '印刷证明';
    }
  }
  &.front-pic {
    &::after {
      font-size: 12px;
      content: '正面特写';
    }
  }
  &.copy-paste {
    &::after {
      font-size: 12px;
      content: '正在粘贴';
    }
  }
  &.order {
    &::after {
      font-size: 12px;
      content: '堆积排列';
    }
  }
}
.video {
  width: 130px;
  height: 130px;
}
</style>
