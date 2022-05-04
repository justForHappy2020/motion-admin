<template>
  <div class="dashboard-container">
  <div class="dashboard-text">{{this.$store.state.usedata.nickName}},欢迎回来！</div>
  </div>
</template>

<script>
import store from '@/store/index'
import{
   login
  }from '@/api/dashboard'
  import { getToken } from '@/utils/auth'
export default {
  name: 'dashboard',
   data() {
      return {
        usedata:{
        userld:0,
        phoneNumber:'',
        nickName:'',
        headPortrait:'',
        type:0,
        password:'',
        token:getToken(),
        gender :0,
        intro:'',
        birthday:'',
        createTime:'',
        }
        
      }
    },
    methods: {
        fetchData() {
          this.loading = true
        login(getToken()).then(response => {
         console.log(response.data)
         this.usedata=response.data
        })
      },    
     
    }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
