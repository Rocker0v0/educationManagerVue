<template>
  <div id="homeChildren03">
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
          :year="year"
          @HomeChildThreeAdd="addClick"
          @HomeChildThreeSelectByType="SelectByType"
          @HomeChildThreeVal="HomeChildThreeVal"
          @HomeChildThreeYear="HomeChildThreeYear"
          @HomeChildThreeInit="HomeChildThreeInit"
          @HomeChildThreeDelAll="HomeChildThreeDelAll"
          @HomeChildThreeDelOne="HomeChildThreeDelAll"
        >
          <template #dialog>
            <el-dialog
              title="新增学生"
              :visible.sync="dialogFormVisible"
              top="7vh"
              width="30%"
              center
            >
              <el-form :model="form">
                <el-form-item label="学院" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.deptName"
                    placeholder="请选择学院"
                    @focus="getDept"
                    @change="deptChange"
                  >
                    <el-option
                      v-for="(item, index) in dept_list"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="专业" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.majorName"
                    placeholder="请选择专业"
                    @focus="getMajor"
                    @change="majorChange"
                  >
                    <el-option
                      v-for="(item, index) in major_list"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="年级" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.year"
                    placeholder="请选择年级"
                    @focus="getYear"
                    @change="yearChange"
                  >
                    <el-option
                      v-for="(item, index) in year_list"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="班级" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.className"
                    placeholder="请选择班级"
                    @focus="getClassName"
                    @change="classChange"
                  >
                    <el-option
                      v-for="(item, index) in class_list"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="课程类型" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.type"
                    placeholder="请选择课程类型"
                    @focus="getCourseType"
                    @change="typeChange"
                  >
                    <!--  -->
                    <el-option
                      v-for="(item, index) in course_list_type"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="课程" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.courseName"
                    placeholder="请选择课程"
                    @focus="getCourse"
                  >
                    <el-option
                      v-for="(item, index) in course_list"
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

          <template #deletText> 退课 </template>
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
  getDeptNameListForStudent,
  getMajorList,
  getClassYearList,
  getClassNameList,
  getCourseNameList,
  submitFormData,
  getChooseCourseList,
  ChooseCourseSelectByType,
  removeChooseCourseForClassList,
} from "../../network/ChooseCourseForClass";
export default {
  components: { homeTabControl, childContentControl },
  name: "childOne",
  data() {
    return {
      data: "统一选课管理",
      tableData: null,
      titleDate: [
        {
          label: "班级",
          prop: "className",
        },

        {
          label: "年级",
          prop: "year",
        },
        {
          label: "课程",
          prop: "courseName",
        },
        {
          label: "负责老师",
          prop: "teacherName",
        },
      ],
      year: null,
      options: [
        {
          value: "className",
          label: "班级名称",
        },
        {
          value: "courseName",
          label: "课程名称",
        },
        {
          value: "teacherName",
          label: "负责老师",
        },
      ],
      compare: {
        className: "班级",
        courseName: "课程",
        teacherName: "老师",
        deptName: "所属级别",
        startWeek: "开始周数",
        endWeek: "结束周数",
        day: "星期",
        classOne: "节数一",
        classTwo: "节数二",
        majorName: "专业",
        year: "年级",
      },
      dept_list: [],
      class_list: [],
      course_list_type: null,
      major_list: null,
      year_list: null,
      course_list: null,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      page: 1,
      items: 11,
      queryType: null,
      queryYear: null,
      context: null,
      index: null,
    };
  },

  methods: {
    // 网络请求
    getDeptNameListForStudentByService() {
      let arr = [];
      getDeptNameListForStudent().then((res) => {
        arr = res.data;
        this.dept_list = arr;
      });
    },
    getMajorListByService(deptName) {
      let arr = [];
      getMajorList(deptName).then((res) => {
        arr = res.data;
        this.major_list = arr;
      });
    },
    getChooseCourseListByService(obj) {
      getChooseCourseList(obj).then((res) => {
        this.tableData = res.data;
        this.index = res.index;
      });
    },
    getClassYearListByService() {
      return getClassYearList();
    },
    getClassNameListByService(majorName, year) {
      let arr = [];
      getClassNameList(majorName, year).then((res) => {
        arr = res.data;
        this.class_list = arr;
      });
    },
    getCourseNameListByService(chooseCourseFormData) {
      let arr = [];
      getCourseNameList(chooseCourseFormData).then((res) => {
        arr = res.data;
        this.course_list = arr;
      });
    },
    submitFormDataByService(chooseCourseFormData) {
      submitFormData(chooseCourseFormData).then((res) => {
        if (res.status == "1") {
          this.open2("添加成功！");
          let obj = this.getObject(
            this.page,
            this.items,
            this.queryYear,
            this.context
          );
          this.getChooseCourseListByService(obj);
        }
      });
    },
    HomeChildThreeInit() {
      let obj = new ChooseCourseSelectByType(1, 11, null, null, null, null);
      this.getChooseCourseListByService(obj);
      this.context = null;
    },
    getObject(page, items, year, context) {
      let obj = null;
      switch (this.queryType) {
        case "courseName":
          obj = new ChooseCourseSelectByType(
            page,
            items,
            year,
            context,
            null,
            null
          );
          break;
        case "teacherName":
          obj = new ChooseCourseSelectByType(
            page,
            items,
            year,
            null,
            context,
            null
          );
          break;
        case "className":
          obj = new ChooseCourseSelectByType(
            page,
            items,
            year,
            null,
            null,
            context
          );
          break;
        default:
          obj = new ChooseCourseSelectByType(
            page,
            items,
            year,
            null,
            null,
            null
          );
      }
      return obj;
    },
    currentChangeClick(e) {
      let obj = this.getObject(e, this.items, this.queryYear, this.context);
      this.getChooseCourseListByService(obj);
    },
    childOneSubmit() {
      // 提交表单
      this.submitFormDataByService(this.form);
      this.dialogFormVisible = false;
      this.form = {};
    },
    removeChooseCourseForClassListByService(list) {
      removeChooseCourseForClassList(list).then((res) => {
        if (res.status == 200) {
          this.open2("退课成功");
          this.page = 1;
          let obj = this.getObject(
            1,
            this.items,
            this.queryYear,
            this.context
          );
          this.getChooseCourseListByService(obj);
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

    // 点击事件
    addClick() {
      this.dialogFormVisible = true;
    },
    exit() {
      this.dialogFormVisible = false;
      this.form = {};
    },
    getCourse() {
      if (
        this.form.deptName &&
        this.form.majorName &&
        this.form.year &&
        this.form.className &&
        this.form.type
      ) {
        this.getCourseNameListByService(this.form);
      } else {
      }
    },
    getMajor() {
      if (this.form.deptName) {
        this.getMajorListByService(this.form.deptName);
      } else {
        this.major_list = null;
      }
    },
    majorChange() {
      this.$set(this.form, "year", null);
      this.yearChange();
    },
    getYear() {
      if (this.form.deptName && this.form.majorName) {
        let arr = [];
        this.getClassYearListByService().then((res) => {
          arr = res.data;
          this.year_list = arr;
        });
      } else {
        this.year_list = null;
      }
    },
    yearChange() {
      this.$set(this.form, "className", null);
      this.classChange();
    },
    getDept() {
      this.getDeptNameListForStudentByService();
    },
    deptChange() {
      this.$set(this.form, "majorName", null);
      this.majorChange();
    },
    getClassName() {
      if (this.form.deptName && this.form.majorName && this.form.year) {
        this.getClassNameListByService(this.form.majorName, this.form.year);
      } else {
        this.class_list = null;
      }
    },
    classChange() {
      this.$set(this.form, "type", null);
      this.typeChange();
    },
    getCourseType() {
      if (
        this.form.deptName &&
        this.form.majorName &&
        this.form.year &&
        this.form.className
      ) {
        this.course_list_type = ["专业必修", "学院必修", "公共必修"];
      } else {
        this.course_list_type = null;
      }
    },

    SelectByType(context, page) {
      this.context = context;
      this.page = page;
      let obj = this.getObject(
        this.page,
        this.items,
        this.queryYear,
        this.context
      );
      this.getChooseCourseListByService(obj);
    },
    typeChange() {
      this.$set(this.form, "courseName", null);
    },
    HomeChildThreeVal(value) {
      this.queryType = value;
    },
    HomeChildThreeYear(value) {
      this.queryYear = value;
    },
    HomeChildThreeDelAll(dataonLineListSelections) {
      let list = [];
      for (var i = 0; i < dataonLineListSelections.length; i++) {
        let obj = {};
        obj.className = dataonLineListSelections[i].className;
        obj.id = dataonLineListSelections[i].id;
        obj.year = dataonLineListSelections[i].year;
        list.push(obj);
      }

      this.removeChooseCourseForClassListByService(list);
    },
  },

  created() {
    let arr = [];
    this.getClassYearListByService().then((res) => {
      arr = res.data;
      this.year = arr;
    });

    let obj = new ChooseCourseSelectByType(1, 11, null, null, null, null);
    this.getChooseCourseListByService(obj);
  },
};
</script>

<style scoped>
#homeChildren03 {
  background: rgb(250, 250, 250);
}
#homeChildren03 > div {
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
