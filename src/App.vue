<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import store from '@/store/index'
  import {
    setToken
  } from '@/utils/auth'
  //引入该文件重新走一遍登陆校验流程
  import '@/permission'

export default {
  name: 'App',
  created () {
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store") ) {
          this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
          setToken(this.$store.state.user.token)
      }

      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
          sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      })
    }
}
</script>
