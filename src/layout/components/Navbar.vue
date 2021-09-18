<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="this.usedata.headPortrait" class="user-avatar">
          <!-- <img :src="this.headPortrait" class="user-avatar"> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item @click.native="dialoga">帮助与反馈</el-dropdown-item>
          
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> 
      <el-dialog width=90% title="帮助与反馈" :visible.sync="dialogFormVisible">
            <div class="height_action">为了更好帮您解决问题，请务必先查看以下常见问题的解答</div>
            <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="cardtext carditem">{{'列表内容 ' + o }} </div></el-card>
        </el-dialog>  
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import store from '@/store/index'
import { removeToken } from '@/utils/auth'
import{
   login
  }from '@/api/dashboard'
  import{sendFeedback}from'@/api/navbar'
  import { getToken } from '@/utils/auth'
export default {
   data() {
      return {
        dialogFormVisible: false,
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
        },
        sendFeedback:{
          token:getToken(),
          feedbackContent:'',
          feedbackQQ:'',
          feedbackImg:''
        }
        
      }
    },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'headPortrait'
    ])
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
         this.usedata=response.data
        })
      },   
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    dialoga(){
          this.dialogFormVisible=true
    },
    async logout() {
      // await this.$store.dispatch('user/logout')
      
      //令vuex中的数据为空，这样页面刷新时就不会重新存到session
      //见app.vue中的相关逻辑
      await this.$store.state == null
      await removeToken()
      await sessionStorage.removeItem("store");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    //帮助与反馈的样式
    .height_action{
      height: 50px;
}
  .cardtext {
    font-size: 14px;
  }

  .carditem {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
