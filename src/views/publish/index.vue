<template>
  <div class="app-container">
    <h2>发布文章</h2>
    <div class="filter-container">
    <div>
      <span>
            <el-row :gutter="10" padding="30px">
                <el-col :span="2">
                  <h3>标题:</h3>
                </el-col>
                <el-col :span="7">
                    <el-input placeholder="请输入内容"></el-input>
                </el-col> 
            </el-row>
      <el-row :gutter="10" padding="30px">
      <el-col :span="3">
         <h3>作者(姓名):{{content}}</h3>
      </el-col>
      <el-col :span="7">
          <el-input placeholder="请输入内容"></el-input>
      </el-col>
       </el-row>
      </span>
      <div id="edit">
         <mavon-editor v-model="content"/>
     </div>
       <div class="height_action_leg"></div>
       <div class="button">
               <el-row :gutter="10" padding="30px">
              <el-col :span="5" :offset="5" class="queren">
                <el-button type="success" >确认发布</el-button>
              </el-col>
              <el-col :span="5">
                <el-button @click="dialogTableVisible = false">取消</el-button>
              </el-col>
            </el-row>
      </div>
  </div>  </div>  </div>
   
</template>

<style>
 .filter-container {
    display: flex;
    border: 1px solid #eee;
    padding: 20px;
    margin-bottom: 20px;
  }
  #edit{
    margin-top: 20px;
  }
  .height_action_leg{
  height: 25px;
}
.button{
   display: flex;

  justify-content: center;
}
.queren{
  margin-right: 100px;
}
</style>

<script>
 export default{

  data(){
    return{
      content:'',
    }
  }

 }
</script>