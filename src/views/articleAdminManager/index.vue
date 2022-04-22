<template>
  <div class="app-container">
    <div>
      <h2>文章管理</h2>
      <div class="filter-container">
        <span>
          <h3>文章筛选</h3>
          <el-row :gutter="10" >
            <el-col :span="11">发布时间
              <el-date-picker v-model="value_data" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-col>
            <el-col :span="7">
              发布状态
              <el-select v-model="form.searchType" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <div>
                <el-input v-model="form.search_userKey" placeholder="请输入用户、文章标题关键词"></el-input>
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
    </div>

    <div class="filter-container">
      <span>
        <el-row :gutter="24">
          <el-col :span="20">
            <div class="grid-content bg-purple">
              <h3><strong>文章列表</strong></h3>
            </div>
          </el-col>
         
        </el-row>


        <el-table v-loading="listLoading" :data="list" border style="width: 100%">
          <!-- <el-table-column fixed prop="userId" label="用户ID" width="180">
          </el-table-column> -->
           <el-table-column prop="articleId" label="文章ID" width="100">
          </el-table-column>
          <el-table-column prop="title" label="文章标题" width="230">
          </el-table-column>
           <el-table-column prop="" label="用户昵称" width="150">
          </el-table-column>
          <el-table-column prop="phoneNumber" label="作者(姓名)" width="150">
          </el-table-column>
          <el-table-column prop="releaseTime" label="发布时间" width="150">
          </el-table-column>
          <el-table-column prop="type" label="文章状态" width="150">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.ifshelves? "待审核" : "上架下架" }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="dialogTableVisible = true;handleEdit(scope.row)">审核</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.articleId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

<!-- 审核文章的弹窗 -->
      <el-dialog width=90% title="文章管理/审核文章" :visible.sync="dialogTableVisible" :data="list" >
          <div class="demo-input-suffix">
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3 >文章标题:</h3>
              </el-col>
              <el-col :span="7">
                <!-- <el-input v-model="change_action.actionName" ></el-input> -->
              </el-col>
            </el-row>

            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3 >用户昵称:</h3>
              </el-col>
              <el-col :span="7">
                <!-- <el-input v-model="change_action.actionName" ></el-input> -->
              </el-col>
            </el-row>

            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3 >作者(姓名):</h3>
              </el-col>
              <el-col :span="7">
                <!-- <el-input v-model="change_action.actionName" ></el-input> -->
              </el-col>
            </el-row>

            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3 >发布时间:</h3>
              </el-col>
              <el-col :span="7">
                <!-- <el-input v-model="change_action.actionName" ></el-input> -->
              </el-col>
            </el-row>

            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3 >文章内容:</h3>
              </el-col>
              <el-col :span="7">
                <!-- <el-input v-model="change_action.actionName" ></el-input> -->
              </el-col>
            </el-row>

            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>审核上下架:</h3>
              </el-col>
              <el-col :span="7" >
                <div class="height_action_leg"></div>
                <!-- <div ><span >{{ this.change_action.type === 1 ? "计时" : "计次" }}</span></div> -->
                <div class="height_action_leg"></div>
                 <div class="height_action_leg"></div>
                 <!-- <el-radio-group v-model="change_action.type ">          -->
                <el-radio :label="1">上架</el-radio>
                <el-radio :label="0">下架</el-radio>
                 <!-- </el-radio-group>  -->
              </el-col>
            </el-row>
            
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
            </el-row>
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" @click="updata_action();TableVisible();">完成审核</el-button>
              </el-col>
              <el-col :span="5">
                <el-button @click="dialogTableVisible = false">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
        <!-- 审核文章弹窗结束 -->

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

  .filter-item-container.search {
    flex: 1;
  }

  .filter-item-container span {
    margin-right: 8px;
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
</style>

<script>
  import {
    deleteArticle
  } from '@/api/articleAdminManager'
import { getToken } from '@/utils/auth'

  export default {
    data() {
      return {
        type: '',
        list: [],
        listLoading: true,
        dialogFormVisible: false,
        dialogTableVisible: false,
        userID:'',
        userName:'',
        userGender:'',
        userPhone:'',
        userBirth:'',
        options: [{
            value: true,
            label: "启用"
          },
          {
            value: false,
            label: "禁用"
          }
        ],
        form: {
          search_userDate: '',
          search_userKey: ''
        },
        selectDelIdx: null,
        page:1 , //当前页
        size:10   ,//每页展示的条数
        total:null ,  //数据总量
        change_user:{
           userId:'',
           nickName:'',
           gender:'',
           phoneNumber:'',
           birthday:'',
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList(this.page,this.size).then(response => {
          this.list = response.data.userList
          this.type = response.data.userList.type
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleDelete(index) {
        this.open(index)
      },
      open(index) {
        this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteArticle(index);
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
      //禁用用户
      delete_user(index){
      this.fetchData();
      banUser(getToken(),index);
       this.fetchData();
      },
      //  修改用户    
       handleEdit(row){
        this.change_user=JSON.parse(JSON.stringify(row));
        // console.log(this.change_user)
      },
      updata_user(){ 
        console.log(this.change_user);
        this.fetchData();
        saveUserdata(this.change_user)
        .then(() => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
           this.fetchData();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '更新失败'
          });
        });
        
      },
      TableVisible(){
        this.dialogTableVisible =false;
      } 
    }
  }
</script>
