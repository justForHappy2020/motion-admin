<template>
  <div class="app-container">
    <div>
      <h2>课程管理</h2>
      <div class="filter-container">
        <span>
          <h3>课程筛选</h3>
          <el-row :gutter="10">
          <el-col :span="7">上线状态
          <el-select v-model="form.searchOnLine" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="11">
          上传时间
           <el-date-picker v-model="value_data" type="datetimerange" range-separator="至" start-placeholder="开始日期"
             end-placeholder="结束日期">
           </el-date-picker>
            </el-col>

        <el-col :span="5">
          <el-input v-model="form.searchCourseKey" placeholder="请输入课程标题或关键词"></el-input>
        </el-col>

        <el-col :span="1">
        <el-button type="primary" icon="el-icon-search" @click="submit">筛选</el-button>
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
              <h3><strong>课程列表</strong></h3>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">
              <el-button type="primary" icon="el-icon-search" @click="dialogFormVisible = true">添加课程</el-button>
            </div>
          </el-col>
        </el-row>

        <el-dialog width=90% title="课程管理/添加课程" :visible.sync="dialogFormVisible">
          <div class="height_action">请填写课程相关信息</div>
          <div class="demo-input-suffix">
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>课程名称:</h3>
              </el-col>
              <el-col :span="7">
                <el-input placeholder="请输入名称" v-model="upload_course.courseName"></el-input>
              </el-col>
            </el-row>

            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>课程封面:</h3>
              </el-col>
              <el-col :span="7">
                <el-upload auto-upload=false limit=2 action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                  :http-request="modifyHptios2" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                  v-model="transformPhoto.file">
                  <i class="el-icon-plus"></i>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-col>
            </el-row>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>课程状态:</h3>
              </el-col>
              <el-col :span="7">
                <div style="height:15px;"></div>
                <el-switch
                  style="display: block"
                  v-model="upload_course.onLine"
                  active-value=1 
                  inactive-value=0
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="上线状态"
                  inactive-text="下线状态">
                </el-switch>
              </el-col>
            </el-row>
            <div class="height_action_leg"></div>
            <div>
              <h3>课程相关信息</h3>
              <div class="weight_action">
                <el-input type="textarea" :rows="5" placeholder="请输入课程相关信息" v-model="upload_course.courseIntro">
                </el-input>
              </div>
            </div>
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="2">
                <h3>创建人:</h3>
              </el-col>
              <el-col :span="7">
                <el-input placeholder="请输入名字" v-model="action_username_input"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10" pading="30px" >
              <el-col :span="3">
                <h3>添加动作:</h3>
                 </el-col>
                <el-col :span="7">
                        <el-button type="success"  @click="addActionVisible = true" >添加动作</el-button>

              </el-col>
            </el-row>
            <el-row :gutter="10" pading="30px" >
              <el-col :span="3">
                <h3>添加分类标签:</h3>
                 </el-col>
                <el-col :span="7">
                        <el-button type="success"  @click="addClassVisible = true" >添加分类标签</el-button>

              </el-col>
            </el-row>
            <div class="height_action_leg"></div>
            <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5">
                <el-button type="success" >立即添加</el-button>
              </el-col>
              <el-col :span="5">
                <el-button @click="dialogFormVisible = false">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </el-dialog>

        <el-dialog width=50% title="添加动作" :visible.sync="addActionVisible">
          <el-row :gutter="10">
            <el-col :span="10">
               <el-input
                  placeholder="请输入你要搜索的动作"
                  prefix-icon="el-icon-search"
                  size="large"
                  v-model="searchAction">
              </el-input>
            </el-col>
          </el-row>

          <div class="height_action_leg"></div>
          <el-row>
            <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
              <el-card :body-style="{ padding: '0px' }">
                <!-- ljh修改图片类型方便后续修改 -->
                <el-image :src="actionLsit"></el-image>
                <div style="padding: 14px;">
                  <span>运动1min</span>
                    <el-button type="text" class="button">添加</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <el-row>
            <div class="pagination-container">
              <el-pagination
              background
              layout="prev, pager, next"
              :total="1000">
              </el-pagination>
            </div>
          </el-row>

          <el-row :gutter="10">
              <h3>已添加动作</h3>
          </el-row>

          <el-row>
            <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
              <el-card :body-style="{ padding: '0px' }">
                <!-- ljh修改图片类型 -->
                <el-image :src="actionLsit"></el-image>
                <div style="padding: 14px;">
                  <span>运动1min</span>
                    <el-button type="text" class="button">删除</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <div class="height_action_leg"></div>
          <el-row :gutter="10" padding="30px">
            <el-col :span="5" :offset="5">
              <el-button type="success" >确定</el-button>
            </el-col>
            <el-col :span="5">
              <el-button @click="addActionVisible = false">取消</el-button>
            </el-col>
          </el-row>

        </el-dialog>

        <el-dialog width=50% title="添加分类标签" :visible.sync="addClassVisible">
          <el-row :gutter="10">
              <h3>年龄分类</h3>
          </el-row>
          <el-row :gutter="10">
              <template>
                <el-checkbox-group v-model="ageList">
                  <el-checkbox label="3-6岁(幼儿园)"></el-checkbox>
                  <el-checkbox label="7-15岁(小学初中)"></el-checkbox>
                  <el-checkbox label="15-18岁(高中生)"></el-checkbox>
                  <el-checkbox label="19-22岁(大学生)"></el-checkbox>
                </el-checkbox-group>
              </template>
          </el-row>

          <el-row :gutter="10">
              <h3>目标分类</h3>
          </el-row>
          <el-row :gutter="10">
              <template>
                <el-checkbox-group v-model="targetList">
                  <el-checkbox label="热身运动"></el-checkbox>
                  <el-checkbox label="心肺耐力、有氧"></el-checkbox>
                  <el-checkbox label="协调、平衡能力"></el-checkbox>
                  <el-checkbox label="身体稳定性"></el-checkbox>
                  <el-checkbox label="柔韧拉伸"></el-checkbox>
                </el-checkbox-group>
              </template>
          </el-row>

          <el-row :gutter="10">
              <h3>体育达标</h3>
          </el-row>
          <el-row :gutter="10">
              <template>
                <el-checkbox-group v-model="standardsList">
                  <el-checkbox label="50米跑步攻略"></el-checkbox>
                  <el-checkbox label="400米跑步攻略"></el-checkbox>
                  <el-checkbox label="坐位体前屈"></el-checkbox>
                  <el-checkbox label="立定跳远"></el-checkbox>
                  <el-checkbox label="实心球抛掷"></el-checkbox>
                </el-checkbox-group>
              </template>
          </el-row>

          <el-row :gutter="10">
              <h3>专项运动</h3>
          </el-row>
          <el-row :gutter="10">
              <template>
                <el-checkbox-group v-model="specialList">
                  <el-checkbox label="网球"></el-checkbox>
                  <el-checkbox label="乒乓球"></el-checkbox>
                  <el-checkbox label="篮球"></el-checkbox>
                  <el-checkbox label="羽毛球"></el-checkbox>
                  <el-checkbox label="足球"></el-checkbox>
                </el-checkbox-group>
              </template>
          </el-row>

          <el-row :gutter="10">
              <h3>亲子系列</h3>
          </el-row>
          <el-row :gutter="10">
              <template>
                <el-checkbox-group v-model="familyList">
                  <el-checkbox label="A类"></el-checkbox>
                  <el-checkbox label="B类"></el-checkbox>
                  <el-checkbox label="D类"></el-checkbox>
                  <el-checkbox label="E类"></el-checkbox>
                </el-checkbox-group>
              </template>
          </el-row>

          <div class="height_action_leg"></div>
          <el-row :gutter="10" padding="30px">
            <el-col :span="5" :offset="5">
              <el-button type="success" >确定</el-button>
            </el-col>
            <el-col :span="5">
              <el-button @click="addClassVisible = false">取消</el-button>
            </el-col>
          </el-row>
        </el-dialog>

