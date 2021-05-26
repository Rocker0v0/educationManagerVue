<template>
  <div id="homeChildren04">
    <div class="homeChildren_01">
      <div class="top">
        <home-tab-control :data="data"></home-tab-control>
      </div>
      <div class="content">
        <child-content-control
          :options="options"
          :tableData="tableData"
          :titleDate="titleDate"
          :compare="compare"
          @HomeChildFourAdd="addClick"
          @HomeChildFourUpdate="updateClick"
          @HomeChildFourVal="HomeChildFiveVal"
          @HomeChildFourSelectByType="SelectByType"
          @HomeChildFourInit="HomeChildFourInit"
          @HomeChildFourDelAll="HomeChildFourDelAll"
          @HomeChildFourDelOne="HomeChildFourDelAll"
        >
          <template #dialog>
            <el-dialog
              :title="title"
              :visible.sync="dialogFormVisible"
              width="30%"
              center
            >
              <el-form :model="form">
                <el-form-item label="课程名称" :label-width="formLabelWidth">
                  <el-input v-model="form.courseName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.type"
                    placeholder="请选择课程类型"
                    @change="typeChangeHandler"
                    :disabled="isabled"
                  >
                    <el-option label="专业必修" value="专业必修"></el-option>
                    <el-option label="通识选修" value="通识选修"></el-option>
                    <el-option label="学院必修" value="学院必修"></el-option>
                    <el-option label="公共必修" value="公共必修"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="学分" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.credits"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="所属部门" :label-width="formLabelWidth"
               >
                  <el-select
                    v-model="form.deptName"
                    placeholder="请选择所属部门"
                    @focus="deptFocusForCourses"
                    :disabled="isabled"
                  >
                    <el-option
                      v-for="(item, index) in deptNameList"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="exit">取 消</el-button>
                <el-button type="primary" @click="childOneSubmit"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </template>
        </child-content-control>
      </div>
      <div class="empty">
        <div class="page">
          <el-pagination
            @current-change="currentChangeClick"
            background
            layout="prev, pager, next"
            :total="index"
            :current-page.sync="page"
            :page-size.sync="items"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import childContentControl from "../../components/content/HomeCildrenChild/childContentControl.vue";
import homeTabControl from "../../components/content/HomeCildrenChild/homeTabControl.vue";
import {
  getCourseInfoList,
  SelectCourseInfoByType,
  getAbleDeptListForCourseInfo,
  addCourseInfo,
  modifyCourseInfo,
  removeCourseInfo
} from "../../network/CourseInfo";

