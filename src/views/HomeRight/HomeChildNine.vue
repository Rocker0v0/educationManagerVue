<template>
  <div id="homeChildren09">
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
          @HomeChildNineAdd="addClick"
          @HomeChildNineUpdate="updateClick"
          @HomeChildNineVal="HomeChildNineVal"
          @HomeChildNineYear="HomeChildNineYear"
          @HomeChildNineInit="HomeChildNineInit"
          @HomeChildNineSelectByType="SelectByType"
          @HomeChildNineDelAll="HomeChildNineDelAll"
          @HomeChildNineDelOne="HomeChildNineDelAll"
        >
          <template #dialog>
            <el-dialog
              :title="title"
              :visible.sync="dialogFormVisible"
              width="30%"
              center
            >
              <el-form :model="form">
                <el-form-item label="年级" :label-width="formLabelWidth">
                  <el-input v-model="form.year" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学院" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.deptName"
                    placeholder="请选择学院"
                    :disabled="isabled"
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
                    :disabled="isabled"
                    @focus="majorFocus"
                  >
                    <el-option
                      v-for="(item, index) in major_list"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="辅导员" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.instructor"
                    placeholder="请选择辅导员"
                    @focus="instructorFocus"
                  >
                    <el-option
                      v-for="(item, index) in instructorList"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="最大学生数" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.maxStudents"
                    autocomplete="off"
                  ></el-input>
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
} from "../../network/ChooseCourseForClass";
import {
  getClassManagerInfo,
  SelectClassManagerInfoByType,
  getAbleTeacherNameList,
  getMajorListByYear,
  addClassManagerList,
  removeClassManagerList,
  modifyClassManagerList,
} from "../../network/ClassManager";
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
          label: "班级名称",
          prop: "className",
        },
        {
          label: "所属专业",
          prop: "majorName",
        },
        {
          label: "所属学院",
          prop: "deptName",
        },
      ],
      options: [
        {
          value: "majorName",
          label: "所属专业",
        },
        {
          value: "deptName",
          label: "所属学院",
        },
      ],
      compare: {
        classId: "班级编号",
        className: "班级名称",
        majorName: "所属专业",
        deptName: "所属学院",
        instructor: "辅导员",
        maxStudents: "最大学生数",
        year: "年级",
      },
      instructorList: ["吴小云"],
      title: "",
      dialogFormVisible: false,
      form: {},
      dept_list: null,
      major_list: null,
      formLabelWidth: "120px",
      thisRow: {},
      items: 11,
      page: 1,
      year: null,
      queryYear: null,
      queryType: null,
      context: null,
      index: null,
      isAdd: null,
      isabled: null,
    };
  },
  methods: {
    // 网络请求
    getClassManagerInfoByService(selectClassManagerInfoByType) {
      getClassManagerInfo(selectClassManagerInfoByType).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.index = res.index;
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
    getMajorListByYearByService(deptName, year) {
      let arr = [];
      getMajorListByYear(deptName, year).then((res) => {
        arr = res.data;
        this.major_list = arr;
      });
    },
    // 获取辅导员列表
    getAbleTeacherNameListByService(deptName) {
      getAbleTeacherNameList(deptName).then((res) => {
        this.instructorList = res.data;
      });
    },
    //新增班级
    addClassManagerListByService(obj) {
      if (
        obj.deptName &&
        obj.instructor &&
        obj.majorName &&
        obj.maxStudents &&
        obj.year
      )
        addClassManagerList(obj).then((res) => {
          console.log(res);
          if (res.status != -1) {
            this.open2("添加成功!");
            let obj = this.getObject(
              this.page,
              this.items,
              this.queryYear,
              this.context
            );
            this.getClassManagerInfoByService(obj);
          } else {
            this.open3("该专业的班级个数已经到上限！");
          }
          this.form = {};
        });
    },
    // 删除
    removeClassManagerListByService(list) {
      removeClassManagerList(list).then((res) => {
        if (res.status != -1) {
          this.open2("删除成功!");
          this.page = 1;
          let obj = this.getObject(
            1,
            this.items,
            this.queryYear,
            this.context
          );
          this.getClassManagerInfoByService(obj);
        }
      });
    },
    //修改
    modifyClassManagerListByService(classManagerVo) {
      console.log("aaa");
      modifyClassManagerList(classManagerVo).then((res) => {
        if (res.status != -1) {
          this.open2("修改成功！");
          this.form = {};
          let obj = this.getObject(
            this.page,
            this.items,
            this.queryYear,
            this.context
          );
          this.getClassManagerInfoByService(obj);
        } else {
          this.open3("最大人数不能小于已有的学生数！");
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
    getObject(page, items, year, context) {
      let obj = null;
      switch (this.queryType) {
        case "deptName":
          obj = new SelectClassManagerInfoByType(
            page,
            items,
            year,
            context,
            null
          );
          break;
        case "majorName":
          obj = new SelectClassManagerInfoByType(
            page,
            items,
            year,
            null,
            context
          );
          break;
        default:
          obj = new SelectClassManagerInfoByType(page, items, year, null, null);
      }
      return obj;
    },
    currentChangeClick(e) {
      let obj = this.getObject(e, this.items, this.queryYear, this.context);
      this.getClassManagerInfoByService(obj);
    },
    childOneSubmit() {
      // 提交表单
      this.dialogFormVisible = false;

      if (this.isAdd == true) {
        console.log("这是添加");
        this.addClassManagerListByService(this.form);
      } else {
        console.log("这是修改");
        this.modifyClassManagerListByService(this.form);
      }
    },
    updateClick(index, row) {
      console.log(index, row);
      this.isAdd = false;
      this.isabled = true;
      this.dialogFormVisible = true;
      this.thisRow = row;
      this.title = "修改班级";
      for (const key in row) {
        this.$set(this.form, key, row[key]);
      }
    },
    addClick() {
      this.dialogFormVisible = true;
      this.isAdd = true;
      this.isabled = false;
      this.title = "添加班级";
    },
    exit() {
      this.dialogFormVisible = false;
      this.form = {};
      this.thisRow = {};
    },
    SelectByType(context, page) {
      this.page = page;
      this.context = context;
      console.log(this.page);
      let obj = this.getObject(
        this.page,
        this.items,
        this.queryYear,
        this.context
      );
      this.getClassManagerInfoByService(obj);
    },
    HomeChildNineVal(value) {
      this.queryType = value;
      console.log(value);
    },
    HomeChildNineYear(value) {
      this.queryYear = value;
    },
    HomeChildNineDelAll(dataonLineListSelections) {
      let list = [];
      for (var i = 0; i < dataonLineListSelections.length; i++) {
        list.push(dataonLineListSelections[i].classId);
      }
      this.removeClassManagerListByService(list);
      console.log(list);
    },
    HomeChildNineInit() {
      let obj = new SelectClassManagerInfoByType(1, 11, null, null, null);
      this.getClassManagerInfoByService(obj);
      this.context = null;
    },
    deptFocus() {
      if (this.form.year) this.getDeptNameListForStudentByService();
    },
    deptChange() {
      this.$set(this.form, "majorName", null);
    },
    majorFocus() {
      if (this.form.deptName && this.form.year) {
        this.getMajorListByYearByService(this.form.deptName, this.form.year);
      }
    },
    instructorFocus() {
      this.getAbleTeacherNameListByService("导员部");
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
    this.getClassManagerInfoByService(obj);
  },
};
</script>

<style >
#homeChildren09 {
  background: rgb(250, 250, 250);
}
#homeChildren09 > div {
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