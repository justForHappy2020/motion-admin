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
        </el-row>
     <!-- 添加动作的弹窗 -->
        <el-dialog width=90% title="审核认证" :visible.sync="dialogFormVisible">
          <div class="height_action">请审核用户提交的资料</div>
          <div class="demo-input-suffix">
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>真实姓名:</h3>
              </el-col>
              <el-col :span="7">
              </el-col>
            </el-row>
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>手机号码:</h3>
              </el-col>
              <el-col :span="7">
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
              </el-col>
            </el-row>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>手机号码:</h3>
              </el-col>
                 <div class="height_action_leg"></div>
            </el-row>
            <div class="height_action_leg"></div>
           <el-row :gutter="10" padding="30px">
              <el-col :span="3">
                <h3>证件号码:</h3>
              </el-col>
           </el-row>
            <el-row :gutter="10" padding="30px">
              <el-col :span="3">
                <h3>机构或组织:</h3>

              </el-col> 
           </el-row>
            <el-row :gutter="10" padding="30px">
              <el-col :span="3">
                <h3>职称或称号:</h3>
              </el-col>
           </el-row>

           <el-row :gutter="10" padding="30px">
              <el-col :span="3">
                <h3>认证说明:</h3>  
              </el-col>
           </el-row>
              <div class="weight_action">
                <el-input type="textarea" :rows="5">
                </el-input>
              </div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="3">
                <h3>认证材料:</h3>  
              </el-col>
           </el-row>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" @click="insert_action" :disabled="disabled">同意申请</el-button>
                <!-- <el-button type="success" @click="disabledChange">修改</el-button> -->
              </el-col>
              <el-col :span="5">
                <el-button type="danger" @click="dialogFormVisible = false">拒绝申请</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
 

  
        <!-- 添加课程 -->
        <el-table v-loading="listLoading" :data="list" border style="width: 100%">
          <el-table-column fixed prop="applyId" label="认证ID" width="150">{{userName}}
          </el-table-column>
          <el-table-column prop="userId" label="用户ID" width="130">
          </el-table-column>
          <el-table-column  prop="phone" label="手机号" width="120"> </el-table-column>
            <!-- <template slot-scope="scope">
             <!-- 　　      <img :src="scope.row.actionImgs" width="40" height="40" /> -->
            <!-- </template> --> 
         
        
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
              <el-button size="mini"  @click="dialogFormVisible = true;handleEdit(scope.row);show_imgs()">审核</el-button>
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
    delectApply
  } from '@/api/certification'
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
        getApply(this.page,this.size).then(response => {
         
          this.list = response.data
          console.log(response.data)
          // this.total = response.data.total
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
      delete_apply(index){
        delectApply(getToken(),index);

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