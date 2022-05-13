<template>
  <div class="app-container">
    <h1>商品管理</h1>
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
     <!-- 添加商品的弹窗 【增】-->
        <el-dialog width=80% title="添加商品" :visible.sync="dialogFormVisible">
          <div class="height_action">请创建商品信息</div>
          <div class="demo-input-suffix">
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>商品名称:</h3>
              </el-col>
              <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="upload_goods.goodsName"></el-input>
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
                  list-type="picture-card">
                  <i class="el-icon-plus"></i>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-col>
            </el-row>
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>价格(M币):</h3>
              </el-col>
               <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="upload_goods.price"></el-input>
              </el-col>
                 <div class="height_action_leg"></div>
            </el-row>

           <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>分类:</h3>
              </el-col>
               <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="upload_goods.type"></el-input>
              </el-col>
           </el-row>

            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>运费:</h3>
              </el-col> 
               <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="upload_goods.freight"></el-input>
              </el-col>
           </el-row>

            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>库存:</h3>
              </el-col>
               <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="upload_goods.inventory"></el-input>
              </el-col>
           </el-row>
<!--            
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
               
            </el-descriptions> -->


            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" @click="insert_goods" >确认</el-button>
              </el-col>
              <el-col :span="5">
                <el-button type="danger" @click="dialogFormVisible = false">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
 

    <!-- 修改商品的弹窗 【改】-->
        <el-dialog width=80% title="编辑商品" :visible.sync="dialogTableVisible">
          <div class="height_action">请修改商品信息</div>
          <div class="demo-input-suffix">
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>商品名称:</h3>
              </el-col>
              <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="change_goods.goodsName"></el-input>
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
                  :on-success="change_imgs" 
                  list-type="picture-card">
                  <i class="el-icon-plus"></i>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-col>
            </el-row>
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>价格(M币):</h3>
              </el-col>
               <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="change_goods.price"></el-input>
              </el-col>
                 <div class="height_action_leg"></div>
            </el-row>

           <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>分类:</h3>
              </el-col>
               <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="change_goods.type"></el-input>
              </el-col>
           </el-row>

            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>运费:</h3>
              </el-col> 
               <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="change_goods.freight"></el-input>
              </el-col>
           </el-row>

            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>库存:</h3>
              </el-col>
               <el-col :span="7">
                <el-input placeholder="请输入内容" v-model="change_goods.inventory"></el-input>
              </el-col>
           </el-row>
<!--            
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
               
            </el-descriptions> -->


            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" @click="updata_goods();TableVisible();" >确认</el-button>
              </el-col>
              <el-col :span="5">
                <el-button type="danger" @click="dialogFormVisible = false">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
  
        <!-- 查看商品【查】 -->
        <el-table v-loading="listLoading" :data="list"  style="width: 100%">
          <el-table-column fixed prop="goodsId" label="商品ID" width="150"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" width="130"></el-table-column>
          <el-table-column  prop="goodsUrl" label="商品图片" width="120">
            <template slot-scope="scope">
            　　      <img :src="scope.row.goodsUrl" width="40" height="40" />
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格(M币)" width="130"> </el-table-column>
          <el-table-column prop="type" label="分类" width="130"></el-table-column>
          <el-table-column prop="freight" label="运费" width="130"> </el-table-column>
          <el-table-column prop="inventory" label="库存" width="130"> </el-table-column>
          <el-table-column prop="exchange" label="已兑换" width="130">
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini"  @click="dialogTableVisible = true;handleEdit(scope.row);show_imgs()">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.goodsId)">删除</el-button>
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
   getGoods,
   delectGoods,
   insertGoods,
   updataGoods
  } from '@/api/commodityManager'
import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {
        dynamicTags: ['颜色一', '颜色二'],
        inputVisible: false,
        inputValue: '',
        list: [],
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
        upload_goods:{
          token:getToken(),
          goodsName:'',
          price:0,
          goodsUrl:'',
          type:'',
          inventory:0,
          exchange:0,
          goodsId:0,
          freight:0,
        },
        show_img:[{name:'hhh',url:''}],
        transformPhoto:{
          file:null,
          token:getToken()
        },
         change_goods:{
          token:getToken(),
          goodsName:'',
          price:'',
          goodsUrl:'',
          type:'',
          inventory:0,
          exchange:0,
          freight:0,
          goodsId:0,
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
        getGoods(this.page,this.size).then(response => {
          this.list = response.data
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
          this.delete_goods(index);
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
      upload_imgs(response){
        this.upload_goods.goodsUrl=response.data;
        this.disabled=false;    
      },
      insert_goods(){
        this.fetchData();
        insertGoods(this.upload_goods);
        this.fetchData();
        this.dialogFormVisible = false;
      },
      delete_goods(index){
        delectGoods(getToken(),index);
      },
      //修改信息
      show_imgs(){
       this.show_img[0].url=this.change_goods.goodsUrl;
      },
      change_imgs(response){
         this.change_goods.goodsUrl=response.data
      },
      handleEdit(row){
        this.change_goods=JSON.parse(JSON.stringify(row));
      },
      updata_goods(){ 
        // print()
        updataGoods(this.change_goods).then(() => {
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
    }
    
  }
</script>