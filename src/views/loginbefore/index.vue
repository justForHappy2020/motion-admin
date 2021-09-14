<template>
    <div>HHH</div>
</template>
<script>
  import{
   login
  }from '@/api/loginbefore'
   import { getToken } from '@/utils/auth'
    export default {
    data() {
      return {
        loading:false,
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
        birthday:datetime,
        createTime:datetime,
        }
        
      }
    },
    created() {
        this.fetchData()
        console.log('HHH')
    },
    methods: {
        fetchData() {
          this.loading = true
        login(getToken()).then(response => {
         console.log(response.data)
        })
      },    
     
    }
    
  }
</script>
