<template>
    <div>
         <el-input placeholder="请输入内容(目前未实现)" v-model="criteria">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="普通用例" value="1"></el-option>
              <el-option label="自动化用例" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="search" @search="search"></el-button>
        </el-input>
        <p>现在普通测试用例共有：{{generalNum}} 条，自动化测试用例：{{autoTestNum}} 条，自动化测试用例覆盖率 {{rate}}%</p>
        <el-table
                :data="tableData"
                max-height="500"
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
                    width="100">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="123">
                <template scope="scope">
                    <el-button @click="editItem(scope.$index, tableData)" type="primary" icon="el-icon-edit" size="mini"></el-button>
                    <el-button @click="deleteItem(scope.$index, tableData)" type="danger" icon="el-icon-delete" size="mini"></el-button>
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

</template>

<script>
    // import Bus from '../eventBus'
    export default {
        data(){
            return {
                generalNum: 0,
                autoTestNum: 0,
                // rate: autoTestNum/generalNum * 100,
                rate: 0,
                tableData: [],
                caseNumUrl: 'http://localhost:8888/case/num',
                caseListUrl: 'http://127.0.0.1:8888/autocase/list',
                uploadUrl: 'http://localhost:8888/autocase/upload',
                caseDelUrl: 'http://localhost:8888/autocase/del',
                criteria: '',
                select: '',
                totalCount: 0,
                pageSize: 10,
                currentPage: 1,
                dialogFormVisible: false,
                form: '',
            }
        },
        mounted () {
            this.loadData();
            this.handleUploadSuccess();
            this.getCaseNum();
        //     Bus.$on('filterResultData', (data) => {
        //         this.tableData = data.data.content;
        //         this.total = data.data.totalPages;
        //         this.pageSize = data.data.size;
        //         console.log(data.data);
        //     });
        },

        methods: {

            dialogVisible: function () {
                this.dialogFormVisible = false;
            },
            getCaseNum: function () {
              this.$axios.get(this.caseNumUrl)
              .then((response) => {
                this.generalNum = response.data.data.generalCaseNum;
                this.autoTestNum = response.data.data.autoTestCaseNum;
                this.rate = (this.autoTestNum / this.generalNum * 100).toFixed(2)
              }).catch(function (response) {
                console.log(response)
              });
            },

            loadData: function () {
                this.$axios.get(this.caseListUrl, {
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
            changePage: function (currentPage) {
                this.currentPage = currentPage;
                this.loadData()
            },
            handelSizeChange: function (pageSize) {
                this.pageSize = 12;
                this.loadData();
            },
            search: function () {

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
            deleteItem(index, data) {
              this.$confirm('此操作将永久删除数据，是否继续?', '提示',{
                confirmButtonText: '确定',
                cancleButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.$axios.get(this.caseDelUrl, {
                    params: {
                    ids: data[index].id
                }
                }).then((response) => {
                  console.log(response)
                  this.loadData()
                }).catch(function (error) {
                console.log(error)});
              }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
              });

              // this.$axios.get(this.caseDelUrl, {
              //   params: {
              //     ids: data[index].id
              //   }
              // }).then((response) => {
              //   console.log(response)
              //   this.loadData()
              // }).catch(function (error) {
              //   console.log(error)
              // });
            },
            filterTag(value, row) {
              return row.platInfo === value;
            }
        }
    }
</script>

<style>
    .table {
        margin-top: 30px;
    }

    .pagination {
        margin-top: 20px;
        /*float: right;*/
        text-align: center;
    }
</style>