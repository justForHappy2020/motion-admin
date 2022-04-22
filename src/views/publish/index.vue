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
         <mavon-editor  :toolbars="markdownOption" v-model="content"/>
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
      markdownOption: {
          bold: true, // 粗体
      italic: true, // 斜体
      header: true, // 标题
      underline: true, // 下划线
      strikethrough: true, // 中划线
      mark: true, // 标记
      superscript: true, // 上角标
      subscript: true, // 下角标
      quote: true, // 引用
      ol: true, // 有序列表
      ul: true, // 无序列表
      link: true, // 链接
      imagelink: true, // 图片链接
      code: true, // code
      table: true, // 表格
      fullscreen: true, // 全屏编辑
      readmodel: true, // 沉浸式阅读
      htmlcode: true, // 展示html源码
      help: true, // 帮助
      /* 1.3.5 */
      undo: true, // 上一步
      redo: true, // 下一步
      trash: true, // 清空
      save: true, // 保存（触发events中的save事件）
      /* 1.4.2 */
      navigation: true, // 导航目录
      /* 2.1.8 */
      alignleft: true, // 左对齐
      aligncenter: true, // 居中
      alignright: true, // 右对齐
      /* 2.2.1 */
      subfield: true, // 单双栏模式
      preview: true, // 预览
      },
      handbook: "#### how to use mavonEditor in nuxt.js"
    }
  }

 }
</script>