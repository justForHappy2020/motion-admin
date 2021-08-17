<template>
  <div class="app-container">
    <div>
      <h2>分类筛选</h2>
      <div class="filter-container">
        <div class="filter-item-container">
          <span>分类项数量</span>
          <el-select v-model="form.search_categoryNum" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="filter-item-container">
          <span>创建时间</span>
          <el-date-picker v-model="value_data" type="datetimerange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="filter-item-container search">
          <el-input v-model="form.search_categoryKey" placeholder="请输入课程分类名的关键字"></el-input>
        </div>

        <el-button type="primary" icon="el-icon-search">筛选</el-button>
      </div>
      <div class="filter-container">
        <span>
          <el-row :gutter="24">
            <el-col :span="20">
              <div class="grid-content bg-purple">
                <h3><strong>分类列表</strong></h3>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light " style="margin-right:1px;">
                <el-button type="primary" icon="el-icon-search" @click="dialogFormVisible = true">添加课程分类</el-button>
              </div>
            </el-col>
          </el-row>
<!-- 添加分类项的弹窗 -->
          <el-dialog custom-class="scroll" width=90% title="课程分类管理/添加分类" :visible.sync="dialogFormVisible">
            <div class="height_action">请填写课程分类相关信息</div>
            <div class="demo-input-suffix">
<!--              <el-row :gutter="10" pading="30px">
                <el-col :span="3">
                  <h3>创建人:</h3>
                </el-col>
                <el-col :span="7">
                  <el-input placeholder="请输入名字" v-model="action_name_input"></el-input>
                </el-col>
              </el-row> -->
              <el-row :gutter="10">
                <el-col :span="3">
                  <h3>课程分类组名称:</h3>
                </el-col>
                <el-col :span="7">
                  <el-input placeholder="请输入名称" v-model="courseGroup.className"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="3">
                  <h3>课程分类组封面:</h3>
                </el-col>
                <el-col :span="10">
                  <el-upload
                  auto-upload=false
                  limit=1
                  action="http://106.55.25.94:8080/api/user/modifyHptIos"
                  :data="transformPhoto"
                  accept=".jpg,.png"
                  drag="true"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="transformPhoto2List"
                  name="headPortrait"
                  v-model="transformPhoto.file"
                  >
                    <i class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且最多仅支持上传一张图片</div>
                    <div class="el-upload__tip" slot="tip"> </div>
                  </el-upload>
                </el-col>
              </el-row>
              <div class="height_action"></div>
              <el-row :gutter="10" pading="30px">
                <el-col :span="5" :offset="5">
                  <el-button type="success" @click="addCourseGroup">确认添加分类组</el-button>
                </el-col>
                <el-col :span="5">
                  <el-button @click="dialogFormVisible = false">取消</el-button>
                </el-col>
              </el-row>

              <div class="height_action"></div>
              <el-divider><font color="red">添加分类项前请务必先添加分类组</font></el-divider>

              <div class="height_action"></div>
              <el-row :gutter="10">
                <el-col :span="3">
                  <h3>添加分类项:</h3>
                </el-col>
                <el-col :span="7">
                  <el-button type="success" @click="addChild">点击添加分类项</el-button>
                </el-col>
              </el-row>
              <section>
                <div class="height_action"></div>
                <template v-for="(item,index) in courseClassList">
                  <span  v-if="item.type_old === 'child'">
                    <el-row :gutter="20">
                      <el-col :span="3">
                        <h3>分类项名{{index + 1}}</h3>
                      </el-col>
                      
                      
                      <el-col :span="7">
                        <el-input placeholder="请输入内容" v-model="courseClassList[index].classValue"></el-input>
                      </el-col>
                      <el-col :span="2">
                        <el-button @click="delect_action(index)">取消</el-button>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="3">
                        <h3>分类项名{{index + 1}}封面:</h3>
                      </el-col>
                      <el-col :span="10">
                        <el-upload auto-upload=false limit=1  action="http://106.55.25.94:8080/api/user/modifyHptIos"
                          :data="transformPhoto"
                          :before-upload="change_number(index)"
                          :on-success="insert_photo"
                          name="headPortrait"
                          list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                          <i class="el-icon-plus"></i>
                          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                          <div class="el-upload__tip" slot="tip"> </div>

                        </el-upload>
                      </el-col>
                    </el-row>
                    <div class="height_action"></div>
                  </span>
                </template>
              </section>

              <div class="height_action"></div>
              <el-row :gutter="10" pading="30px">
                <el-col :span="5" :offset="5">
                  <el-button type="success" @click="addCourseClass">确认添加分类项</el-button>
                </el-col>
                <el-col :span="5">
                  <el-button @click="dialogFormVisible = false">取消</el-button>
                </el-col>
              </el-row>
            </div>
          </el-dialog>
