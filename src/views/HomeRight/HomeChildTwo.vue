<template>
  <div id="homeChildren02">
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
          @HomeChildTwoAdd="addClick"
          @HomeChildTwoUpdate="updateClick"
          @HomeChildTwoInit="HomeChildTwoInit"
          @HomeChildTwoVal="HomeChildTwoVal"
          @HomeChildTwoSelectByType="SelectByType"
          @HomeChildTwoDelAll="HomeChildTwoDelAll"
          @HomeChildTwoDelOne="HomeChildTwoDelAll"
        >
          <template #dialog>
            <el-dialog
              title="新增老师"
              :visible.sync="dialogFormVisible"
              width="30%"
              center
            >
              <el-form :model="form">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.teacherName"
                    placeholder="请输入姓名"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-select v-model="form.teacherSex" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生日" :label-width="formLabelWidth">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form.teacherBirth"
                      style="width: 100%"
                      value-format="yyyy/MM/dd"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="学院" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.deptName"
                    placeholder="请选择学院"
                    @focus="deptFocus"
                  >
                    <el-option
                      v-for="(item, index) in dept_list"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="学历" :label-width="formLabelWidth">
                  <el-select v-model="form.educ" placeholder="请选择学历">
                    <el-option label="研究生" value="研究生"></el-option>
                    <el-option label="本科生" value="本科生"></el-option>
                    <el-option label="博士" value="博士"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="职称" :label-width="formLabelWidth">
                  <el-select v-model="form.profess" placeholder="请选择学历">
                    <el-option label="讲师" value="讲师"></el-option>
                    <el-option label="教授" value="教授"></el-option>
                    <el-option label="副教授" value="副教授"></el-option>
                    <el-option label="助教" value="助教"></el-option>
                    <el-option label="导师" value="导师"></el-option>
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
  getClassYearList,
  getDeptNameList,
} from "../../network/ChooseCourseForClass";
import {
  getTeacherInfo,
  SelectTeacherInfoByTypeVo,
  addTeacherInfo,
  removeTeacherInfo,
  modifyTeacherInfo,
} from "../../network/TeacherManager";
export default {
  components: { homeTabControl, childContentControl },
  name: "childTwo",
  data() {
    return {
      data: "教师信息管理",
      tableData: null,
      titleDate: [
        {
          label: "编号",
          prop: "teacherId",
        },
        {
          label: "姓名",
          prop: "teacherName",
        },
        {
          label: "性别",
          prop: "teacherSex",
        },
        {
          label: "院系",
          prop: "deptName",
        },
        {
          label: "职称",
          prop: "profess",
        },
      ],
      options: [
        {
          value: "teacherId",
          label: "编号",
        },
        {
          value: "deptName",
          label: "所属学院",
        },
        {
          value: "teacherName",
          label: "教师姓名",
        },
      ],
      compare: {
        teacherName: "教师编号",
        deptName: "所属学院",
        teacherName: "姓名",
        teacherSex: "性别",
        teacherBirth: "生日",
        educ: "学历",
        profess: "职称",
      },
      dept_list: null,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      thisRow: {},
      items: 11,
      page: 1,
      queryType: null,
      context: null,
      index: null,
      isAdd: null,
    };
  },
  methods: {
    // 网络请求
    // 网络请求
    getTeacherInfoByService(selectTeacherInfoByTypeVo) {
      getTeacherInfo(selectTeacherInfoByTypeVo).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.index = res.index;
      });
    },
    // 获取部门
    getDeptNameListByService() {
      let arr = [];
      getDeptNameList().then((res) => {
        arr = res.data;
        this.dept_list = arr;
      });
    },
    // 修改
    modifyTeacherInfoByService(teacherInfoMangerVo) {
      console.log("aaa");
      modifyTeacherInfo(teacherInfoMangerVo).then((res) => {
        if (res.status == 200) {
          this.open2("修改成功！");
          this.form = {};
          let obj = this.getObject(this.page, this.items, this.context);
          this.getTeacherInfoByService(obj);
        } else {
          this.open3("无效修改！");
        }
      });
    },
    //删除
    removeTeacherInfoByService(list) {
      removeTeacherInfo(list).then((res) => {
        if (res.status == 200) {
          this.open2("删除成功！");
          this.page = 1;
          let obj = this.getObject(1, this.items, this.context);
          this.getTeacherInfoByService(obj);
        }
      });
    },
    //添加
    addTeacherInfoByService(teacherInfoManagerVo) {
      console.log(teacherInfoManagerVo);
      if (
        teacherInfoManagerVo.deptName &&
        teacherInfoManagerVo.educ &&
        teacherInfoManagerVo.profess &&
        teacherInfoManagerVo.teacherName &&
        teacherInfoManagerVo.teacherSex &&
        teacherInfoManagerVo.teacherBirth
      )
        addTeacherInfo(teacherInfoManagerVo).then((res) => {
          console.log("添加");
          if (res.status != -1) {
            this.open2("添加成功！");
            let obj = this.getObject(this.page, this.items, this.context);
            this.getTeacherInfoByService(obj);
          } else {
            this.open3("该学生名字已经存在！");
          }
          this.form = {};
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
    currentChangeClick(e) {
      let obj = this.getObject(e, this.items, this.context);
      this.getTeacherInfoByService(obj);
    },
    getObject(page, items, context) {
      let obj = null;
      switch (this.queryType) {
        case "teacherId":
          obj = new SelectTeacherInfoByTypeVo(page, items, context, null, null);
          break;
        case "teacherName":
          obj = new SelectTeacherInfoByTypeVo(page, items, null, context, null);
          break;
        case "deptName":
          obj = new SelectTeacherInfoByTypeVo(page, items, null, null, context);
          break;
        default:
          obj = new SelectTeacherInfoByTypeVo(page, items, null, null, null);
      }
      return obj;
    },
    // 提交表单
    childOneSubmit() {
      this.dialogFormVisible = false;
      if (this.isAdd == true) {
        this.addTeacherInfoByService(this.form);
      } else {
        console.log("这是修改");
        let obj = {};
        obj.newTeacherInfoManagerVo = this.form;
        obj.oldTeacherInfoManagerVo = this.thisRow;
        this.modifyTeacherInfoByService(obj);
      }
    },
    updateClick(index, row) {
      this.isAdd = false;
      this.dialogFormVisible = true;
      this.thisRow = row;
      for (const key in row) {
        this.$set(this.form, key, row[key]);
      }
    },
    addClick() {
      this.isAdd = true;
      this.dialogFormVisible = true;
    },
    HomeChildTwoVal(val) {
      this.queryType = val;
    },
    HomeChildTwoDelAll(dataonLineListSelections) {
      let list = [];
      for (var i = 0; i < dataonLineListSelections.length; i++) {
        list.push(dataonLineListSelections[i].teacherId);
      }
      console.log(list);
      this.removeTeacherInfoByService(list);
    },
    SelectByType(context, page) {
      this.context = context;
      this.page = page;
      let obj = this.getObject(this.page, this.items, this.context);
      this.getTeacherInfoByService(obj);
    },
    HomeChildTwoInit() {
      let obj = new SelectTeacherInfoByTypeVo(1, 11, null, null, null);
      this.getTeacherInfoByService(obj);
      this.context = null;
    },
    exit() {
      this.dialogFormVisible = false;
      this.form = {};
      this.thisRow = {};
    },
    deptFocus() {
      this.getDeptNameListByService();
    },
  },
  created() {
    let obj = this.getObject(this.page, this.items, this.context);
    this.getTeacherInfoByService(obj);
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
