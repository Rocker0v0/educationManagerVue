<template>
  <div id="homeChildren08">
    <div class="homeChildren_01">
      <div class="top">
        <home-tab-control :data="data"></home-tab-control>
      </div>

      <div class="content">
        <child-content-control
          :tableData="tableData"
          :titleDate="titleDate"
          :compare="compare"
          :year="year"
          :classNameList="classNameList"
          :courseNameList="courseNameList"
          @HomeChildEightSelectByType="SelectByType"
          @HomeChildEightDelAll="HomeChildEightDelAll"
          @HomeChildEightDelOne="HomeChildEightDelAll"
          @HomeChildEightUpdate="updateClick"
          @HomeChildEightYear="HomeChildEightYear"
          @HomeChildEightInit="HomeChildEightInit"
          @HomeChildEightClassName="HomeChildEightClassName"
          @HomeChildEightCourseName="HomeChildEightCourseName"
          @HomeChildEightBlur="HomeChildEightBlur"
          @HomeChildEightCourseNameBlur="HomeChildEightCourseNameBlur"
        >
          <template #dialog>
            <el-dialog
              title="新增学生"
              :visible.sync="dialogFormVisible"
              width="30%"
              center
            >
              <el-form :model="form">
                <el-form-item label="成绩" :label-width="formLabelWidth">
                  <el-input v-model="form.grade" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="exit">取 消</el-button>
                <el-button type="primary" @click="childOneSubmit"
                  >确定</el-button
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

<script scoped>
import childContentControl from "../../components/content/HomeCildrenChild/childContentControl.vue";
import homeTabControl from "../../components/content/HomeCildrenChild/homeTabControl.vue";
import {
  getGradeManagerAllInfo,
  GradeManagerSelectByType,
  getAllReadCourseNameInfo,
  getAllReadClassNameInfo,
  removeScInfoByPrimaryIdsList,
  modifyScInfoByPrimaryIdsList,
} from "../../network/GradeManager";
import { getClassYearList } from "../../network/ChooseCourseForClass";
export default {
  components: { homeTabControl, childContentControl },
  name: "childOne",
  data() {
    return {
      data: "学生成绩管理",
      tableData: null,
      titleDate: [
        {
          label: "年级",
          prop: "year",
        },
        {
          label: "学号",
          prop: "studentId",
        },
        {
          label: "姓名",
          prop: "studentName",
        },
        {
          label: "课程名称",
          prop: "courseName",
        },
        {
          label: "成绩",
          prop: "grade",
        },
      ],
      compare: {
        year: "年级",
        studentId: "学号",
        studentName: "姓名",
        type: "课程类型",
        courseName: "课程名称",
        teacherName: "科任老师",
        grade: "成绩",
        className: "班级",
      },
      courseNameList: null,
      classNameList: null,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      thisRow: {},

      year: null,
      queryYear: null,
      context: null,
      index: null,
      items: 11,
      page: 1,
      courseName: null,
      className: null,
    };
  },
  methods: {
    // 网络请求
    getGradeManagerAllInfoByService(gradeManagerSelectByType) {
      getGradeManagerAllInfo(gradeManagerSelectByType).then((res) => {
        this.tableData = res.data;
        this.index = res.index;
      });
    },
    getAllReadCourseNameInfoByService(teacherId,year) {
      getAllReadCourseNameInfo(teacherId,year).then((res) => {
        this.courseNameList = res.data;
      });
    },
    removeScInfoByPrimaryIdsListByService(list) {
      removeScInfoByPrimaryIdsList(list).then((res) => {
        if (res.status == 200) {
          this.open2("删除成功！")
          this.page = 1;
          let obj = this.getObject(
            1,
            this.items,
            this.queryYear,
            this.courseName,
            this.className,
            this.context
          );
          this.getGradeManagerAllInfoByService(obj);
        }
      });
    },
    modifyScInfoByPrimaryIdsListByService(primaryId, grade) {
      return modifyScInfoByPrimaryIdsList(primaryId, grade);
    },
    getAllReadClassNameInfoByService(year,courseName,teacherId) {
      getAllReadClassNameInfo(year,courseName,teacherId).then((res) => {
        this.classNameList = res.data;
      });
    },
    currentChangeClick(e) {
      let obj = this.getObject(
        e,
        this.items,
        this.queryYear,
        this.courseName,
        this.className,
        this.context
      );
      this.getGradeManagerAllInfoByService(obj);
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
    getObject(page, items, year, courseName, className, studentId,teacherId) {
      let obj = null;
      obj = new GradeManagerSelectByType(
        page,
        items,
        year,
        courseName,
        className,
        studentId,
        teacherId
      );
      return obj;
    },
    getClassYearListByService() {
      return getClassYearList();
    },
    childOneSubmit() {
      // 提交表单
      if(!this.form.grade){
        this.open3("无效修改")
        this.dialogFormVisible = false;
        this.form = {};
        return
      }
      this.modifyScInfoByPrimaryIdsListByService(
        this.form.primaryId,
        this.form.grade
      ).then((res) => {
        this.dialogFormVisible = false;
        this.form = {};
        if (res.status == 200) {
          this.open2("修改成功")
          let obj = this.getObject(
            this.page,
            this.items,
            this.queryYear,
            this.courseName,
            this.className,
            this.context,
            null
          );
          this.getGradeManagerAllInfoByService(obj);
        }
      });
    },
    updateClick(index, row) {
      this.dialogFormVisible = true;
      this.thisRow = row;
      this.$set(this.form, "grade", row.grade);
      this.$set(this.form, "primaryId", row.primaryId);
    },
    exit() {
      this.dialogFormVisible = false;
      this.form = {};
      this.thisRow = {};
    },
    HomeChildEightInit() {
      let obj = this.getObject(this.page, this.items, null, null, null, null);
      this.getGradeManagerAllInfoByService(obj);
      this.context = null;
    },
    SelectByType(context, page) {
      this.context = context;
      this.page = page;
      let obj = this.getObject(
        this.page,
        this.items,
        this.queryYear,
        this.courseName,
        this.className,
        this.context,
        null
      );
      this.getGradeManagerAllInfoByService(obj);
    },
    HomeChildEightYear(value) {
      this.queryYear = value;
    },
    HomeChildEightClassName(value) {
      this.className = value;
    },
    HomeChildEightCourseName(value) {
      this.courseName = value;
    },
    HomeChildEightDelAll(dataonLineListSelections) {
      let list = [];
      for (var i = 0; i < dataonLineListSelections.length; i++) {
        list.push(dataonLineListSelections[i].primaryId);
      }
      this.removeScInfoByPrimaryIdsListByService(list);
    },
    HomeChildEightBlur(){
      this.getAllReadClassNameInfoByService(this.queryYear,this.courseName,null);
    },
    HomeChildEightCourseNameBlur(){
      if(this.queryYear){
        this.getAllReadCourseNameInfoByService(null,this.queryYear);
      }
    }
  },

  created() {
    let arr = [];
    this.getClassYearListByService().then((res) => {
      arr = res.data;
      this.year = arr;
    });
    let obj = new GradeManagerSelectByType(1, 11, null, null, null, null, null);
    this.getGradeManagerAllInfoByService(obj);
  },
};
</script>

<style scoped>
#homeChildren08 {
  background: rgb(250, 250, 250);
}
#homeChildren08 > div {
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
