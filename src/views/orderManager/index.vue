<template>
  <div class="app-container">
    <h1>订单管理</h1>
     <div class="filter-container">
        <span>
          <h3>订单筛选</h3>
          <el-row :gutter="11">
          <el-col :span="13">订单状态
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
          <el-input  placeholder="请输入订单名称"></el-input>
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
              <h3><strong>订单列表</strong></h3>
            </div>
          </el-col>
            <el-col :span="4">
            <div class="grid-content bg-purple-light">
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="(dialogTableVisible = true), (disabled = true)"
                >添加订单</el-button
              >
            </div>
          </el-col>
        </el-row>
    
 <!-- 添加订单的弹窗 -->
        <el-dialog
          width="75%"
          title="添加订单"
          :visible.sync="dialogTableVisible"
        >
          <div class="height_action">请填写订单相关信息</div>
          <div class="demo-input-suffix">
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>运单号:</h3>
              </el-col>
              <el-col :span="7">
                <el-input
                  placeholder="请输入内容"
                  v-model="upload_order.waybillNumber"
                ></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>物流公司:</h3>
              </el-col>
              <el-col :span="7">
                <el-input
                  placeholder="请输入内容"
                  v-model="upload_order.express"
                ></el-input>
              </el-col>
            </el-row>
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>地址:</h3>
              </el-col>
              <el-col :span="7">
                <el-input
                  placeholder="请输入内容"
                  v-model="upload_order.address"
                ></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>价格:</h3>
              </el-col>
              <el-col :span="7">
                <el-input
                  placeholder="请输入内容"
                  v-model="upload_order.price"
                ></el-input>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>状态:</h3>
              </el-col>
              <el-col :span="7">
                <div class="height_action_leg"></div>
                <el-radio v-model="upload_action.type" label="1"
                  >已送达</el-radio
                >
                <el-radio v-model="upload_action.type" label="2"
                  >配送中</el-radio
                >
                <el-radio v-model="upload_action.type" label="3"
                  >待发货</el-radio
                >
              </el-col>
            </el-row> -->
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>时间:</h3>
              </el-col>
              <el-col :span="7">
                <el-input
                  placeholder="请输入内容"
                  v-model="upload_order.time"
                ></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>商品名称:</h3>
              </el-col>
              <el-col :span="7">
                <el-input
                  placeholder="请输入内容"
                  v-model="upload_order.goodsName"
                ></el-input>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>下单时间:</h3>
              </el-col>
              <div class="block">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </div>
            </el-row> -->
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>运费:</h3>
              </el-col>
              <el-col :span="7">
                <el-input
                  placeholder="请输入内容"
                  v-model="upload_order.freight"
                ></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button
                  type="success"
                  @click="insert_Order"
                  :disabled="false"
                  >确认添加</el-button
                >
                <el-button @click="dialogTableVisible = false">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>
 <!-- 查看订单的弹窗 【改】-->
        <el-dialog width=75% title="查看订单内容" :visible.sync="dialogFormVisible">
         <el-descriptions class="margin-top" title="订单信息" :column="3" :size="size" border>
                <el-descriptions-item >
                <template slot="label" >
                    <i class="el-icon-user"></i>
                    运单号
                </template>
                <el-input
                  placeholder="请输入内容"
                  v-model="change_order.waybillNumber"
                ></el-input>
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    物流公司
                </template>
               <el-input
                  placeholder="请输入内容"
                  v-model="change_order.express"
                ></el-input>
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    地址
                </template>
                <el-input
                  placeholder="请输入内容"
                  v-model="change_order.address"
                ></el-input>
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    物流状态
                </template>
                <el-input
                  placeholder="请输入内容"
                  v-model="change_order.state"
                ></el-input>
                <!-- <el-tag size="small">已送达</el-tag>
                <el-tag size="small">配送中</el-tag>
                <el-tag size="small">代发货</el-tag> -->
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                   商品名称
                </template>
               <el-input
                  placeholder="请输入内容"
                  v-model="change_order.goodsName"
                ></el-input>
                </el-descriptions-item> 
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    下单时间
                </template>
                <el-input
                  placeholder="请输入内容"
                  v-model="change_order.time"
                ></el-input>
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    运费
                </template>
                <el-input
                  placeholder="请输入内容"
                  v-model="change_order.freight"
                ></el-input>
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                   价格
                </template>
                <el-input
                  placeholder="请输入内容"
                  v-model="change_order.price"
                ></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    用户昵称
                </template>
                <el-input
                  placeholder="请输入内容"
                  v-model="change_order.freight"
                ></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    手机号
                </template>
                <el-input
                  placeholder="请输入内容"
                  v-model="change_order.freight"
                ></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    国内承运人
                </template>
                <el-input
                  placeholder="请输入内容"
                  v-model="change_order.freight"
                ></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    国内承运人电话号
                </template>
                <el-input
                  placeholder="请输入内容"
                  v-model="change_order.freight"
                ></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-office-building"></i>
                    用户是否确认收货
                </template>
                <!-- <el-tag size="small">是</el-tag> -->
                <el-input
                  placeholder="请输入内容"
                  v-model="change_order.freight"
                ></el-input>
                </el-descriptions-item>
                
            </el-descriptions>
            <!-- <div class="height_action"></div>
          <h3>物流信息</h3>
            <div class="block">
                <el-timeline>
                    <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :icon="activity.icon"
                    :type="activity.type"
                    :color="activity.color"
                    :size="activity.size"
                    :timestamp="activity.timestamp">
                    {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
                </div>-->
                <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" @click="updata_order();FormVisible();">确认</el-button>
              </el-col>
              <el-col :span="5">
                <el-button @click="dialogTableVisible = false">取消</el-button>
              </el-col> 
            </el-row>
        </el-dialog>
 

  
        <!-- 添加订单 -->
        <el-table v-loading="listLoading" :data="list"  style="width: 100%">
          <el-table-column fixed prop="orderId" label="编号" width="150">
              
          </el-table-column>
           <el-table-column prop="waybillNumber" label="运单号" width="130">
              
          </el-table-column>
          <el-table-column prop="" label="物流公司" width="130">
          </el-table-column>
        
          <el-table-column prop="address" label="地址" width="130">
          </el-table-column>
          <el-table-column prop="state" label="物流状态" width="130">
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称" width="130">
          </el-table-column>
              <el-table-column prop="time" label="下单时间" width="130">
            
          </el-table-column>
              <el-table-column prop="freight" label="运费" width="130">
          </el-table-column>
           <el-table-column prop="price" label="价格" width="130">
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini"  @click="dialogFormVisible = true;handleEdit(scope.row);">查看</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.orderId)">删除</el-button>
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
.block{
    width:50%;
}

</style>



<script>
  import {
   getOrder,
   insertOrder,
   delectOrder,
   updateOrder
  } from '@/api/orderManager'
import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {
           activities: [{
          content: '收货地址',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '派送中',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }, {
          content: '运输中',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, ],
        list: [],
        disabled:false,
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
        upload_order:{
          token:getToken(),
          freight:0,
          time:'',
          waybillNumber:'',
          state:'',
          price:0,
          goodsName:'',
          express:'',
          address:''
        },
        show_img:[{name:'hhh',url:''}],
        transformPhoto:{
          file:null,
          token:getToken()
        },
         change_order:{
          token:getToken(),
          orderId:0,
          freight:0,
          time:'',
          waybillNumber:'',
          state:'',
          price:0,
          goodsName:'',
          express:'',
          address:''
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
        getOrder(this.page,this.size).then(response => {
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
          this.delete_order(index);
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
      insert_Order(){
         this.fetchData();
         insertOrder(this.upload_order) ;
         this.fetchData();
         this.dialogTableVisible = false;
       
      },
      delete_order(index){
        delectOrder(getToken(),index);
         this.fetchData();
      },
      handleEdit(row){
        this.change_order=JSON.parse(JSON.stringify(row));
      },
      updata_order(){ 
        updateOrder(this.change_order)
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
      FormVisible(){
        this.dialogFormVisible =false;
        this.fetchData();
      },
    }
    
  }
</script>