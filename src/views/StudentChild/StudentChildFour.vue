<template>
  <div id="StudentChild04">
    <div class="homeChildren_01">
      <div class="top">
        <home-tab-control :data="data"></home-tab-control>
      </div>

      <div class="content">
        <child-content-control
          :tableData="tableData"
          :titleDate="titleDate"
          :compare="compare"
          :options="options"
          @StudentChildFourUpdate="deletStudentChildFourClick"
          @StudentChildFourVal="StudentChildFourVal"
          @StudentChildFourSelectByType="SelectByType"
          @StudentChildFourInit="StudentChildFourInit"
        >
          <template #deletText> 退课 </template>
          <template #StudentChildThreeSmaster>
            <el-select
              style="width: 150px; margin-left: 10px"
              v-model="value"
              clearable
              placeholder="请选择学期"
            >
              <el-option
                v-for="(item, key) in smaster_list"
                :key="key"
                :value="item"
              >
              </el-option>
            </el-select>
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
  getAllAlReadingCourse,
  SelectStudentClientGrade,
  removeMyChooseCourse,
} from "../../network/studentClient";
export default {
  components: { homeTabControl, childContentControl },
  name: "childOne",
  data() {
    return {
      data: "选课",
      tableData: null,
      titleDate: [
        {
          label: "课程名称",
          prop: "courseName",
        },
        {
          label: "负责老师",
          prop: "teacherName",
        },
        {
          label: "开课周数",
          prop: "startWeek",
        },
        {
          label: "结课周数",
          prop: "endWeek",
        },
        {
          label: "教室",
          prop: "classRoomName",
        },
        {
          label: "上课时间一",
          prop: "classOne",
        },
        {
          label: "上课时间二",
          prop: "classTwo",
        },
      ],
      compare: {
        courseName: "课程名称",
        teacherName: "教室名称",
        startWeek: "开始周数",
        endWeek: "结束周数",
        day: "星期",
        classOne: "上课时间一",
        classTwo: "上课时间二",
        classRoomName: "教室",
        semester: "学期",
      },
      options: [
        {
          value: "courseName",
          label: "课程名称",
        },
        {
          value: "teacherName",
          label: "科任老师",
        },
      ],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      thisRow: {},
      value: null,
      smaster_list: ["0", "1", "2", "3", "4", "5", "6", "7"],
      queryType: null,
      context: null,
      page: 1,
      items: 11,
      index: null,
      sno: null,
    };
  },
  methods: {
    // 网络请求
    getAllAlReadingCourseByService(selectMyCourseVo) {
      getAllAlReadingCourse(selectMyCourseVo).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.index = res.index;
      });
    },
    //退课
    removeMyChooseCourseByService(myCourseStudentClientVo) {
      removeMyChooseCourse(myCourseStudentClientVo).then((res) => {
        if (res.status != -2) {
          this.open2("退课成功！");
          let obj = this.getObject(this.page, this.items, this.context);
          if (this.sno) this.getAllAlReadingCourseByService(obj);
        }else{
          this.open3("该课程已经结课，不能退课！");
        }
      });
    },
    getObject(page, items, context) {
      let obj = null;
      switch (this.queryType) {
        case "courseName":
          obj = new SelectStudentClientGrade(
            page,
            items,
            this.value,
            context,
            null,
            this.sno
          );
          break;
        case "teacherName":
          obj = new SelectStudentClientGrade(
            page,
            items,
            this.value,
            null,
            context,
            this.sno
          );
          break;
        default:
          obj = new SelectStudentClientGrade(
            page,
            items,
            this.value,
            null,
            null,
            this.sno
          );
      }
      return obj;
    },
    currentChangeClick(e) {
      let obj = this.getObject(e, this.items,this.context);
      this.getAllAlReadingCourseByService(obj);
    },
    StudentChildFourVal(value) {
      this.queryType = value;
    },
    SelectByType(context, page) {
      this.context = context;
      this.page = page;
      console.log(this.queryType);
      console.log(this.context);
      let obj = this.getObject(this.page, this.items, this.context);
      this.getAllAlReadingCourseByService(obj);
    },
    StudentChildFourInit() {
      this.context = null;
      this.queryType = null;
      if (this.value != null) {
        this.value = null;
      } else {
        let obj = this.getObject(this.page, this.items, this.context);
        this.getAllAlReadingCourseByService(obj);
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
    exit() {
      this.dialogFormVisible = false;
      this.form = {};
      this.thisRow = {};
    },
    deletStudentChildFourClick(index, row) {
      console.log(row);
      this.$confirm("是否退掉该课程？")
        .then((_) => {
          if (row.type != "通识选修") {
            this.open3("必修课程不能退课!");
          } else {
            row.studentId = this.sno;
            this.removeMyChooseCourseByService(row);
          }
          done();
        })
        .catch((_) => {});
    },
  },
  created() {
    this.sno = this.$parent.sno;
    let obj = this.getObject(this.page, this.items, this.context);
    if (this.sno) this.getAllAlReadingCourseByService(obj);
  },
  watch: {
    value: function (newVal, oldVal) {
      let obj = this.getObject(this.page, this.items, this.context);
      console.log(obj);
      this.getAllAlReadingCourseByService(obj);
    },
  },
};
</script>

<style >
#StudentChild04 {
  background: rgb(250, 250, 250);
}
#StudentChild04 > div {
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