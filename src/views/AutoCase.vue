<template>
  <div class="basetable" v-loading="loading" element-loading-text="拼命加载中">
    <div class="selectMenu">
      <el-button type="primary" @click="add">新增</el-button>
    </div>
    <div class="tableMain">
      <p>现在普通测试用例共有：{{generalNum}} 条，自动化测试用例：{{autoTestNum}} 条，自动化测试用例覆盖率 {{rate}}%</p>
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
        class="table">
      <el-table-column
        fixed
        prop="id"
        label="用例ID"
        width="100">
      </el-table-column>
          <el-table-column
                  fiters
                  prop="platInfo"
                  label="平台"
                  width="100"
                  :filters="[{ text: 'APP', value: 'APP' }, { text: 'WEB', value: 'WEB' }, { text: 'H5', value: 'H5' }]"
                  :filter-method="filterTag"
                  filter-placement="bottom-end">>
          </el-table-column>
          <el-table-column
                  prop="featureModule"
                  label="功能模块"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="caseNo"
                  label="用例编号"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="description"
                  label="用例描述"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="apiInfo"
                  label="接口路径"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="method"
                  label="请求方式"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="paramsType"
                  label="参数类型"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="params"
                  label="参数内容"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="userInfo"
                  label="User"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="cookie"
                  label="Cookie"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="token"
                  label="Token"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="mysql"
                  label="Mysql"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="mongodb"
                  label="Mongodb"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="redis"
                  label="Redis"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="expectMysql"
                  label="ExpectMysql"
                  width="500">
          </el-table-column>
          <el-table-column
                  prop="expectResponse"
                  label="ExpectResponse"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="clearMysql"
                  label="ClearMysql"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="clearRedis"
                  label="ClearRedis"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="isIgnore"
                  label="Ignore"
                  width="100%">
          </el-table-column>
          <el-table-column
                  fixed="right"
                  label="操作"
                  width="140%">
              <template scope="scope">
                  <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit" size="small"></el-button>
                  <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" icon="el-icon-delete" size="small"></el-button>
              </template>
          </el-table-column>
      </el-table>
      <el-pagination class="pagination"
          layout="total, prev, pager, next, jumper"
          :total="totalCount"
          :page-size="pageSize"
          @current-change="changePage"
          @size-change="handelSizeChange">
      </el-pagination>

      <el-upload
        class="upload-file"
        ref="upload"
        :action="uploadUrl"
        :on-success="handleUploadSuccess"
        :beforeUpload="beforeFileUpload"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">注意：文件名需要包含“普通”或者“自动化”关键字，方便区分，且不超过30MB</div>
      </el-upload>
    </div>

    <el-dialog title="用例详情" :visible.sync="dialogFormVisible">

      <el-form :model="caseForm" ref="caseForm" label-width="100px" class="demo-caseForm">
          <el-row>
            <el-col :span="7">
              <el-form-item label="平台分类" prop="platInfo" required>
                <el-select v-model="caseForm.platInfo" placeholder="请选择平台分类">
                  <el-option label="APP端" value="APP"></el-option>
                  <el-option label="WEB端" value="WEB"></el-option>
                  <el-option label="H5端" value="H5"></el-option>
                  <el-option label="核心端" value="核心"></el-option>
                  <el-option label="华夏端" value="华夏"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="功能模块" prop="featureModule" required>
                <el-input v-model="caseForm.featureModule"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="用例编号" prop="caseNo" required>
                <el-input v-model="caseForm.caseNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="7">
              <el-form-item label="请求方式" prop="method" required>
                <el-select v-model="caseForm.method" placeholder="请选择请求方式">
                  <el-option label="GET" value="get"></el-option>
                  <el-option label="POST" value="post"></el-option>
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="参数类型" prop="paramsType">
                <el-input v-model="caseForm.paramsType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="用户信息" prop="userInfo">
                <el-input v-model="caseForm.userInfo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="7">
              <el-form-item label="COOKIE" prop="cookie">
                <el-input v-model="caseForm.cookie"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="TOKEN" prop="token">
                <el-input v-model="caseForm.token"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="忽略本条" prop="isIgnore">
                <el-input v-model="caseForm.isIgnore"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="21">
              <el-form-item label="功能描述" prop="description" required>
                <el-input v-model="caseForm.description"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="21">
              <el-form-item label="接口地址" prop="apiInfo" required>
                <el-input v-model="caseForm.apiInfo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="21">
              <el-form-item label="参数内容" prop="params">
                <el-input v-model="caseForm.params"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="21">
              <el-form-item label="执行SQL" prop="mysql">
                <el-input v-model="caseForm.mysql"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="21">
              <el-form-item label="执行MONGO" prop="mongodb">
                <el-input v-model="caseForm.mongodb"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="21">
              <el-form-item label="执行REDIS" prop="redis">
                <el-input v-model="caseForm.redis"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="21">
              <el-form-item label="SQL检查" prop="expectMysql">
                <el-input v-model="caseForm.expectMysql"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="21">
              <el-form-item label="接口检查" prop="expectResponse">
                <el-input v-model="caseForm.expectResponse"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="21">
              <el-form-item label="清除SQL" prop="clearMysql">
                <el-input v-model="caseForm.clearMysql"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="21">
              <el-form-item label="清除REDIS" prop="clearRedis">
                <el-input v-model="caseForm.clearRedis"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

      <!-- <case-form ></case-form> -->
      <div align="center" slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm()">修 改</el-button>
        <el-button type="primary" @click="addcaseForm()">新 增</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script >
