<template>
  <div class="upload-block">
  <el-upload
    class="upload-file"
    ref="upload"
    :action="uploadUrl"
    :on-remove="handleRemove"
    :on-success="handleUploadSuccess"
    :beforeUpload="beforeFileUpload"
    :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过30MB</div>
  </el-upload>
</div>
</template>

<script>
  export default {
    data () {
      return {
        uploadUrl: 'http://10.10.137.242:8888/case/upload'
      }
    },
    name: 'db-upload',
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleUploadSuccess(file) {
        console.log(file);
      },
      beforeFileUpload(file){
        const extension = file.name.split('.')[1] === 'xls'
        const extension2 = file.name.split('.')[1] === 'xlsx'
        if (!extension && !extension2) {
          console.log('格式不对')
          return false
        }
        return true
      }
    }
  }
</script>

<style>
    .upload-block {
        height: 70px;
        width: 100%;
        top: 20;
        left: 0;
        padding: 0 20px;
        z-index: 1;
        box-sizing: border-box;
        margin: 20px 20 20 20px;
    }

    .text-logo {
        display: inline-block;
        vertical-align: middle;
        border-style: none;
        position: relative;
        top: 26px;
        right: -20px;
        font-size: 25px;
        color: white;

    }

    .meta {
        color: #7e95c5;
        width: 200px;
        display: block;
        margin: -5px 0 0 225px;
        font-weight: 700;
        font-size: 0.3rem;
    }
</style>