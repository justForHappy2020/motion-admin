<template>
  <div class="app-container">
    <h1>商品管理{{change_action.actionImg}}</h1>
     <div class="filter-container">
        <span>
          <h3>商品筛选</h3>
          <el-row :gutter="11">
          <el-col :span="13">商品状态
          <el-select placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <!-- <el-col :span="11">
          申请时间
           <el-date-picker  type="datetimerange" range-separator="至" start-placeholder="开始日期"
             end-placeholder="结束日期">
           </el-date-picker>
            </el-col> -->

        <el-col :span="10">
          <el-input  placeholder="请输入商品名称"></el-input>
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
              <h3><strong>商品列表</strong></h3>
            </div>
          </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light " style="margin-right:1px;">
                <el-button type="primary" icon="el-icon-search" @click="dialogFormVisible = true,disabled=true">添加商品</el-button>
              </div>
            </el-col>
        </el-row>
     <!-- 添加商品的弹窗 -->
        <el-dialog width=80% title="添加商品" :visible.sync="dialogFormVisible">
          <div border>
          <div class="height_action">请创建商品信息</div>
          <div class="demo-input-suffix">
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>商品名称:</h3>
              </el-col>
              <el-col :span="7">
              </el-col>
            </el-row>
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>商品图片:</h3>
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
                <h3>价格(M币):</h3>
              </el-col>
                 <div class="height_action_leg"></div>
            </el-row>
            <div class="height_action_leg"></div>
           <el-row :gutter="10" padding="30px">
              <el-col :span="3">
                <h3>分类:</h3>
                
              </el-col>
           </el-row>
            <el-row :gutter="10" padding="30px">
              <el-col :span="3">
                <h3>运费:</h3>

              </el-col> 
           </el-row>
            <el-row :gutter="10" padding="30px">
              <el-col :span="3">
                <h3>库存:</h3>
              </el-col>
           </el-row>
            <el-row :gutter="10" padding="30px" >
              <el-col :span="2">
                <h3>状态:</h3>  
              </el-col>
              <el-col :span="3" style="padding-top:12px">
                <el-switch
              style="display: block;"
              v-model="ture"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="上架"
              inactive-text="下架">
            </el-switch></el-col>
           </el-row>
             <el-row :gutter="10" padding="30px">
              <el-col :span="3">
                <h3>商品特殊说明:</h3>  
              </el-col>
               <div class="weight_action">
                <el-input type="textarea" :rows="5">
                </el-input>
              </div>
           </el-row>
           </div>
            <div class="height_action_leg"></div>
             <el-descriptions class="margin-top" title="产品详细介绍信息" :column="3"   :size="min" border>
                <el-descriptions-item >
                <template slot="label" >
                    <i class="el-icon-user"></i>
                    产品颜色
                </template>
                <el-tag
  :key="tag"
  v-for="tag in dynamicTags"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    时间范围
                </template>
                <el-input type="textarea"></el-input>
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    产品材质
                </template>
                 <el-input type="textarea"></el-input>
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    产品误差
                </template>
                 <el-input type="textarea"></el-input>
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                   产品特点
                </template>
                <el-input type="textarea"></el-input>
                </el-descriptions-item> 
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    产品功能
                </template>
                 <el-input type="textarea"></el-input>
                </el-descriptions-item>
               
            </el-descriptions>


            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" @click="insert_action" :disabled="disabled">确认</el-button>
                <!-- <el-button type="success" @click="disabledChange">修改</el-button> -->
              </el-col>
              <el-col :span="5">
                <el-button type="danger" @click="dialogFormVisible = false">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
 

  
        <!-- 添加课程 -->
        <el-table v-loading="listLoading" :data="list" border style="width: 100%">
          <el-table-column fixed prop="" label="商品ID" width="150">
              001
          </el-table-column>
          <el-table-column prop="" label="商品名称" width="130">
              计时器
          </el-table-column>
          <el-table-column  prop="" label="商品图片" width="120">
            <template slot-scope="scope">
            　　      <img  width="40" height="40" />
            </template>
          </el-table-column>
        
          <el-table-column prop="" label="价格(M币)" width="130">
              500
          </el-table-column>
          <el-table-column prop="" label="分类" width="130">
              学习用品
          </el-table-column>
          <el-table-column prop="" label="运费" width="130">
              免运费
          </el-table-column>
              <el-table-column prop="" label="库存" width="130">
              500
          </el-table-column>
              <el-table-column prop="" label="已兑换" width="130">
              500
          </el-table-column>
           <el-table-column prop="" label="状态" width="130">
             上架/下架
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini"  @click="dialogFormVisible = true;handleEdit(scope.row);show_imgs()">编辑</el-button>
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
.margin-top{
  width: 1300px;
}
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
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
         dynamicTags: ['颜色一', '颜色二'],
        inputVisible: false,
        inputValue: '',
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
      },
      // 添加标签
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
    
  }
</script>