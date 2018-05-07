<template>
  <div>
        <el-form :model="caseForm" ref="caseForm" label-width="100px" class="demo-caseForm">
          <el-row>
            <el-col :span="7">
              <el-form-item label="平台分类" prop="platInfo" required>
                <el-select v-model="caseForm.platInfo" placeholder="请选择平台分类">
                  <el-option label="APP端" value="APP"></el-option>
                  <el-option label="WEB端" value="WEB"></el-option>
                  <el-option label="H5端" value="H5"></el-option>
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
  </div>
</template>

<script>
  export default {
    props: ['caseForm'],
    // data() {
    //   return {
    //     caseForm: {
    //       platInfo: '',
    //       featureModule: '',
    //       caseNo: '',
    //       description: '',
    //       apiInfo: '',
    //       method: '',
    //       paramsType: '',
    //       params: '',
    //       userInfo:'',
    //       cookie: '',
    //       token: '',
    //       isIgnore: '',
    //       mysql: '',
    //       mongodb: '',
    //       redis: '',
    //       expectMysql: '',
    //       expectResponse: '',
    //       clearMysql: '',
    //       clearRedis: '',
    //     },

    //   }
    // },

    // method: {
    //   add() {
    //   this.caseForm = {}
    //   this.dialogFormVisible = true
    //   // this.$axios.post(this.caseAddUrl, this.caseForm)
    //   //   .then(function(response){
    //   //     console.log(response)
    //   //   })
    //   //   .catch(function(error) {
    //   //     console.log(error)
    //   // })
    //   },
    //   submitForm() {
    //     // this.form.date = reformat(this.form.date)
    //     // this.tableData.push(this.caseForm)
    //     this.$axios.post(this.caseEditUrl, this.caseForm)
    //       .then(function(response){
    //         console.log(response)
    //         this.isResultOk = true
    //       })
    //       .catch(function(error) {
    //         console.log(error)
    //     })
    //     console.log("======"+this.isResultOk)
    //     if(this.isResultOk) {
    //       this.$message({
    //         type: 'info',
    //         message: '修改用例成功'
    //       })
    //     } else {
    //       this.$message({
    //         type: 'info',
    //         message: '修改用例失败'
    //       })
    //     }
    //     this.dialogFormVisible = false
    //     this.isResultOk = false
    //   },
    //   addcaseForm(targetUrl) {
    //     this.targetUrl = targetUrl
    //     this.$axios.post(this.targetUrl, this.caseForm)
    //       .then(function(response){
    //         console.log(response)
    //         this.$message({
    //           type: 'info',
    //           message: '添加用例成功'
    //         })
    //       })
    //       .catch(function(error) {
    //         console.log(error)
    //         this.$message({
    //           type: 'info',
    //           message: '添加用例失败,error: ' + error
    //         })
    //     })
    //   },
    //   handleEdit(index, row) {
    //     this.caseForm = row
    //     this.currentIndex = index
    //     this.dialogFormVisible = true
    //     this.submitButtonVisible = false
    //   },
    //   handleDelete(index, row) {
    //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       this.tableData.splice(index, 1)
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功!'
    //       })
    //         this.$axios.get(this.caseDelUrl, {
    //           params: {
    //           ids: row.id
    //         }
    //       }).then((response) => {
    //           console.log(response)
    //       }).catch(function (error) {
    //           this.$message({
    //             type: 'info',
    //             message: '删除失败,error: ' + error
    //           })
    //           console.log(error)})
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    //   },
    //   cancel() {
    //     this.dialogFormVisible = false
    //   },
    // // }
  }
</script>