export default {
  components: { homeTabControl, childContentControl },
  name: "childFour",
  data() {
    return {
      data: "课程信息管理",
      tableData: null,
      titleDate: [
        {
          label: "课程名称",
          prop: "courseName",
        },
        {
          label: "学分",
          prop: "credits",
        },
        {
          label: "课程类型",
          prop: "type",
        },
        {
          label: "所属系别",
          prop: "deptName",
        },
      ],
      options: [
        {
          value: "deptName",
          label: "所属系部",
        },
        {
          value: "courseName",
          label: "课程名称",
        },
        {
          value: "type",
          label: "课程类型",
        }
      ],
      compare: {
         courseName: "课程名称",
          credits: "学分",
          type: "课程类型",
          deptName: "所属系部",
      },
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      thisRow: {},
      deptNameList: ["软件工程学院", "管理学院"],
      title:null,
      items: 11,
      page: 1,
      queryType: null,
      context: null,
      index: null,
      isabled:null,
      isAdd: null,
    };
  },
  methods: {
    // 网络请求
     getCourseInfoListByService(selectCourseInfoByType) {
      getCourseInfoList(selectCourseInfoByType).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.index = res.index;
      });
    },
    //获取部门
    getAbleDeptListForCourseInfoByService(type){
      getAbleDeptListForCourseInfo(type).then(res=>{
        this.deptNameList = res.data
      })
    },
    // 添加
    addCourseInfoByService(courseInfoVo) {
      addCourseInfo(courseInfoVo).then((res) => {
        if (res.status != -1) {
          this.open2("添加成功！");
          let obj = this.getObject(this.page, this.items, this.context);
          this.getCourseInfoListByService(obj);
        }else{
          this.open3("该课程已经存在！")
        }
        this.form = {};
      });
    },
    // 修改
     modifyCourseInfoByService(twoCourseInfoVo) {
      modifyCourseInfo(twoCourseInfoVo).then((res) => {
        if (res.status != -1 && res.status != -2 ) {
          this.open2("修改成功！");
          let obj = this.getObject(this.page, this.items, this.context);
          this.getCourseInfoListByService(obj);
        } else if(res.status == -1){
          this.open3("该课程已经存在！");
        } else {
          this.open3("未修改");
        }
        this.form = {};
      });
    },
    // 删除
    removeCourseInfoByService(list) {
      removeCourseInfo(list).then((res) => {
        if (res.status !=-1) {
          this.open2("删除成功！");
          this.page = 1;
          let obj = this.getObject(1, this.items, this.context);
          this.getCourseInfoListByService(obj);
        }
      });
    },
    currentChangeClick(e) {
      let obj = this.getObject(e, this.items, this.context);
      this.getCourseInfoListByService(obj);
    },
    childOneSubmit() {
      // 提交表单
      this.dialogFormVisible = false;
      if(this.isAdd == true){
         
        if(this.form.courseName&& this.form.type && this.form.credits && this.form.deptName){
            this.addCourseInfoByService(this.form)
        }else{
          this.open3("有未填写的表单!")
        }
      }else{
        let obj = {};
        obj.newCourseInfoVo = this.form
        obj.oldCourseInfoVo = this.thisRow
        this.modifyCourseInfoByService(obj)
      }
    },

    // 提示
    open2(message) {
      this.$message({
        message,
        type: "success",
      });
    },
    open3(message) {
      this.$message({
        message,
        type: "warning",
      });
    },
    getObject(page, items, context) {
      let obj = null;
      // page, items, courseName, type, deptName
      switch (this.queryType) {
        case "courseName":
          obj = new SelectCourseInfoByType(page, items, context, null, null);
          break;
        case "type":
          obj = new SelectCourseInfoByType(page, items, null, context, null);
          break;
        case "deptName":
          obj = new SelectCourseInfoByType(page, items, null, null, context);
          break;
        default:
          obj = new SelectCourseInfoByType(page, items, null, null, null);
      }
      return obj;
    },
    updateClick(index, row) {
      console.log(index, row);
      this.isAdd = false;
      this.isabled = true;
      this.dialogFormVisible = true;
      this.thisRow = row;
      this.title = "修改课程信息";
      for (const key in row) {
        this.$set(this.form, key, row[key]);
      }
    },
    addClick() {
      this.title = "新增课程信息";
      this.isabled = false;
      this.dialogFormVisible = true;
      this.isAdd = true
    },
    exit() {
      this.dialogFormVisible = false;
      this.form = {};
      this.thisRow = {};
    },
    typeChangeHandler() {
      this.$set(this.form, 'deptName', null)
    },
    deptFocusForCourses(){
      if(this.form.type){
          this.getAbleDeptListForCourseInfoByService(this.form.type)
      }else{
        this.deptNameList= null;
      }
      
    },
    HomeChildFiveVal(value){
      this.queryType = value
    },
    SelectByType(context,page){
      this.context = context;
      this.page = page;
      let obj = this.getObject(this.page, this.items, this.context);
      this.getCourseInfoListByService(obj);
    },
    HomeChildFourInit(){
      let obj = new SelectCourseInfoByType(1, 11, null, null, null);
      this.getCourseInfoListByService(obj);
      this.context = null;
    },
    HomeChildFourDelAll(dataonLineListSelections){
        let list = [];
      for (var i = 0; i < dataonLineListSelections.length; i++) {
        list.push(dataonLineListSelections[i].courseId);
      }
      console.log(list);
      this.removeCourseInfoByService(list);
    }
  },
  created() {
    let obj = this.getObject(this.page, this.items, this.context);
    this.getCourseInfoListByService(obj);
  },
};
</script>

<style scoped>
#homeChildren04 {
  background: rgb(250, 250, 250);
}
#homeChildren04 > div {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
.homeChildren_01 > div {
  width: 100%;
}
.top {
  height: 3%;
}
.content {
  height: 86.5%;
  position: relative;
}
.empty {
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
