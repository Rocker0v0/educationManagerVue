<template>
  <div id="homeChildren01">
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
          @HomeChildOneAdd="addClick"
          @HomeChildOneVal="HomeChildOneVal"
          @HomeChildOneYear="HomeChildOneYear"
          @HomeChildOneUpdate="updateClick"
          @HomeChildOneInit="HomeChildOneInit"
          @HomeChildOneSelectByType="SelectByType"
          @HomeChildOneDelAll="HomeChildOneDelAll"
          @HomeChildOneDelOne="HomeChildOneDelAll"
        >
          <template #dialog>
            <el-dialog
              title="新增学生"
              :visible.sync="dialogFormVisible"
              width="30%"
              center
            >
              <el-form :model="form">
                <el-form-item label="年级" :label-width="formLabelWidth">
                  <el-select v-model="form.year" placeholder="请选择年级"
                  @change="majorChange">
                    <el-option
                      v-for="(item, index) in year"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.studentName"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.studentSex"
                    placeholder="请选择活动区域"
                  >
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生日" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form.studentBirth"
                      style="width: 100%"
                      value-format="yyyy/MM/dd"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="民族" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.nationality"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="学院" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.deptName"
                    placeholder="请选择学院"
                    @focus="deptFocus"
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
                    @focus="majorFocus"
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
                <el-form-item label="班级" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.className"
                    placeholder="请选择班级"
                    @focus="classFocus"
                  >
                    <el-option
                      v-for="(item, index) in class_list"
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
  getClassYearList,
  getDeptNameListForStudent,
  getMajorList,
} from "../../network/ChooseCourseForClass";
import {
  getStudentInfo,
  SelectStudentInfoByTypeVo,
  addStudentInfo,
  removeStudentInfo,
  modifyStudentInfo,
  getClassNameListByMaxNumber,
} from "../../network/StudentManager";
export default {
  components: { homeTabControl, childContentControl },
  name: "childOne",
  data() {
    return {
      data: "学生信息管理",
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
          label: "班级",
          prop: "className",
        },
      ],
      options: [
        {
          value: "studentId",
          label: "学号",
        },
        {
          value: "studentName",
          label: "姓名",
        },
        {
          value: "className",
          label: "班级名称",
        },
      ],
      compare: {
        studentName: "姓名",
        studentSex: "性别",
        studentBirth: "生日",
        nationality: "民族",
        className: "班级",
        studentId: "学号",
        deptName: "学院",
        majorName: "专业",
        year: "年级",
      },
      year: null,
      dept_list: null,
      major_list: null,
      class_list: null,

      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      thisRow: {},
      items: 11,
      page: 1,
      queryYear: null,
      queryType: null,
      context: null,
      index: null,
      isAdd: null,
    };
  },
  methods: {
    // 网络请求
    getStudentInfoByService(selectStudentInfoByTypeVo) {
      getStudentInfo(selectStudentInfoByTypeVo).then((res) => {
        this.tableData = res.data;
        this.index = res.index;
      });
    },
    // 获取班级
    getClassNameListByMaxNumberByService(majorName, year) {
      let arr = [];
      getClassNameListByMaxNumber(majorName, year).then((res) => {
        arr = res.data;
        this.class_list = arr;
      });
    },
    // 获取部门
    getDeptNameListForStudentByService() {
      let arr = [];
      getDeptNameListForStudent().then((res) => {
        arr = res.data;
        this.dept_list = arr;
      });
    },
    // 获取专业
    getMajorListByService(deptName) {
      let arr = [];
      getMajorList(deptName).then((res) => {
        arr = res.data;
        this.major_list = arr;
      });
    },
    //删除
    removeStudentInfoByService(list) {
      removeStudentInfo(list).then((res) => {
        if (res.status == 200) {
          this.open2("删除成功！");
          this.page = 1;
          let obj = this.getObject(
            1,
            this.items,
            this.queryYear,
            this.context
          );
          this.getStudentInfoByService(obj);
        }
      });
    },
    //修改
    modifyStudentInfoByService(studentInfoMangerVo) {
      console.log("aaa");
      modifyStudentInfo(studentInfoMangerVo).then((res) => {
        if (res.status == 200) {
          this.open2("修改成功！");
          this.form = {};
          let obj = this.getObject(
            this.page,
            this.items,
            this.queryYear,
            this.context
          );
          this.getStudentInfoByService(obj);
        } else {
          this.open3("无效修改！");
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
    // 添加
    addStudentInfoByService(obj) {
      return addStudentInfo(obj);
    },
    // 封装对象
    getObject(page, items, year, context) {
      let obj = null;
      switch (this.queryType) {
        case "className":
          obj = new SelectStudentInfoByTypeVo(
            page,
            items,
            year,
            null,
            context,
            null
          );
          break;
        case "studentId":
          obj = new SelectStudentInfoByTypeVo(
            page,
            items,
            year,
            context,
            null,
            null
          );
          break;
        case "studentName":
          obj = new SelectStudentInfoByTypeVo(
            page,
            items,
            year,
            null,
            null,
            context
          );
          break;
        default:
          obj = new SelectStudentInfoByTypeVo(
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
    // 分页
    currentChangeClick(e) {
      let obj = this.getObject(e, this.items, this.queryYear, this.context);
      this.getStudentInfoByService(obj);
    },
    // 提交表单
    childOneSubmit() {
      this.dialogFormVisible = false;
      console.log(this.form);
      if (this.isAdd == true) {
        if (
          this.form.deptName &&
          this.form.majorName &&
          this.form.nationality &&
          this.form.studentBirth &&
          this.form.studentName &&
          this.form.studentSex &&
          this.form.year
        )
          this.addStudentInfoByService(this.form).then((res) => {
            if (res.status == 200) {
              this.form = {};
              this.open2("添加成功！");
              let obj = this.getObject(
                this.page,
                this.items,
                this.queryYear,
                this.context
              );
              this.getStudentInfoByService(obj);
            } else {
              this.open2("该学生名字已经存在！");
            }
            this.form = {};
          });
      } else {
        console.log("修改");
        let obj = {};
        obj.newStudentInfoMangerVo = this.form;
        obj.oldStudentInfoMangerVo = this.thisRow;
        this.modifyStudentInfoByService(obj);
      }
      //
    },
    updateClick(index, row) {
      this.isAdd = false;
      this.dialogFormVisible = true;
      this.thisRow = row;
      this.major_list = null;
      this.dept_name = null;
      this.class_name = null;
      for (const key in row) {
        this.$set(this.form, key, row[key]);
      }
    },
    addClick() {
      this.dialogFormVisible = true;
      this.isAdd = true;
    },
    exit() {
      this.dialogFormVisible = false;
      this.form = {};
      this.thisRow = {};
    },
    classFocus() {
      if (this.form.majorName && this.form.year) {
        this.getClassNameListByMaxNumberByService(
          this.form.majorName,
          this.form.year
        );
      }
    },
    deptFocus() {
      if (this.form.year) this.getDeptNameListForStudentByService();
    },
    majorFocus() {
      if (this.form.deptName && this.form.year) {
        this.getMajorListByService(this.form.deptName);
      }
    },
    deptChange() {
      this.$set(this.form, "className", null);
      this.$set(this.form, "majorName", null);
    },
    majorChange() {
      this.$set(this.form, "className", null);
    },
    HomeChildOneVal(val) {
      this.queryType = val;
    },
    HomeChildOneYear(val) {
      this.queryYear = val;
    },
    SelectByType(context, page) {
      this.context = context;
      this.page = page;
      console.log(this.queryYear);
      let obj = this.getObject(
        this.page,
        this.items,
        this.queryYear,
        this.context
      );
      this.getStudentInfoByService(obj);
    },
    HomeChildOneInit() {
      let obj = new SelectStudentInfoByTypeVo(1, 11, null, null, null, null);
      this.getStudentInfoByService(obj);
      this.context = null;
    },
    HomeChildOneDelAll(dataonLineListSelections) {
      let list = [];
      for (var i = 0; i < dataonLineListSelections.length; i++) {
        list.push(dataonLineListSelections[i].studentId);
      }
      console.log(list);
      this.removeStudentInfoByService(list);
    },
  },
  created() {
    let arr = [];
    getClassYearList().then((res) => {
      arr = res.data;
      this.year = arr;
    });
    let obj = this.getObject(
      this.page,
      this.items,
      this.queryYear,
      this.context
    );
    this.getStudentInfoByService(obj);
  },
};
</script>

<style >
#homeChildren01 {
  background: rgb(250, 250, 250);
}
#homeChildren01 > div {
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