<!-- 修改分类项弹窗 -->
 <el-dialog custom-class="scroll" width=90% title="课程分类管理/编辑分类" :visible.sync="dialogTableVisible">
            <div class="height_action">请填写课程分类相关信息</div>
            <div class="demo-input-suffix">
<!--              <el-row :gutter="10" pading="30px">
                <el-col :span="3">
                  <h3>创建人:</h3>
                </el-col>
                <el-col :span="7">
                  <el-input placeholder="请输入名字" v-model="action_name_input"></el-input>
                </el-col>
              </el-row> -->
              <el-row :gutter="10">
                <el-col :span="3">
                  <h3>课程分类组名称:</h3>
                </el-col>
                <el-col :span="7">
                  <el-input  v-model=" change_course_class.className"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="3">
                  <h3>课程分类组封面:</h3>
                </el-col>
                <el-col :span="10">
                  <el-upload
                  auto-upload=false
                  limit=1
                  action="http://106.55.25.94:8080/api/user/modifyHptIos"
                  :data="transformPhoto"
                  accept=".jpg,.png"
                  drag="true"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="change_imgs" 
                  :file-list="show_img"
                  name="headPortrait"
                  v-model="transformPhoto.file"
                  >
                    <i class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且最多仅支持上传一张图片</div>
                    <div class="el-upload__tip" slot="tip"> </div>
                  </el-upload>
                </el-col>
              </el-row>
              <div class="height_action"></div>
              <el-row :gutter="10" pading="30px">
                <el-col :span="5" :offset="5">
                  <el-button type="success" @click="updata_course_class();">确认更新分类组</el-button>
                </el-col>
                <el-col :span="5">
                  <el-button @click="dialogTableVisible = false">取消</el-button>
                </el-col>
              </el-row>

              <div class="height_action"></div>
              <el-divider><font color="red">添加分类项前请务必先添加分类组</font></el-divider>

              <div class="height_action"></div>
              <el-row :gutter="10">
                <el-col :span="3">
                  <h3>添加分类项:</h3>
                </el-col>
                <el-col :span="7">
                  <el-button type="success" @click="change_change_Child">点击添加分类项</el-button>
                </el-col>
              </el-row>
              <section>
                <div class="height_action"></div>
                <template v-for="(item,index) in  change_course_class.courseClassList">
                  <span>
                    <el-row :gutter="20">
                      <el-col :span="3">
                        <h3>分类项名{{index + 1}}</h3>
                      </el-col>
                      
                      
                      <el-col :span="7">
                        <el-input  v-model="change_course_class.courseClassList[index].classValue"></el-input>
                      </el-col>
                      <el-col :span="2">
                        <el-button @click="delect_change_action(index)">取消</el-button>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="3">
                        <h3>分类项名{{index + 1}}封面:</h3>
                      </el-col>
                      <el-col :span="10">
                        <el-upload auto-upload=false limit=1  action="http://106.55.25.94:8080/api/user/modifyHptIos"
                          :data="transformPhoto"
                          :before-upload="change_number(index)"
                          :on-success="change_photo"
                          :file-list="change_courseClassList[index]"
                          name="headPortrait"
                          list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                          <i class="el-icon-plus"></i>
                          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                          <div class="el-upload__tip" slot="tip"> </div>

                        </el-upload>
                      </el-col>
                    </el-row>
                    <div class="height_action"></div>
                  </span>
                </template>
              </section>

              <div class="height_action"></div>
              <el-row :gutter="10" pading="30px">
                <el-col :span="5" :offset="5">
                  <el-button type="success" @click="updata_course_class();TableVisible();">确认添加分类项</el-button>
                </el-col>
                <el-col :span="5">
                  <el-button @click="dialogTableVisible = false">取消</el-button>
                </el-col>
              </el-row>
            </div>
          </el-dialog>

          <el-table v-loading="listLoading" :data="list" border style="width: 100%">
            <el-table-column fixed prop="courseClassId" label="课程编号" width="100">
            </el-table-column>
            <el-table-column prop="className" label="分类名" width="200">
            </el-table-column>

            <el-table-column prop="classNum" label="分类项数量" width="120">
            </el-table-column>

            <el-table-column prop="classValue" label="包含的分类项名" width="350">
            </el-table-column>

            <el-table-column prop="classCreator" label="创建人" width="120">
            </el-table-column>

            <el-table-column prop="classCreateTime" label="创建时间" width="120">
            </el-table-column>

            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="mini" @click="dialogTableVisible = true;handleEdit(scope.row);show_imgs()">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.courseClassId)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>

        </span>
      </div>
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

  .filter-item-container {
    display: flex;
    align-items: center;
    padding-right: 10px;
  }

  .filter-item-container.search {
    flex: 1;
  }

  .height_action {
    height: 50px;
  }

  .filter-item-container span {
    margin-right: 8px;
  }

  .scroll {

    overflow: scroll;
  }

  .el-table td,
  .el-table th {
    text-align: center;
  }

  .left {
    float: left
  }

  .reght {
    float: right
  }
