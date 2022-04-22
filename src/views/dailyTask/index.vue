<template>
  <div class="app-container">
    <h1>每日任务</h1>
    <div class="filter-container">
      <span>
        <h3>任务筛选</h3>
        <el-row :gutter="10">
          <el-col :span="7">任务状态
            <el-select v-model="value_tpye" placeholder="请选择">
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
              <el-input v-model="input" placeholder="请输入任务内容关键词"></el-input>
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
              <h3><strong>任务列表</strong></h3>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">
              <el-button type="primary" icon="el-icon-search" @click="dialogFormVisible = true,disabled=true">添加任务</el-button>
            </div>
          </el-col>
        </el-row>
<!-- 添加动作的弹窗 -->
        <el-dialog width=90% title="任务管理/添加任务" :visible.sync="dialogFormVisible">
          <div class="height_action">请填写任务相关信息</div>
          <div class="demo-input-suffix">
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>任务名称:</h3>
              </el-col>
              <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="upload_action.actionName"></el-input>
              </el-col>
            </el-row>
              <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3 >价格(M币):</h3>
              </el-col>
              <el-col :span="7">
                <el-input v-model="change_action.actionName" ></el-input>
              </el-col>
            </el-row>
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>任务状态:</h3>
              </el-col>
              <el-col :span="7" >
                <div class="height_action_leg"></div>
                <div ><span >{{ this.change_action.type === 1 ? "上线" : "下线" }}</span></div>
                <div class="height_action_leg"></div>
                 <el-radio-group v-model="change_action.type ">         
                <el-radio :label="1">上线</el-radio>
                <el-radio :label="0">下线</el-radio> </el-radio-group> 
              </el-col>
            </el-row>
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" @click="insert_action" :disabled="disabled">立即添加</el-button>
                <!-- <el-button type="success" @click="disabledChange">修改</el-button> -->
              </el-col>
              <el-col :span="5">
                <el-button @click="dialogFormVisible = false">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
 <!-- 修改动作的弹窗 -->
 <el-dialog width=90% title="任务管理/更新任务" :visible.sync="dialogTableVisible" :data="list" >
          <div class="height_action">请填写任务相关信息</div>
          <div class="demo-input-suffix">
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3 >任务名称:</h3>
              </el-col>
              <el-col :span="7">
                <el-input v-model="change_action.actionName" ></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3 >价格(M币):</h3>
              </el-col>
              <el-col :span="7">
                <el-input v-model="change_action.actionName" ></el-input>
              </el-col>
            </el-row>
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>任务状态:</h3>
              </el-col>
              <el-col :span="7" >
                <div class="height_action_leg"></div>
                <div ><span >{{ this.change_action.type === 1 ? "上线" : "下线" }}</span></div>
                <div class="height_action_leg"></div>
                 <el-radio-group v-model="change_action.type ">         
                <el-radio :label="1">上线</el-radio>
                <el-radio :label="0">下线</el-radio> </el-radio-group> 
              </el-col>
            </el-row>
            <div class="height_action_leg"></div>
           
            <el-row :gutter="10" padding="30px">
            </el-row>
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" @click="updata_action();TableVisible();">立即修改</el-button>
              </el-col>
              <el-col :span="5">
                <el-button @click="dialogTableVisible = false">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
        <!-- 编辑动作弹窗结束 -->
        <el-table v-loading="listLoading" :data="list" border style="width: 100%">
          <el-table-column fixed prop="actionId" label="编号" width="150">
          </el-table-column>
          <el-table-column prop="" label="任务" width="300">
          </el-table-column>
          <el-table-column prop="" label="价格(M币)" width="130">
          </el-table-column>
          <el-table-column prop="" label="任务状态" width="130">
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini"  @click="dialogTableVisible = true;handleEdit(scope.row);show_imgs()">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.actionId)">删除</el-button>
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
    deleteAction,
    getList,
    insertAction,
    updataAction,
  } from '@/api/action'
import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {
        list: [],
        disabled:true,
        action_textarea: '',
        action_radio: 1,
        dialogFormVisible: false,
        dialogVisible: false,
        dialogTableVisible:false,
        options: [{
          value_tpye: '选项1',
          label: '1'
        }, {
          value_tpye: '选项2',
          label: '0',
        }],

        value_tpye: '',
        input: '',
        page:1 , //当前页
        size:10   ,//每页展示的条数
        total:null,   //数据总量
        upload_action:{
          token:getToken(),
          actionName:'',
          actionImgs:'',
          actionUrl:'',
          actionIntro:'',
          restDuration:0,
          duration:0,
          size:0,
          type:0
        },
        show_img:[{name:'hhh',url:''}],
        transformPhoto:{
          file:null,
          token:getToken()
        },
         change_action:{
          actionId:'',
          actionName:'',
          actionImgs:'',
          actionUrl:'',
          actionIntro:'',
          restDuration:0,
          duration:0,
          size:0,
          type:0
        },
      }
    },
    created() {
      this.fetchData()
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList(this.page,this.size).then(response => {
          this.list = response.data.adminActionDtoList
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleDelete(index) {
        this.open(index);
        
      },
      open(index) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delete_actioni(index);
            this.fetchData();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
            this.fetchData();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      open_new() {
        this.$alert('<div><h2>课程筛选</h2></div>', '添加动作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true
        });
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
      upload_video(response){
        this.upload_action.actionUrl=response.data
        this.disabled=false;
      },
      upload_imgs(response){
        this.upload_action.actionImgs=response.data;
       this.disabled=false;
        
      },
      insert_action(){
         this.fetchData();
        insertAction(this.upload_action);
         this.fetchData();
        this.dialogFormVisible = false;
       
      },
      delete_actioni(index){
        deleteAction(getToken(),index);

      },
      //修改动作信息
      show_imgs(){
       this.show_img[0].url=this.change_action.actionImgs;
       this.show_img[0].name=this.change_action.actionName;
      },
      change_video(response){
        this.change_action.actionUrl=response.data
      },
      change_imgs(response){
         this.change_action.actionImgs=response.data
      },
      handleEdit(row){
        this.change_action=JSON.parse(JSON.stringify(row));
      },
      updata_action(){ 
        console.log(this.change_action);
        updataAction(this.change_action)
        .then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '更新失败'
          });
           this.fetchData();
        });
        
      },
      TableVisible(){
        this.dialogTableVisible =false;
        this.fetchData();
      },
      disabledChange(){
        this.disabled=true
      }
    }
    
  }
</script>