// import CaseForm from '../views/autocaseForm.vue'

import Testerhome from '../assets/js/testerhome.js'
import Config from '../assets/js/config.js'
import axios from 'axios'

export default {
  // components: {CaseForm},
  prop: ["isSuccess"],
  data() {
    return {
      generalNum: 0,
      autoTestNum: 0,
      caseForm: {},
      rate: 0,
      tableData: [],
      uploadUrl: Config.API_URIL+'/autocase/upload',
      criteria: '',
      select: '',
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      dialogFormVisible: false,
      loading: true,
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false
    }, 1500)
  },

  mounted () {
    this.loadData();
    this.handleUploadSuccess();
    this.getCaseNum();
  },


  methods: {
    loadData: function () {
      this.$axios.get('/autocase/list', {
        params: {
            page: this.currentPage,
            size: this.pageSize
        }
      }).then((response) => {
        this.tableData = response.data.data.content;
        // this.tableData.push('"loading":true')
        this.totalCount = response.data.data.totalElements;
        this.pageSize = response.data.data.size;
      }).catch(function (response) {
          console.log(response)
      });
    },

    getCaseNum: function () {
      this.$axios.get('/case/num')
      .then((response) => {
        this.generalNum = response.data.data.generalCaseNum;
        this.autoTestNum = response.data.data.autoTestCaseNum;
        this.rate = (this.autoTestNum / this.generalNum * 100).toFixed(2)
      }).catch(function (response) {
        console.log(response)
      });
    },

    changePage: function (currentPage) {
      this.currentPage = currentPage;
      this.loadData()
    },

    handelSizeChange: function (pageSize) {
      this.pageSize = 12;
      this.loadData();
    },

    filterTag(value, row) {
      return row.platInfo === value;
    },

    submitUpload() {
        this.$refs.upload.submit()
      },
    handleUploadSuccess(response) {
      this.loadData()
    },

    beforeFileUpload(file){
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      if (!extension && !extension2) {
        alert("格式不对!")
        return false
      }
      return true
    },

    showTime() {
      this.$alert(this.value6, '起止时间', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: '已显示'
          })
        }
      })
    },

    add() {
      this.caseForm = {}
      this.dialogFormVisible = true
      // this.$axios.post(this.caseAddUrl, this.caseForm)
      //   .then(function(response){
      //     console.log(response)
      //   })
      //   .catch(function(error) {
      //     console.log(error)
      // })
    },
    submitForm() {
      // this.form.date = reformat(this.form.date)
      // this.tableData.push(this.caseForm)
      this.$axios.post('/autocase/modify', this.caseForm)
        .then(function(response){
          console.log(response.data)
          alert("修改用例成功")
        })
        .catch(function(error) {
          console.log("===error===: "+error)
          alert("修改用例失败！")
      })
      // if(response.data.message == "success"){
      //   this.$message({
      //     type: 'info',
      //     message: '修改用例成功'
      //   })
      // }
      // console.log("======"+this.isSuccess)
      // if(this.isSuccess) {
      //   this.$message({
      //     type: 'info',
      //     message: '修改用例成功'
      //   })
      // } else {
      //   this.$message({
      //     type: 'info',
      //     message: '修改用例失败'
      //   })
      // }
      this.dialogFormVisible = false
      // this.isSuccess = false
    },
    addcaseForm() {
      this.$axios.post('/autocase/add', this.caseForm)
        .then(function(response){
          console.log(response)
          alert("添加用例成功")
        })
        .catch(function(error) {
          alert("添加用例失败")
      })

      this.dialogFormVisible = false
    },
    handleEdit(index, row) {
      this.caseForm = row
      this.currentIndex = index
      this.dialogFormVisible = true
      this.submitButtonVisible = false
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
          this.$axios.get('/autocase/del', {
            params: {
            ids: row.id
          }
        }).then((response) => {
            console.log(response)
        }).catch(function (error) {
            this.$message({
              type: 'info',
              message: '删除失败,error: ' + error
            })
            console.log(error)})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    cancel() {
      this.dialogFormVisible = false
    },
  },
}
</script>

<!-- <style lang="scss">
.basetable {
  .selectMenu {}
  .tableMain {
    margin: {
      top: 10px;
    }
  }
  .page {
    float: right;
    margin: {
      top: 10px;
    }
  }
}
</style>
 -->