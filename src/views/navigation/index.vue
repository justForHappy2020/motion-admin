<template>
  <div class="app-container">
    <h1>首页导航管理</h1>
    <div class="filter-container">
      <span>
        <el-row :gutter="24">
          <el-col :span="20">
            <div class="grid-content bg-purple">
              <h3><strong>导航列表</strong></h3>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">
              <el-button type="primary" icon="el-icon-search" @click="dialogFormVisible = true,disabled=true">添加导航</el-button>
            </div>
          </el-col>
        </el-row>
<!-- 添加导航的弹窗【增】 -->
        <el-dialog width=90% title="首页导航管理/添加快速导航" :visible.sync="dialogFormVisible">
          <div class="height_action">请填写导航相关信息</div>

            <div class="demo-input-suffix">
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>导航名称:</h3>
              </el-col>
              <el-col :span="7">
                <el-input placeholder="请输入导航名称" v-model="upload_navigation.name"></el-input>
              </el-col>
            </el-row>

            
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>导航图案:</h3>
              </el-col>
              <el-col :span="7">
                <el-upload auto-upload=false limit=1 
                  action="http://106.55.25.94:8080/api/user/modifyHptIos"
                  :data="transformPhoto"
                  name="headPortrait"
                  :on-success="upload_imgs" 
                  list-type="picture-card" >
                  <i class="el-icon-plus"></i>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-col>
            </el-row>

            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                 <div class="height_action_leg"></div>
                <h3>导航说明:</h3>
              </el-col>
                 <div class="height_action_leg"></div>
              <el-col :span="7">
                <el-input placeholder="请输入导航说明" v-model="upload_navigation.content"></el-input>
              </el-col>
            </el-row>

             <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                 <div class="height_action_leg"></div>
                <h3>创建人:</h3>
              </el-col>
                 <div class="height_action_leg"></div>
              <el-col :span="7">
                <el-input placeholder="请输入创建人昵称" v-model="upload_navigation.upload"></el-input>
              </el-col>
            </el-row>

            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" @click="insert_navigation" :disabled="disabled">立即添加</el-button> 
             </el-col>
              <el-col :span="5">
                <el-button @click="dialogFormVisible = false">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
<!-- 修改导航 -->
<el-dialog width=90% title="导航管理/更新导航" :visible.sync="dialogTableVisible"  :data="list" >
          <div class="height_action">请填写导航相关信息</div>
          <div class="demo-input-suffix">
            <el-row :gutter="10" pading="30px">
              <el-col :span="2">
                <h3>导航ID:</h3>
              </el-col>
              <el-col :span="7">
                <el-input  v-model="change_navigation.navigationId"></el-input>
              </el-col>
            </el-row>

            <el-row :gutter="10" pading="30px">
              <el-col :span="2">
                <h3>导航名称:</h3>
              </el-col>
              <el-col :span="7">
                <el-input  v-model="change_navigation.name"></el-input>
              </el-col>
            </el-row>

            <el-row :gutter="10" pading="30px">
              <el-col :span="2">
                <h3>创建人:</h3>
              </el-col>
              <el-col :span="7">
                <el-input v-model="change_navigation.upload"></el-input>
              </el-col>
            </el-row>

          <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>导航图案:</h3>
              </el-col>
              <el-col :span="7">
                <el-upload auto-upload=false limit=1 
                  action="http://106.55.25.94:8080/api/user/modifyHptIos"
                  :data="transformPhoto"
                  name="headPortrait"
                  :on-success="upload_imgs" 
                  list-type="picture-card" >
                  <i class="el-icon-plus"></i>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-col>
            </el-row>

            <div class="height_action_leg"></div>
            <el-row :gutter="10" pading="30px">
              <el-col :span="2">
                <h3>说明:</h3>
              </el-col>
              <el-col :span="7">
                <el-input v-model="change_navigation.content"></el-input>
              </el-col>
            </el-row>

            <div class="height_action_leg"></div>
            <el-row :gutter="10" pading="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" @click="updata_navigation();TableVisible();">立即更新</el-button>
              </el-col>
              <el-col :span="5">
                <el-button @click="dialogTablemVisible = false">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
  
<!-- 展示导航【查】 -->
        <el-table v-loading="listLoading" :data="list" border style="width: 100%">
          <el-table-column fixed prop="navigationId" label="编号" width="150">
          </el-table-column>
          <el-table-column prop="name" label="名称" width="130">
          </el-table-column>
          <el-table-column  prop="imgUrl" label="图案" width="120">
            <template slot-scope="scope">
            　　<img :src="scope.row.imgUrl" width="40" height="40" />
            </template>
          </el-table-column>
          <el-table-column prop="content" label="说明" width="130">
          </el-table-column>
          <el-table-column prop="upload" label="创建人" width="130">
          </el-table-column>
          <el-table-column prop="time" label="添加时间" width="130">
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini"  @click="dialogTableVisible = true;handleEdit(scope.row);show_imgs()">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.navigationId)">删除</el-button>
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
   getNavigation,
   updateNavigation,
   insertNavigation,
   delectNavigation
  } from '@/api/navigation'
import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {
        list: [],
        disabled:true,
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
        change_navigation:{
          token:getToken(),
          name:'',
          ImgUrl:'',
          content:'',
          upload:'',
          time:'',
          navigationId:0,
        },
        show_img:[{name:'hhh',url:''}],
        transformPhoto:{
          file:null,
          token:getToken()
        },
         upload_navigation:{
          name:'',
          imgUrl:'',
          content:'',
          upload:'',
          time:'',
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
        getNavigation(this.page,this.size).then(response => {
          this.list = response.data
          console.log(this.list)
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
         this.delete_navigation(index) ;
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
              this.size = size;
              this.fetchData();
            },
      handleCurrentChange(page) {
              this.page = page;
              this.fetchData();
            },
      upload_imgs(response){
        this.upload_navigation.imgUrl=response.data;
        console.log(this.upload_navigation.imgUrl);
        this.disabled=false;    
      },
      insert_navigation(){
        this.fetchData();
        insertNavigation(this.upload_navigation);
        this.fetchData();
        this.dialogFormVisible = false;
       
      },
      delete_navigation(index){
        delectNavigation(getToken(),index);

      },
      //修改导航信息
      show_imgs(){
       this.show_img[0].url=this.change_navigation.ImgUrl;
      },
      change_imgs(response){
         this.change_navigation.ImgUrl=response.data
      },
      handleEdit(row){
        this.change_navigation=JSON.parse(JSON.stringify(row));
      },
      updata_navigation(){ 
        updateNavigation(this.change_navigation)
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