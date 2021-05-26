<template>
  <div id="StudentChild02">
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
          @StudentChildTwoVal="StudentChildTwoVal"
          @StudentChildTwoSelectByType="SelectByType"
          @StudentChildTwoInit="StudentChildTwoInit"
        >
          <template #StudentChildThreeSmaster>
            <span v-html="'&nbsp;&nbsp;学期:'"> </span>
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
  getAllGradeForStudentCli,
  SelectStudentClientGrade,
} from "../../network/studentClient";
export default {
  components: { homeTabControl, childContentControl },
  name: "childOne",
  data() {
    return {
      data: "学生信息管理",
      tableData: null,
      titleDate: [
        {
          label: "课程名称",
          prop: "courseName",
        },
        {
          label: "科任老师",
          prop: "teacherName",
        },
        {
          label: "课程类型",
          prop: "type",
        },
        {
          label: "学分",
          prop: "credits",
        },
        {
          label: "成绩",
          prop: "grade",
        },
      ],
      compare: {
        courseName: "课程名称",
        teacherName: "科任教师",
        type: "课程类型",
        credits: "学分",
        grade: "成绩",
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
      course_list: [
        "大学语文",
        "高等数学",
        "计算机基础",
        "数据库概论",
        "数据库原理及应用",
        "计算机组成原理",
        "计算机网络",
        "数据结构",
        "人工智能",
        "Java程序设计",
        "数字逻辑",
        "电子线路",
        "操作系统",
        "编译原理",
        "艺术欣赏",
        "软件工程导论",
        "计算理论",
        "大学生就业指导",
        "环境概论",
        "青少年心理健康",
        "线性代数",
      ],
      smaster_list: ["0", "1", "2", "3", "4", "5", "6", "7"],
      queryType: null,
      context: null,
      page: 1,
      items: 12,
      index: null,
      sno: null,
    };
  },
  methods: {
    // 网络请求
    getAllGradeForStudentCliByService(selectStudentClientGrade) {
      getAllGradeForStudentCli(selectStudentClientGrade).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.index = res.index;
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
      this.getAllGradeForStudentCliByService(obj);
    },
    exit() {
      this.dialogFormVisible = false;
      this.form = {};
      this.thisRow = {};
    },
    StudentChildTwoVal(value) {
      this.queryType = value;
    },
    SelectByType(context, page) {
      this.context = context;
      this.page = page;
      console.log(this.queryType);
      console.log(this.context);
      let obj = this.getObject(this.page, this.items, this.context);
      this.getAllGradeForStudentCliByService(obj);
    },
    StudentChildTwoInit() {
      this.context = null;
      this.queryType = null;
      if (this.value != null) {
        this.value = null;
      } else {
        let obj = this.getObject(this.page, this.items, this.context);
        this.getAllGradeForStudentCliByService(obj);
      }
    },
  },
  created() {
    this.sno = this.$parent.sno;
    let obj = this.getObject(this.page, this.items, this.context);
    this.getAllGradeForStudentCliByService(obj);
  },
  watch: {
    value: function (newVal, oldVal) {
      let obj = this.getObject(this.page, this.items, this.context);
      console.log(obj);
      this.getAllGradeForStudentCliByService(obj);
    },
  },
};
</script>

<style scoped >
#StudentChild02 {
  background: rgb(250, 250, 250);
}
#StudentChild02 > div {
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