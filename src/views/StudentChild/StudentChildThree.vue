<template>
  <div id="StudentChild03">
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
          @StudentChildThreeVal="StudentChildThreeVal"
          @StudentChildThreeSelectByType="SelectByType"
          @StudentChildThreeInit="StudentChildThreeInit"
          @StudentChildThreeUpdate="StudentChildThreeDelOne"
        >
          <template #deletText>选课</template>
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
  getAllMyCourse,
  SelectMyCourse,
  chooseMyCourse,
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
      classType: "primary",
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
    getAllMyCourseByService(selectMyCourseVo) {
      getAllMyCourse(selectMyCourseVo).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.index = res.index;
      });
    },
    //选课
    chooseMyCourseByService(myCourseStudentClientVo) {
      chooseMyCourse(myCourseStudentClientVo).then((res) => {
        if (res.status == -1) {
          this.open3("所选课程与已选课程冲突!");
        } else {
          this.open2("选课成功!");
          let obj = this.getObject(1, 11, this.context);
          if (this.sno) this.getAllMyCourseByService(obj);
        }
      });
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
      switch (this.queryType) {
        case "courseName":
          obj = new SelectMyCourse(page, items, context, null, this.sno);
          break;
        case "teacherName":
          obj = new SelectMyCourse(page, items, null, context, this.sno);
          break;
        default:
          obj = new SelectMyCourse(page, items, null, null, this.sno);
      }
      return obj;
    },
    currentChangeClick(e) {
      let obj = this.getObject(e, this.items,this.context);
      this.getAllMyCourseByService(obj);
    },
    exit() {
      this.dialogFormVisible = false;
      this.form = {};
      this.thisRow = {};
    },
    StudentChildThreeDelOne(index, row) {
      this.$confirm("是否确认选课？")
        .then((_) => {
          for (const key in row) {
            this.$set(this.form, key, row[key]);
          }
          this.form.studentId = this.sno;
          console.log(this.form);
          this.chooseMyCourseByService(this.form);
          done();
        })
        .catch((_) => {});
    },
    StudentChildThreeInit() {
      this.context = null;
      this.queryType = null;

      let obj = this.getObject(this.page, this.items, this.context);
      this.getAllMyCourseByService(obj);
    },
    StudentChildThreeVal(value) {
      this.queryType = value;
    },
    SelectByType(context, page) {
      this.context = context;
      this.page = page;
      let obj = this.getObject(this.page, this.items, this.context);
      this.getAllMyCourseByService(obj);
    },
  },
  created() {
    this.sno = this.$parent.sno;
    let obj = this.getObject(1, 11, this.context);
    if (this.sno) this.getAllMyCourseByService(obj);
  },
};
</script>

<style scoped>
#StudentChild03 {
  background: rgb(250, 250, 250);
}
#StudentChild03 > div {
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
span {
  color: rgb(148, 148, 144);
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