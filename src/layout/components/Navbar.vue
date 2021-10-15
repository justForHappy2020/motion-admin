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
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> 
     

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
  import{sendFeedback,getFeedback,getFeedbackById}from'@/api/navbar'
  import { getToken } from '@/utils/auth'
export default {
   data() {
      return {
        list: [],
        dialogTableVisible:false,
        dialogFormVisible: false,
        dialogTableVisible2 :false,
        page:1 , //当前页
        size:10   ,//每页展示的条数
        total:null,   //数据总量
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
      
         transformPhoto:{
          file:null,
          token:getToken()
        },
        
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
        this.fetchMydata()
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
        upload_imgs(response){
         this. sendFeedbacks. feedbackImg=response.data
      },
    sendFeed(){
      sendFeedback(this.sendFeedbacks).then(response=>{
        console.log(response)
        console.log(this.sendFeedbacks)
        this.dialogFormVisible = false
      })
    },
     submitUpload() {
      this.$refs.upload.submit();
    },
      // 分页
      handleSizeChange(size) {
              // console.log(`每页 ${size} 条`);
              this.size = size;
              this.fetchData();
            },
      handleCurrentChange(page) {
              // console.log(`当前页: ${page}`);
              this.page = page;
              this.fetchData();
            },
  
    handleEdit(row){
        this.feedbacks=JSON.parse(JSON.stringify(row));
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
.height_action_leg{
  height: 25px;
}
  .cardtext {
    font-size: 14px;
  }

  .carditem {
    padding: 18px 0;
  }
.inputsize{
  width: 38%;
}
  .pagination-container{
    display: flex;
    justify-content: center;
    margin: 20px 0;
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