<!--前端分页 list.slice((page-1)*size,page*size) -->
        <el-table
            v-loading = "listLoading"
            :data="list"
            border
            style="width: 100%">
            <el-table-column
              fixed
              prop="Courseld"
              label="课程编号"
              width="100">
            </el-table-column>
            <el-table-column
              prop="CourseName"
              label="课程名"
              width="180">
            </el-table-column>
            <el-table-column
              label="课程封面"
              width="120">
              <template slot-scope="scope">
        　　      <img :src="scope.row.backgroundUrl" width="40" height="40" class="head_pic"/>
        　　   </template>
            </el-table-column>
            <el-table-column
              prop="onLine"
              label="状态"
              width="120"
              >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.onLine? "已上线" : "未上线" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="counts"
              label="动作个数"
              width="120">
            </el-table-column>
            <el-table-column
              prop="joinNum"
              label="参加\预约人数"
              width="120">
            </el-table-column>
            <el-table-column
              prop="creator"
              label="创建人"
              width="150">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="上传时间"
              width="125">
            </el-table-column>
            <el-table-column
            label="操作"
            width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index)">删除</el-button>
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

<style scoped>

.filter-container{
  display: flex;
  border: 1px solid #eee;
  padding: 20px;
  margin-bottom: 20px;
}