</style>


<script>
  import {
    getList,
    addCourseList,
    deleteCourseClass,
    addCourseGroupList,
    updataCourseClass,
    modifyHptIos,
  } from '@/api/courseClass'
  import { getToken } from '@/utils/auth'
  
  import { getAction } from '@/api/action'

  export default {

    data() {
      return {
        dialogFormVisible: false,
        dialogTableVisible: false,
        listLoading: true,
        options: [{
            value: 1,
            label: '1项'
          },
          {
            value: 2,
            label: '2项'
          },
          {
            value: 3,
            label: '3项'
          },
          {
            value: 4,
            label: '4项'
          },
          {
            value: 5,
            label: '5项'
          },
          {
            value: 6,
            label: '6项'
          },
          {
            value: 7,
            label: '7项'
          },
          {
            value: 8,
            label: '8项'
          },
          {
            value: 9,
            label: '9项'
          },
          {
            value: 10,
            label: '10项'
          }
        ],
        child: 0,
        chang_child:0,
        list: [],
        courseClassList:[], //分类项列表
        form: {
          search_categoryNum: '',
          search_categoryDate: '',
          search_categoryKey: ''
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
        
        change_course_class:{
           courseClassId:0,
           className:'',
           classUrl:'',
           courseClassList:[]
           },  
        courseClass_number:0,//记录正在操作的分类项
        change_courseClass_number:0,
        change_courseClassList:[]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.data.adminCourseClassDtoList
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
           this.delete_course_class(index)
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
      addChild() {
        this.child++
        this.courseClassList.push({
          type_old: 'child',
          token:getToken(),
          className:"",
          classValue:"",
          classUrl:''
        })
      },
      //上传图片转换为url
      transformPhoto(){
        console.log(this.transformPhoto)
        modifyHptIos(this.transformPhoto).then(response => {
          this.courseGroup.classUrl = response.data.url
          console.log(response.data)
        })
      },
      //修改操作位
      change_number(val){
        this.courseClass_number=val;
      },
      //照片变成Url
      insert_photo(response){
        this.courseClassList[this.courseClass_number].classUrl=response.data;
      },
      change_photo(response){
        this.change_course_class.courseClassList[this.change_courseClass_number].classUrl=response.data;
      },
      //照片存储
      transformPhoto2List(response){
        console.log(response)
        this.courseGroup.classUrl=response.data;
      },
      //添加分类组
      addCourseGroup(){
        addCourseGroupList(this.courseGroup).then(response => {
          alert('上传成功')
        })
      },
      addCourseClass(){
        for(let t1=0;t1<this.courseClassList.length;t1++){
          this.courseClassList[t1].className=this.courseGroup.className;
          addCourseList(this.courseClassList[t1])
        }
        dialogFormVisible = false
      },
      //删除list
      delect_action(val){
        this.courseClassList.splice(val,1)
      },
      delete_course_class(index){
        deleteCourseClass(getToken(),index)
      },
      //修改分类项
       changeChild() {
        this.change_child++
        this.change_course_class.courseClassList.push({
          type_old: 'child',
          token:getToken(),
          className:"",
          classValue:"",
          classUrl:''
        })
      },
      change_change_Child() {
        this.child++
        this.change_course_class.courseClassList.push({
          type_old: 'child',
          token:getToken(),
          className:"",
          classValue:"",
          classUrl:''
        })
      },
      //修改课程信息
       handleEdit(row){
         console.log(row);
         
        this.change_course_class.className=row.className;
        this.change_course_class.classUrl=row.classUrl;
        this.change_course_class.courseClassId=row.courseClassId;
        this.change_course_class.courseClassList=row.courseClassList;
        this.change_child=row.courseClassList.length;
        for(let t1=0;t1<row.courseClassList.length;t1++){
          this.change_courseClassList.push([{
            name:row.courseClassList[t1].className,
            url:row.courseClassList[t1].classUrl
          }])
        }
        // this.change_course_class.courseClassList.classListUrl=row.classListUrl;

      },
       change_imgs(response){
         this.change_course_class.classUrl=response.data
      },
      show_imgs(){
       this.show_img[0].url=this.change_course_class.classUrl;
       this.show_img[0].name=this.change_course_class.className;
      },
      updata_course_class(){ 
        console.log(this.change_course_class);
       updataCourseClass(this.change_course_class)
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
        });
        
      },
      TableVisible(){
        this.dialogTableVisible =false;
      }
    }
  }
</script>
