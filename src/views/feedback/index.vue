<template>
  <div class="app-container">
    <h1>反馈管理</h1>
    <div class="filter-container">
      <span>
        <h3>反馈筛选</h3>
        <el-row :gutter="10">
          <el-col :span="7">反馈分类
            <el-select v-model="value_type" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="11">上传时间
            <el-date-picker v-model="value_data" type="datetimerange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="5">
            <div>
              <el-input v-model="input" placeholder="请输入反馈标题或关键词"></el-input>
            </div>
          </el-col>
          <el-col :span="1">
            <div>
              <el-button type="primary" icon="el-icon-search">筛选</el-button>
            </div>
          </el-col>
        </el-row>
      </span>
    </div>

    <div class="filter-container">
      <span>
        <el-row :gutter="24">
          <el-col :span="20">
            <div class="grid-content bg-purple">
              <h3><strong>反馈列表</strong></h3>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">
              <el-button type="primary" icon="el-icon-search" @click="dialogTableVisible = true,disabled=true">添加反馈</el-button>
            </div>
          </el-col>
        </el-row>
  <!-- 添加反馈弹窗 -->
      <el-dialog width=70% title="帮助与反馈" :visible.sync="dialogTableVisible">
            <div class="height_action">为了更好帮您解决问题，请务必先查看以下常见问题的解答</div>
            <a target="_blank" href="https://docs.qq.com/doc/DRWVxU2RyVmhBYkJu">
             <el-button type="success" >查看常见问题</el-button>
          </a> 
            <div class="height_action_leg"></div>
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
                  <div class="height_action_leg"></div>
            <el-input placeholder="如需联系，请留下您的QQ~" class="inputsize" v-model="sendFeedbacks.feedbackQQ"></el-input>
             <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" @click="sendFeed()" >发送反馈</el-button>
                <!-- <el-button type="success" @click="disabledChange">修改</el-button> -->
              </el-col>
              <el-col :span="5">
                <el-button @click="dialogTableVisible = false">取消</el-button>
              </el-col>
            </el-row>
        </el-dialog> 
  <!-- 查看详情的弹窗 -->
      <el-dialog width=70% title="详细反馈信息" :visible.sync=" dialogFormVisible" :data="list" >   
          <div class="demo-input-suffix">
              <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3 >反馈用户:</h3>
              </el-col>
              <el-col :span="7">
                    <div style="height:15px"></div>
                    <div class="height_action_leg">{{feedbacks.userId}}</div>
              </el-col>
            </el-row>
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
                <div ><span >{{ feedbacks.ifSolve=== 1 ? "已解决" : "未解决" }}</span></div>
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
           <div class="height_action_leg"></div>
            <div>
              <h3>填写回复</h3>
              <div class="weight_action">
                <el-input type="textarea" :rows="5"  v-model="userfeedback.answer">
                </el-input>
              </div>
            </div>
            <div class="height_action_leg"></div>
              <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" @click="reply();FormVisible();">完成回复</el-button>
              </el-col>
              <el-col :span="5">
                <el-button @click="dialogFormVisible = false">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog> 
<!-- 反馈详情弹窗完毕 -->
        <el-table v-loading="listLoading" :data="list" border style="width: 100%">
          <el-table-column fixed prop="feedbackId" label="编号" width="150">
          </el-table-column>
          <el-table-column  prop="picUrls" label="图片" width="120">
            <template slot-scope="scope">
            　　      <img :src="scope.row.picUrls" width="40" height="40" />
            </template>
          </el-table-column>
           <el-table-column prop="qqnumber" label="QQ" width="130">
          </el-table-column>
            
          <el-table-column prop="content" label="内容" width="210">
          </el-table-column>
          <el-table-column prop="userId" label="反馈用户" width="130">
          </el-table-column>
          <el-table-column prop="createTime" label="反馈时间" width="160">
          </el-table-column>
          <el-table-column prop="ifSolve" label="解决与否" width="130">
          </el-table-column>
           <el-table-column prop="reply" label="回复" width="130">
          </el-table-column>
          <el-table-column label="操作" width="130">
            <template slot-scope="scope">
              <el-button size="mini"  @click="dialogFormVisible = true;handleEdit(scope.row); feedbackId()">查看详情</el-button>
              <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.row.feedbackId)">删除</el-button> -->
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

      </span>
    </div>
  </div>
</template>

<style>
  .filter-container {
    display: flex;
    border: 1px solid #eee;
    padding: 20px;
    margin-bottom: 20px;
  }

  .pagination-container{
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }

  .el-table td,
  .el-table th {
    text-align: center;
  }

.height_action{
  height: 50px;
}
.height_action_leg{
  height: 25px;
}
.weight_action{
  width: 50%;
}
</style>



<script>
  import {
  getUserFeedback,getFeedback,sendFeedback,saveUserFeedback
  } from '@/api/feedback'
import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {
        list: [],
        page:1 , //当前页
        size:10   ,//每页展示的条数
        total:null,   //数据总量
        dialogFormVisible: false,
        dialogTableVisible: false,
        options: [{
          value_tpye: '选项1',
          label: '0'
        }, {
          value_tpye: '选项2',
          label: '1',
        }],
       feedbacks:{
          feedbackId:null,
          userld:0,
          content:'',
          picUrls:'',
          createTime:'',
          ifSolve:0,
          qqnumber:'',
        },
          sendFeedbacks:{
          token:getToken(),
          feedbackContent:'',
          feedbackQQ:'',
          feedbackImg:''
        },
        userfeedback:{
          feedbackId:null, 
          answer:'',
        }
      }
    },
    created() {
      this.fetchData()
      this. fetchMydata() 
     
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    methods: {
      fetchData() {
        this.listLoading = true
         getUserFeedback(this.page,this.size).then(response => {
          this.list = response.data.feedbackList
          this.total = response.data.total
          this.listLoading = false
        //   console.log(this.list)
        })
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
     // 获取反馈详情
    fetchMydata() {
        this.listLoading = true
        getFeedback(getToken(),this.page,this.size).then(response => {
           this.list = response.data.myFeedbackList
           this.listLoading = false
        })
        
           this.fetchData();
      },
    handleEdit(row){
        this.feedbacks=JSON.parse(JSON.stringify(row));
      },
    sendFeed(){
      sendFeedback(this.sendFeedbacks).then(response=>{
        // console.log(response)
        // console.log(this.sendFeedbacks)
        this.dialogTableVisible = false
         this.fetchData()
      })
    },
    feedbackId(){
      console.log(this.feedbacks.feedbackId)
      this.userfeedback.feedbackId= this.feedbacks.feedbackId

    },
    reply(){
      console.log(this.userfeedback)
      saveUserFeedback(this.userfeedback.feedbackId,this.userfeedback.answer).then(response => {
          response.data.ifSolve=1
          this.feedbacks.ifSolve= response.data.ifSolve
          this.userfeedback.answer=response.data.reply
          console.log(this.feedbacks.ifSolve)
          // console.log(response) 
        })
        this.fetchData();
    },
     FormVisible(){
        this.dialogFormVisible=false,
        this.fetchData();
      },
    }
    
  }
</script>