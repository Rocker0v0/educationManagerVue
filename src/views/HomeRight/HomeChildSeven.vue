<template>
  <div id="homeChildren02">
    <div class="homeChildren_02">
      <div class="top">
        <home-tab-control :data="data"></home-tab-control>
      </div>
      <div class="content">
        <child-content-control
          :options="options"
          :tableData="tableData"
          :titleDate="titleDate"
          :compare="compare"
          @HomeChildSevenAdd="addClick"
          @HomeChildSevenUpdate="updateClick"
          @HomeChildSevenDelAll="HomeChildSevenDelAll"
          @HomeChildSevenDelOne="HomeChildSevenDelAll"
          @HomeChildSevenVal="HomeChildSevenVal"
          @HomeChildSevenSelectByType="HomeChildSevenSelectByType"
          @HomeChildSevenInit="HomeChildSevenInit"
          :loading="loading"
        >
          <template #dialog>
            <el-dialog
              :title="title"
              :visible.sync="dialogFormVisible"
              top="7vh"
              width="30%"
              center
            >
              <el-form :model="form">
                <el-form-item
                  label="课程"
                  :label-width="formLabelWidth"
                  v-if="isAdd == true"
                >
                  <el-select
                    v-model="form.courseName"
                    placeholder="请选择课程"
                    @focus="getCourse"
                    @change="courseChange"
                    :required="true"
                  >
                    <el-option
                      v-for="(item, index) in course_list"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="课程" :label-width="formLabelWidth" v-else>
                  <el-input
                    v-model="form.courseName"
                    autocomplete="on"
                    :readonly="true"
                  ></el-input>
                </el-form-item>
                <el-form-item label="学期" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.semester"
                    placeholder="请选择那一学期"
                    @change="semesterChange"
                    @focus="semesterfocus"
                  >
                    <el-option
                      v-for="(item, index) in semester_list"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="老师" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.teacherName"
                    placeholder="请选择老师"
                    @focus="teacherfocus"
                    @change="teacherChange"
                    ><el-option
                      v-for="(item, index) in teacher_list"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开始周数" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.startWeek"
                    placeholder="请选择开始周数"
                    @change="teacherfocus"
                    @focus="startWeekChange"
                  >
                    <el-option
                      v-for="(item, index) in week_list"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="结束周数" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.endWeek"
                    placeholder="请选择结束周数"
                    @change="teacherfocus"
                    @focus="endWeekChange"
                  >
                    <el-option
                      v-for="(item, index) in week_list"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="上课星期" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.day"
                    placeholder="请选择星期几"
                    @change="teacherChange"
                    @focus="dayFocus"
                  >
                    <el-option
                      v-for="(item, index) in day_list"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="上课时间一" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.classOne"
                    placeholder="请选择上课时间一"
                    @change="start"
                    @focus="startFocus"
                  >
                    <el-option
                      v-for="(item, index) in class_list1"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="上课时间二" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.classTwo"
                    placeholder="请选择上课时间二"
                    @change="end"
                    @focus="endFocus"
                  >
                    <el-option
                      v-for="(item, index) in class_list2"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="上课教室" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.classRoomName"
                    placeholder="请选择教室"
                    @focus="roomFocus"
                  >
                    <el-option
                      v-for="(item, index) in classRoomList"
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

