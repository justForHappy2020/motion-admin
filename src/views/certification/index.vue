<template>
  <div class="app-container">
    <h1>认证管理</h1>
     <div class="filter-container">
        <span>
          <h3>申请筛选</h3>
          <el-row :gutter="10">
          <el-col :span="7">上线状态
          <el-select placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="11">
          申请时间
           <el-date-picker  type="datetimerange" range-separator="至" start-placeholder="开始日期"
             end-placeholder="结束日期">
           </el-date-picker>
            </el-col>

        <el-col :span="5">
          <el-input  placeholder="请输入用户昵称"></el-input>
        </el-col>

        <el-col :span="1">
        <el-button type="primary" icon="el-icon-search" @click="submit">筛选</el-button>
        </el-col>

        </el-row>
        </span>
      </div>

    <div class="filter-container">
      <span>
        <el-row :gutter="24">
          <el-col :span="20">
            <div class="grid-content bg-purple">
              <h3><strong>申请列表</strong></h3>
            </div>
          </el-col>
           <el-col :span="4">
            <div class="grid-content bg-purple-light">
              <el-button type="primary" icon="el-icon-search" @click="dialogFormVisible = true">添加认证</el-button>
            </div>
          </el-col>
        </el-row>
     <!-- 添加认证的弹窗【增】 -->
       <el-dialog width=90% title="添加审核认证" :visible.sync="dialogFormVisible">
          <div class="height_action">请审核用户提交的资料</div>
          <div class="demo-input-suffix">            

            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>真实姓名:</h3>
              </el-col>
              <el-col :span="7">
                <el-input placeholder="请输入内容" v-model=" upload_apply.userName"> </el-input>
              </el-col>
            </el-row>

             <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>昵称:</h3>
              </el-col>
              <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="upload_apply.applyName"> </el-input>
              </el-col>
           </el-row>

            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>手机号码:</h3>
              </el-col>
              <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="upload_apply.phone"> </el-input>
              </el-col>
            </el-row>

            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>申请时间:</h3>
              </el-col>
              <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="upload_apply.time"> </el-input>
              </el-col> 
           </el-row>

           <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>认证说明:</h3>  
              </el-col>
           </el-row>
              <div class="weight_action">
                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="upload_apply.Statement">
                </el-input>
              </div>

           <div class="height_action_leg"></div>
            <el-row :gutter="20" padding="30px">
              <el-col :span="5" :offset="10">
                <el-button type="success" @click="insert_apply">立即添加</el-button>
           </el-col>
              <el-col :span="5">
                <el-button type="danger" @click="dialogFormVisible = false">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog> 
 

  
        <!-- 查看认证【查】 -->
        <el-table v-loading="listLoading" :data="list" border style="width: 100%">
          <el-table-column fixed prop="applyId" label="认证ID" width="150">{{userName}}
          </el-table-column>
          <el-table-column prop="userId" label="用户ID" width="130">
          </el-table-column>
          <el-table-column  prop="phone" label="手机号" width="120"> </el-table-column>     
          <el-table-column prop="applyNumber" label="申请次数" width="130">
          </el-table-column>
          <el-table-column prop="time" label="申请时间" width="130">
          </el-table-column>
          <el-table-column prop="" label="审核结果" width="130">
          </el-table-column>
           <el-table-column prop="" label="审核状态" width="130">
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini"  @click="dialogFormVisible = true;handleEdit(scope.row);">审核</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.applyId)">删除</el-button>
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
    getApply,
    delectApply,
    insertApply
  } from '@/api/certification'
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
         upload_apply:{
          token:getToken(),
          userName:'',
          applyName:'',
          phone:'',
          time:'',
          state:'',
          result:''
        },
        selectDelIdx: null,
        transformPhoto:{
          file:null,
          token:getToken()
        },
        courseGroup:{
          token:getToken(),
          className:'',
          classUrl:''
        },
         transformPhoto:{
          file:{},
          token:getToken()
        },
        show_img:[{name:'hhh',url:''}],
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
        getApply(this.page,this.size).then(response => { 
        this.list = response.data
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
          this.delete_apply(index);
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
      insert_apply(){
          this.fetchData();
          insertApply(this.upload_apply).then(response =>{
          alert("添加成功")
          })
         this.fetchData();
         this.dialogFormVisible = false;    
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
      delete_apply(index){
        delectApply(getToken(),index);

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