.filter-item-container{
  display: flex;
  align-items: center;
  padding-right: 10px;
}


.filter-item-container span{
  margin-right: 8px;
}

.pagination-container{
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.el-table td, .el-table th{
  text-align: center;
}

.height_action{
  height: 50px;
}
.height_action_leg{
  height: 40px;
}
.weight_action{
  width: 50%;
}

/* 卡片布局 */
 .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

</style>
<script>
import { getList,searchCourse,editCourse,deleteCourse,addCourse } from '@/api/course'
import { getToken } from '@/utils/auth'
export default {
    data() {
      return {
        list:[],  //数据格式，改为null会报错
        listLoading: true,
        dialogFormVisible: false,
        addActionVisible:false,
        addClassVisible:false,
        ageList:[],
        targetList:[],
        standardsList:[],
        specialList:[],
        familyList:[],
        state:'',
        options: [{
          value: 1,
          label: '已上线'
        }, {
          value: 0,
          label: '未上线'
        }],
        form:{
          searchOnLine:'',
          searchStartTime:'',
          searchEndTime:'',
          searchCreateTime:'',
          searchCourseKey:''
        },
        selectDelIdx: null,
        searchAction:null,
        page: 1 , //当前页
        size: 10 , //每页展示的条数
        total:null, //数据总条数
        transformPhoto:{
          file:null,
          token:getToken()
        },
        upload_course:{//上传总数据
          token:getToken(),
          courseName:'',
          backgroundUrl:'',
          action:'',
          counts:'',
          onLine:1,
          courseIntro:'',
          targetAge:''
        },
        actionLsit:"https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      }
    },
    created() {
      this.fetchData()
    },
    methods:{
      fetchData() {
        this.listLoading = true
        getList(this.page,this.size).then(response => {

           // var description = "";
           // for(var i in response){
           //  var property=response[i];
           //  description+=i+" = "+property+"\n";
           // }
           // console.log('description'+description);

           this.list = response.data.adminCourseDtosList
          // console.log('response'+response.data)
          // console.log('list:'+this.list)
           this.total = response.data.total
           // console.log('total:'+data.total)
          this.listLoading = false
        })
      },
      handleDelete(index) {
        this.open(index)
      },
      open(index) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      submit(){
        // alert(this.form.searchCreateTime)
        var arr = this.form.searchCreateTime.split(',');
        var searchStartTime = arr[0];
        var searchEndTime = arr[1];
      },
      // 分页
      handleSizeChange(size) {
              // console.log(`每页 ${size} 条`);
              this.size = size;
              //alert("size为"+this.size)
              this.fetchData()
            },
      handleCurrentChange(page) {
              // console.log(`当前页: ${page}`);
              this.page = page;
              //alert("page为"+this.page)
              this.fetchData()
            },
      //上传图片变成url
      transformPhoto(){
        console.log(this.transformPhoto)
        modifyHptIos(this.transformPhoto).then(response => {
          this.courseGroup.classUrl = response.data.url
          console.log(response.data)
        })
      }
    }
  }
</script>