<script scoped>
import childContentControl from "../../components/content/HomeCildrenChild/childContentControl.vue";
import homeTabControl from "../../components/content/HomeCildrenChild/homeTabControl.vue";
import {
  getCourseManagerMessage,
  getAbleCourses,
  getAbleTeachers,
  getAllReadyTcMessage,
  getAbleRoomsMessage,
  removeCoursesManagerMessage,
  addCoursesManagerMessage,
  modifyCoursesManagerMessage,
  getSemesterMessage,
  GetRoomClass,
  GetAllReadyTcClass,
  getAbleSemesterMessage,
  getCourseTypeMessage,
  getDayMessage,
} from "../../network/CourseManager";
import { getSession } from "../../network/login";
export default {
  components: { homeTabControl, childContentControl },
  name: "childOne",
  props: {},
  data() {
    return {
      data: "课程安排管理",
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
          label: "所属级别",
          prop: "deptName",
        },
        {
          label: "课程类型",
          prop: "type",
        },
        {
          label: "教室",
          prop: "classRoomName",
        },
      ],
      options: [
        {
          value: "type",
          label: "课程类型",
        },
        {
          value: "teacherName",
          label: "科任老师",
        },
        {
          value: "courseName",
          label: "课程名称",
        },
      ],
      compare: {
        courseName: "课程名称",
        deptName: "学院",
        teacherName: "负责老师",
        semester: "学期",
        startWeek: "开课周数",
        endWeek: "结课周数",
        day: "星期",
        classOne: "上课时间一",
        classTwo: "上课时间二",
        classRoomName: "所在教室",
        maxStudents: "最大学生数",
        type: "课程类型",
      },
      week_list: null,
      classRoomList: null,
      day_list: null,
      semester_list: [],
      class_list1: null,
      class_list2: null,
      course_list: null,
      teacher_list: null,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      thisRow: null,
      isAdd: true,
      title: "",
      code: null,
      index: null,
      page: 1,
      items: 11,
      loading: null,
      queryType: null,
      context: null,
      isSelectWeek: true,
      isUpSemester: true,
      constWeekList: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
      ],
    };
  },
  methods: {
    currentChangeClick(e) {
      this.HomeChildSevenSelectByType(this.context, e);
    },
    getAbleCoursesByService() {
      getAbleCourses().then((res) => {
        this.course_list = res.data;
      });
    },
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
    getCourseManagerMessageByService(page, items, type, tName, cName) {
      getCourseManagerMessage(page, items, type, tName, cName).then((res) => {
        this.tableData = res.data;
        this.index = res.index;
        this.loading = false;
      });
    },
    getSessionByService(index) {
      return getSession(index);
    },
    getAbleTeachersByService(cName, semester) {
      getAbleTeachers(cName, semester).then((res) => {
        const arr = [];
        for (let index in res.data) {
          arr.push(res.data[index].TNAME);
        }
        this.teacher_list = arr;
      });
    },
    getAllReadyTcMessageByService(tcInfo) {
      return getAllReadyTcMessage(tcInfo);
    },
    getAbleRoomsMessageByService(tcInfo) {
      getAbleRoomsMessage(tcInfo).then((res) => {
        const arr = [];
        for (let index in res.data) {
          arr.push(res.data[index].CLASSROOM_NAME);
        }
        this.classRoomList = arr;
      });
    },
    removeCoursesManagerMessageByService(list) {
      removeCoursesManagerMessage(list).then((res) => {
        this.open2(res.desc);
        this.HomeChildSevenSelectByType(this.context, 1);
      });
    },
    addCoursesManagerMessageByService(courseManager) {
      addCoursesManagerMessage(courseManager).then((res) => {
        this.dialogFormVisible = false;
        this.open2(res.desc);
        this.HomeChildSevenSelectByType(this.context, 1);
      });
    },
    modifyCoursesManagerMessageByService(twoCourseManager) {
      modifyCoursesManagerMessage(twoCourseManager).then((res) => {
        this.dialogFormVisible = false;
        this.isUpSemester = true;
        this.open2(res.desc);
        this.HomeChildSevenSelectByType(this.context, 1);
      });
    },
    getAbleSemesterMessageByService(cName) {
      getAbleSemesterMessage(cName).then((res) => {
        for (let index in res.data) {
          this.semester_list.splice(
            this.semester_list.indexOf(res.data[index]),
            1
          );
        }
      });
    },
    getCourseTypeMessageBySerevice(cName) {
      return getCourseTypeMessage(cName);
    },
    getSemesterMessageByService(cName) {
      getSemesterMessage(cName).then((res) => {
        this.semester_list = [1, 2, 3, 4, 5, 6, 7];
        if (res.data.length > 0) {
          this.$set(this.form, "semester", res.data[0].semester);
          this.semester_list = null;
          this.isUpSemester = false;
          this.$set(this.form, "startWeek", res.data[0].startWeek);
          this.$set(this.form, "endWeek", res.data[0].endWeek);
          this.isSelectWeek = false;
        } else {
          if (res.type == "通识选修") {
            this.semester_list = [0];
          }
          this.getAbleSemesterMessageByService(cName);
          this.isSelectWeek = true;
        }
      });
    },
    // 提交表单
    childOneSubmit(formData) {
      if (this.isAdd == false) {
        if (
          this.form.courseName &&
          this.form.semester != null &&
          this.form.teacherName &&
          this.form.startWeek &&
          this.form.endWeek &&
          this.form.day &&
          this.form.classOne &&
          this.form.classTwo &&
          this.form.classRoomName
        ) {
          let obj = {};
          obj.newCourseManager = this.form;
          obj.oldCourseManager = this.thisRow;
          this.modifyCoursesManagerMessageByService(JSON.stringify(obj));
        } else {
          this.open3("有未选择的表单");
        }
      } else {
        if (
          this.form.courseName &&
          this.form.semester != null &&
          this.form.teacherName &&
          this.form.startWeek &&
          this.form.endWeek &&
          this.form.day &&
          this.form.classOne &&
          this.form.classTwo &&
          this.form.classRoomName
        ) {
          this.addCoursesManagerMessageByService(JSON.stringify(this.form));
          this.thisRow = null;
          this.form = {};
        } else {
          this.open3("有未选择的表单");
        }
      }
    },
    HomeChildSevenVal(val) {
      this.queryType = val;
    },
    updateClick(index, row) {
      this.isAdd = false;
      this.isUpSemester = false;
      this.dialogFormVisible = true;
      this.thisRow = row;
      this.title = "修改排课信息";
      this.form = new Object();
      for (const key in row) {
        this.$set(this.form, key, row[key]);
      }
      this.getSemesterMessageByService(this.form.courseName);
    },
    addClick() {
      this.isAdd = true;
      this.dialogFormVisible = true;
      this.week_list = this.constWeekList;
      this.form = {};
      this.title = "新增排课信息";
    },
    exit() {
      this.dialogFormVisible = false;
      this.isUpSemester = true;
    },
    teacherfocus() {
      if (this.form.courseName && this.form.semester != null) {
        this.getAbleTeachersByService(this.form.courseName, this.form.semester);
      } else {
        this.teacher_list = null;
      }
    },
    getCourse() {
      this.getAbleCoursesByService();
    },
    start(week) {
      this.form.classTwo = week * 1 + 1;
    },
    end(week) {
      this.form.classOne = week * 1 - 1;
    },
    HomeChildSevenInit() {
      this.page = 1;
      this.getCourseManagerMessageByService(
        this.page,
        this.items,
        null,
        null,
        null
      );
      this.context = null;
    },
    startFocus() {
      this.class_list1 = [1, 3, 5, 7, 9];
      if (
        this.form.teacherName &&
        this.form.semester != null &&
        this.form.startWeek &&
        this.form.endWeek
      ) {
        let obj = null;
        if (this.isUpSemester == false) {
          obj = new GetAllReadyTcClass(
            this.form.teacherName,
            this.form.semester,
            this.form.startWeek,
            this.form.endWeek,
            this.form.courseName,
            this.form.isNewAdd,
            this.form.id
          );
        } else {
          obj = new GetAllReadyTcClass(
            this.form.teacherName,
            this.form.semester,
            this.form.startWeek,
            this.form.endWeek,
            this.form.courseName,
            0,
            null
          );
        }
        this.getAllReadyTcMessageByService(JSON.stringify(obj)).then((res) => {
          for (let index in res.data) {
            if (res.data[index].day == this.form.day) {
              if (this.class_list1.indexOf(res.data[index].classOne) != -1) {
                this.class_list1.splice(
                  this.class_list1.indexOf(res.data[index].classOne),
                  1
                );
              }
            }
          }
        });
      } else {
        this.class_list1 = null;
      }
    },
    unique(arr) {
      return Array.from(new Set(arr));
    },
    endFocus() {
      this.class_list2 = [2, 4, 6, 8, 10];
      if (
        this.form.teacherName &&
        this.form.semester != null &&
        this.form.startWeek &&
        this.form.endWeek
      ) {
        let obj = null;
        if (this.isUpSemester == false) {
          obj = new GetAllReadyTcClass(
            this.form.teacherName,
            this.form.semester,
            this.form.startWeek,
            this.form.endWeek,
            this.form.courseName,
            this.form.isNewAdd,
            this.form.id
          );
        } else {
          obj = new GetAllReadyTcClass(
            this.form.teacherName,
            this.form.semester,
            this.form.startWeek,
            this.form.endWeek,
            this.form.courseName,
            0,
            null
          );
        }
        this.getAllReadyTcMessageByService(JSON.stringify(obj)).then((res) => {
          for (let index in res.data) {
            if (res.data[index].day == this.form.day) {
              if (this.class_list2.indexOf(res.data[index].classTwo) != -1) {
                this.class_list2.splice(
                  this.class_list2.indexOf(res.data[index].classTwo),
                  1
                );
              }
            }
          }
        });
      } else {
        this.class_list2 = null;
      }
    },
    dayFocus() {
      this.day_list = null;
      if (this.form.courseName) {
        this.getCourseTypeMessageBySerevice(this.form.courseName).then(
          (res) => {
            switch (res.type) {
              case "通识选修":
                this.day_list = [1];
                break;
              case "公共必修":
                this.day_list = [2];
                break;
              case "学院必修":
                this.day_list = [3];
                break;
              case "专业必修":
                this.day_list = [4, 5];
                if (
                  this.form.semester != null &&
                  this.form.startWeek &&
                  this.form.endWeek
                ) {
                  let obj = null;
                  if (this.isUpSemester == false) {
                    obj = new GetAllReadyTcClass(
                      this.form.teacherName,
                      this.form.semester,
                      this.form.startWeek,
                      this.form.endWeek,
                      this.form.courseName,
                      this.form.isNewAdd,
                      this.form.id
                    );
                  } else {
                    obj = new GetAllReadyTcClass(
                      this.form.teacherName,
                      this.form.semester,
                      this.form.startWeek,
                      this.form.endWeek,
                      this.form.courseName,
                      0,
                      null
                    );
                  }
                  getDayMessage(JSON.stringify(obj)).then((res) => {
                    if (res.data != null && res.data.length != 0) {
                      for (let index in res.data) {
                        if (this.day_list.indexOf(res.data[index]) != -1) {
                          this.day_list.splice(
                            this.day_list.indexOf(res.data[index]),
                            1
                          );
                        }
                      }
                    }
                    let obj2 = new GetAllReadyTcClass(
                      this.form.teacherName,
                      this.form.semester,
                      this.form.startWeek,
                      this.form.endWeek,
                      this.form.courseName,
                      this.form.isNewAdd,
                      this.form.id
                    );
                    let arr = [];
                    this.getAllReadyTcMessageByService(
                      JSON.stringify(obj2)
                    ).then((res) => {
                      let contentArr = [];
                      for (let index in this.day_list) {
                        contentArr.push(this.day_list[index]);
                      }
                      for (let i = 0; i < contentArr.length; i++) {
                        arr = [];
                        for (let index in res.data) {
                          if (res.data[index].day == contentArr[i]) {
                            arr.push(res.data[index].classOne);
                          }
                        }
                        if (this.unique(arr).length >= 5) {
                          if (this.day_list.indexOf(contentArr[i]) != -1) {
                            this.day_list.splice(
                              this.day_list.indexOf(contentArr[i]),
                              1
                            );
                          }
                        }
                      }
                    });
                  });
                }
            }
          }
        );
      }
    },

    roomFocus() {
      if (
        this.form.semester != null &&
        this.form.startWeek &&
        this.form.endWeek &&
        this.form.day &&
        this.form.classOne &&
        this.form.classTwo
      ) {
        let obj = new GetRoomClass(
          this.form.day,
          this.form.semester,
          this.form.startWeek,
          this.form.endWeek,
          this.form.classOne,
          this.form.classTwo
        );
        this.getAbleRoomsMessageByService(JSON.stringify(obj));
      } else {
        this.classRoomList = null;
      }
    },
    semesterfocus() {
      if (this.form.courseName) {
        this.getCourseTypeMessageBySerevice(this.form.courseName).then(
          (res) => {
            if (this.isUpSemester == true) {
              if (res.type == "通识选修") {
                this.semester_list = [0];
              } else {
                this.semester_list = [1, 2, 3, 4, 5, 6, 7];
                this.getAbleSemesterMessageByService(this.form.courseName);
              }
            }
          }
        );
      }
    },
    courseChange() {
      this.$set(this.form, "startWeek", null);
      this.$set(this.form, "endWeek", null);
      this.$set(this.form, "semester", null);
      this.$set(this.form, "day", null);
      this.semesterChange();
      this.getSemesterMessageByService(this.form.courseName);
    },
    semesterChange() {
      this.$set(this.form, "teacherName", null);
      this.teacherChange();
    },
    teacherChange() {
      this.$set(this.form, "classRoomName", null);
      this.$set(this.form, "classOne", null);
      this.$set(this.form, "classTwo", null);
    },
    startWeekChange() {
      if (this.isSelectWeek == true) {
        this.week_list = this.constWeekList;
        if (this.form.endWeek) {
          this.week_list = this.week_list.slice(0, this.form.endWeek);
        }
      } else {
        this.week_list = null;
      }
    },
    endWeekChange() {
      if (this.isSelectWeek == true) {
        this.week_list = this.constWeekList;
        if (this.form.startWeek) {
          this.week_list = this.week_list.slice(
            this.form.startWeek - 1,
            this.week_list.length
          );
        }
      } else {
        this.week_list = null;
      }
    },
    HomeChildSevenDelAll(dataonLineListSelections) {
      console.log(dataonLineListSelections);
      let arr = [];
      for (var i = 0; i < dataonLineListSelections.length; i++) {
        arr.push(dataonLineListSelections[i].id);
      }
      if (arr.length > 0) {
        this.removeCoursesManagerMessageByService(arr);
      } else {
        this.open3("未选中任何数据！");
      }
    },
    HomeChildSevenSelectByType(context, page) {
      this.context = context;
      this.page = page;
      switch (this.queryType) {
        case "courseName":
          this.getCourseManagerMessageByService(
            this.page,
            this.items,
            null,
            null,
            context
          );
          break;
        case "teacherName":
          this.getCourseManagerMessageByService(
            this.page,
            this.items,
            null,
            context,
            null
          );
          break;
        case "type":
          this.getCourseManagerMessageByService(
            this.page,
            this.items,
            context,
            null,
            null
          );
          break;
        default:
          this.getCourseManagerMessageByService(
            this.page,
            this.items,
            null,
            null,
            null
          );
      }
    },
  },
  created() {
    this.code = 9;
    this.getCourseManagerMessageByService(
      this.page,
      this.items,
      null,
      null,
      null
    );
  },
};
</script>

<style scoped>
#homeChildren02 {
  background: rgb(250, 250, 250);
}
#homeChildren02 > div {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
.homeChildren_02 > div {
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
