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
                border
                style="width: 100%"
                class="table">
            <el-table-column
                    fixed
                    prop="id"
                    label="用例ID"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="用例类型"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="testcase"
                    label="用例内容"
                    width="1000">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template scope="scope">
                    <el-button @click="editItem(scope.$index, tableData)" type="text" size="large">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="pagination1"
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

        <db-modal :dialogFormVisible="dialogFormVisible" :form="form" v-on:canclemodal="dialogVisible">
        </db-modal>
    </div>

</template>

<script>
    import DbModal from '../components/DbModal.vue'
    // import DbUpload from './DbUpload.vue'
    import Config from '../assets/js/config.js'

    export default {
        data(){
            return {
                generalNum: 0,
                autoTestNum: 0,
                rate: 0,
                tableData: [],
                uploadUrl: Config.API_URIL + '/case/upload',
                criteria: '',
                select: '',
                totalCount: 0,
                pageSize: 10,
                currentPage: 1,
                dialogFormVisible: false,
                form: '',
            }
        },
        components: {
            DbModal,
            // DbUpload
        },
        mounted () {
            this.loadData();
            this.handleUploadSuccess();
            this.getCaseNum();
        },

        methods: {

            dialogVisible: function () {
                this.dialogFormVisible = false;
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

            loadData: function () {
                this.$axios.get('/case/list', {
                    params: {
                        page: this.currentPage,
                        size: this.pageSize
                    }
                }).then((response) => {
                    this.tableData = response.data.data.content;
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
            }
        }
    }
</script>

<style>
    .table {
        margin-top: 30px;
    }

    .pagination1 {
        margin-top: 10px;
        /*float: center;*/
        text-align:center;
    }
    .upload-file {
        margin-top: 30px;
    }
</style>