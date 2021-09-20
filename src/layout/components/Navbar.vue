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
           <el-dropdown-item @click.native="dialogmy">我的反馈</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> 

      <!-- 添加反馈弹窗 -->
      <el-dialog width=70% title="帮助与反馈" :visible.sync="dialogFormVisible">
            <div class="height_action">为了更好帮您解决问题，请务必先查看以下常见问题的解答</div>
            <a target="_blank" href="https://docs.qq.com/doc/DRWVxU2RyVmhBYkJu">
             <el-button type="success" >查看常见问题</el-button>
          </a> 
            <div class="height_action">若以上解答不能解答您的问题，或者您有什么建议可以在下方的反馈中告诉我们</div>
           <el-input
             type="textarea"
             :autosize="{ minRows: 4, maxRows: 8}"
             placeholder="请输入内容"
              v-model="sendFeedbacks.feedbackContent">
            </el-input>
             <div class="height_action_leg"></div>
                <el-upload auto-upload=false limit=1 
                  action="http://106.55.25.94:8080/api/user/modifyHptIos"
                  :data="transformPhoto"
                  name="headPortrait"
                  :on-success="upload_imgs" 
                  list-type="picture-card"
                   :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            <el-input placeholder="如需联系，请留下您的QQ~" class="inputsize" v-model="sendFeedbacks.feedbackQQ"></el-input>
             <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" @click="sendFeed()" >发送反馈</el-button>
                <!-- <el-button type="success" @click="disabledChange">修改</el-button> -->
              </el-col>
              <el-col :span="5">
                <el-button @click="dialogFormVisible = false">取消</el-button>
              </el-col>
            </el-row>
        </el-dialog> 
        <!-- 我的反馈弹窗  -->
          <el-dialog width=70% title="我的反馈" :visible.sync=" dialogTableVisible">   
    <el-table v-loading="listLoading" :data="list" border style="width: 100%">
          <el-table-column fixed prop="feedbackId" label="编号" width="150">
          </el-table-column>
          <el-table-column prop="content" label="内容" width="450">
          </el-table-column>
          <el-table-column  prop="picUrls" label="图片" width="120">
            <template slot-scope="scope">
            　　      <img :src="scope.row.picUrls" width="40" height="40" />
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="反馈时间" width="190">
          </el-table-column>
           <el-table-column label="操作" width="113">
            <template slot-scope="scope">
              <el-button size="mini"  @click="dialogTableVisible2 = true;handleEdit(scope.row);">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
         <div class="pagination-container">
           <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 30, 50, 80, 100, 150, 200]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
           </el-pagination>
        </div>
   <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="10">
                <el-button @click="dialogTableVisible = false">取消</el-button>
              </el-col>
            </el-row>
        </el-dialog> 
        <!-- 查看详情的弹窗 -->
      <el-dialog width=70% title="详细反馈信息" :visible.sync=" dialogTableVisible2" :data="list" >   
          <div class="demo-input-suffix">
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3 >反馈内容:</h3>
              </el-col>
              <el-col :span="7">
                    <div style="height:15px"></div>
                    <div class="height_action_leg">{{feedbacks.content}}</div>
              </el-col>
            </el-row>
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>反馈图片:</h3>
              </el-col>
              <el-col :span="7">
                <!-- <el-upload auto-upload=false limit=1 
                 action="http://106.55.25.94:8080/api/user/modifyHptIos"
                  :data="transformPhoto"
                  name="headPortrait"
                  :on-success="change_imgs" 
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                  :file-list="show_img">
                  <i class="el-icon-plus"></i>
                </el-upload> -->
                 <el-image
      style="width: 100px; height: 100px"
      :src="feedbacks.picUrls"
      :fit="fit"></el-image>
              </el-col>
            </el-row>
            <el-row :gutter="10" padding="30px">
              <el-col :span="3">
                <h3>当前解决进度:</h3>
              </el-col>
              <el-col :span="5" >
                <div style="height:15px"></div>
                <div ><span >{{ this.feedbacks.ifSolve=== 1 ? "已解决" : "未解决" }}</span></div>
                <!-- <div class="height_action_leg"></div>
                 <el-radio-group v-model="feedbacks.ifSolve ">         
                <el-radio :label="1">已解决</el-radio>
                <el-radio :label="0">未解决</el-radio> </el-radio-group>  -->
              </el-col>
            </el-row>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3 >QQ号码:</h3>
              </el-col>
              <el-col :span="7">
                <div style="height:15px"></div>
                    <div class="height_action_leg">{{feedbacks.qqnumber}}</div>
               
              </el-col>
            </el-row>
         
          </div>
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
        sendFeedbacks:{
          token:getToken(),
          feedbackContent:'',
          feedbackQQ:'',
          feedbackImg:''
        },
        feedbacks:{
          feedbackId:0,
          userld:0,
          content:'',
          picUrls:'',
          createTime:'',
          ifSolve:0,
          qqnumber:'',
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
    dialoga(){
          this.dialogFormVisible=true
    },
    dialogmy(){
          this.dialogTableVisible=true
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
    // 获取我的反馈
    fetchMydata() {
        this.listLoading = true
        getFeedback(getToken(),this.page,this.size).then(response => {
          console.log(response.data)
           this.list = response.data.myFeedbackList
           this.listLoading = false
        })
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
