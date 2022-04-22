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
              <h3><strong>商品列表</strong></h3>
            </div>
          </el-col>
        </el-row>
     <!-- 添加动作的弹窗 -->
        <el-dialog width=75% title="查看订单内容" :visible.sync="dialogFormVisible">
         <el-descriptions class="margin-top" title="订单信息" :column="3" :size="size" border>
                <el-descriptions-item >
                <template slot="label" >
                    <i class="el-icon-user"></i>
                    运单号
                </template>
                00000000
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    物流公司
                </template>
                中通快递
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    地址
                </template>
                头大大大大大大大大大
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    物流状态
                </template>
                <el-tag size="small">已送达</el-tag>
                <el-tag size="small">配送中</el-tag>
                <el-tag size="small">代发货</el-tag>
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                   商品名称
                </template>
               计时器
                </el-descriptions-item> 
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    下单时间
                </template>
                2001.04.06
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    运费
                </template>
                免运费
                </el-descriptions-item>
                 <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                   价格
                </template>
                500
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    用户昵称
                </template>
                ljh
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    手机号
                </template>
                18100000000
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    国内承运人
                </template>
                lll
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    国内承运人电话号
                </template>
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-office-building"></i>
                    用户是否确认收货
                </template>
                <el-tag size="small">是</el-tag>
                </el-descriptions-item>
                
            </el-descriptions>
            <div class="height_action"></div>
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
                </div>
                <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" @click="updata_action();TableVisible();">确认</el-button>
              </el-col>
              <el-col :span="5">
                <el-button @click="dialogTableVisible = false">取消</el-button>
              </el-col>
            </el-row>
        </el-dialog>
 

  
        <!-- 添加课程 -->
        <el-table v-loading="listLoading" :data="list" border style="width: 100%">
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
              <el-button size="mini"  @click="dialogFormVisible = true;handleEdit(scope.row);show_imgs()">查看</el-button>
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
.block{
    width:50%;
}

</style>



<script>
  import {
   getOrder,
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
        getOrder(this.page,this.size).then(response => {
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