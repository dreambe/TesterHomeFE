<template>
  <div>
    <p>页面完善中···1</p>
    <p>页面完善中···1</p>
    <p>页面完善中···</p>
    <el-button @click="test" type="text" size="large">TEST</el-button>
  </div>
</template>

<script>

  import Testerhome from '../assets/js/testerhome.js'
  import Config from '../assets/js/config.js'
  import axios from 'axios'
  // import Axios from '../assets/js/axios.js'

// axios.defaults.baseURL = Config.API_URIL
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


  export default {
    methods : {
      test() {
        axios.get('/autocase/list')
          .then(response => {
            console.log(response)
          }).catch(error =>{
            console.log(error)
          })
      }
    }
    // test() {
    //   this.$axios.get('/example/baner_settings')
    //    .then(response => {
    //     console.log(response)
    //    }) .catch(error => {
    //     console.log(error)
    //    })
    // }
  }

</script>