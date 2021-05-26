<template>
  <div id="child_content_control">
    <!-- 全部删除和新增 -->
    <div class="OneButton">
      <el-button
        type="success"
        @click="fromCommit"
        style="margin-left: 9px"
        v-if="
          rotePath != '/Teacher/TeacherChildTwo' &&
          rotePath != '/Student/StudentChildTwo' &&
          rotePath != '/Student/StudentChildThree' &&
          rotePath != '/Student/StudentChildFour'
        "
        >批量删除</el-button
      >
      <slot name="StudentChildThreeSmaster"></slot>

      <el-button
        type="success"
        @click="add"
        v-if="
          rotePath != '/Home/HomeChildEight' &&
          rotePath != '/Teacher/TeacherChildTwo' &&
          rotePath != '/Student/StudentChildTwo' &&
          rotePath != '/Student/StudentChildThree' &&
          rotePath != '/Student/StudentChildFour'
        "
        >新增信息</el-button
      >

      <el-button type="success" @click="init">初始化</el-button>
    </div>
    <!-- 搜索类型 -->
    <div class="Select">
      <el-select
        style="width: 100px"
        v-model="thisYear"
        clearable
        placeholder="年级"
        v-if="
          rotePath != '/Home/HomeChildSeven' &&
          rotePath != '/Home/HomeChildTwo' &&
          rotePath != '/Home/HomeChildFive' &&
          rotePath != '/Home/HomeChildFour' &&
          rotePath != '/Home/HomeChildSex' &&
          rotePath != '/Student/StudentChildTwo' &&
          rotePath != '/Student/StudentChildThree' &&
          rotePath != '/Student/StudentChildFour'
        "
        @change="yearChange"
      >
        <el-option v-for="(item, index) in year" :key="index" :value="item">
        </el-option>
      </el-select>

      <el-select
        style="width: 140px"
        v-model="courseName"
        clearable
        placeholder="课程名称"
        v-if="
          rotePath == '/Home/HomeChildEight' ||
          rotePath == '/Teacher/TeacherChildTwo'
        "
        @focus="courseNameClick"
      >
        <el-option
          v-for="(item, index) in courseNameList"
          :key="index"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-select
        style="width: 180px"
        v-model="className"
        clearable
        placeholder="班级"
        v-if="
          rotePath == '/Home/HomeChildEight' ||
          rotePath == '/Teacher/TeacherChildTwo'
        "
        @focus="blurClick"
      >
        <el-option
          v-for="(item, index) in classNameList"
          :key="index"
          :value="item"
        >
        </el-option>
      </el-select>

      <el-select
        style="width: 150px"
        v-model="value"
        clearable
        placeholder="查询类型"
        @change="valChange"
        v-if="
          rotePath != '/Home/HomeChildEight' &&
          rotePath != '/Teacher/TeacherChildTwo'
        "
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="Select02">
      <el-input
        v-model="context"
        style="width: 300px"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="success" @click="selectByType">查询</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="selectionLineChangeHandle"
      height="87.2%"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :cell-style="callStyleHandler"
      stripe
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <!-- 全选 -->
      <el-table-column
        type="selection"
        width="60"
        v-if="
          rotePath != '/Teacher/TeacherChildTwo' &&
          rotePath != '/Student/StudentChildTwo' &&
          rotePath != '/Student/StudentChildThree' &&
          rotePath != '/Student/StudentChildFour'
        "
      ></el-table-column>
      <!-- 插槽 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item
              v-for="(value1, key1, index1) in compare"
              :key="index1"
              :label="value1"
            >
              <div v-for="(value2, key2, index2) in props.row" :key="index2">
                <span v-if="key1 == key2">{{ value2 }}</span>
              </div>
            </el-form-item>
          </el-form>
        </template> </el-table-column
      >>
      <!-- 第一行的数据 -->
      <el-table-column
        v-for="(item, index) in titleDate"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      >
      </el-table-column>
      <!-- 删除编辑的一列 -->
      <el-table-column
        label="操作"
        v-if="rotePath != '/Student/StudentChildTwo'"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="update(scope.$index, scope.row)"
            v-if="
              rotePath != '/Home/HomeChildThree' &&
              rotePath != '/Teacher/TeacherChildThree'
            "
          >
            <slot name="deletText">修改</slot>
          </el-button>
          <el-button
            size="mini"
            :type="classType"
            @click="handleDelete(scope.$index, scope.row)"
            v-if="
              rotePath != '/Teacher/TeacherChildTwo' &&
              rotePath != '/Student/StudentChildThree' &&
              rotePath != '/Student/StudentChildFour'
            "
          >
            <slot>删除</slot>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 插槽 -->
    <slot name="dialog"> </slot>
  </div>
</template>

<script>
export default {
  name: "child_content_control",
  props: {
    classType: {
      type: String,
      default() {
        return "danger";
      },
    },
    titleDate: {
      type: Array,
      default() {
        return [];
      },
    },
    year: {
      type: Array,
      default() {
        return [];
      },
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    compare: {
      type: Object,
      default() {
        return {};
      },
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      },
    },
    classNameList: {
      type: Array,
      default() {
        return [];
      },
    },
    courseNameList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      context: "",
      dataonLineListSelections: [],
      value: "",
      drawer: false,
      editRow: null,
      editIndex: null,
      rotePath: null,
      page: 1,
      thisYear: null,
      courseName: null,
      className: null,
    };
  },
  created() {
    this.rotePath = this.$route.path;
  },
  methods: {
    open3(message) {
      this.$message({
        message,
        type: "warning",
      });
    },
    valChange() {
      this.context = null;
    },
    yearChange() {
      this.className = null;
    },
    handleDelete(index, row) {
      let arr = [];
      arr.push(row);
      if (this.rotePath == "/Student/StudentChildThree") {
        this.$confirm("是否确认选课？")
          .then((_) => {
            this.$emit(this.rotePath.split("/")[2] + "DelOne", arr);
            done();
          })
          .catch((_) => {});
      } else {
        this.$confirm("是否确认删除？")
          .then((_) => {
            this.$emit(this.rotePath.split("/")[2] + "DelOne", arr);
            done();
          })
          .catch((_) => {});
      }
    },
    selectionLineChangeHandle(val) {
      this.dataonLineListSelections = val;
    },
    selectByType() {
      this.$emit(
        this.rotePath.split("/")[2] + "SelectByType",
        this.context,
        this.page
      );
    },
    blurClick() {
      this.$emit(this.rotePath.split("/")[2] + "Blur");
    },
    courseNameClick() {
      console.log("bbb");
      console.log(this.rotePath.split("/")[2]);
      this.$emit(this.rotePath.split("/")[2] + "CourseNameBlur");
    },
    fromCommit() {
      this.$confirm("是否确认删除？")
        .then((_) => {
          this.$emit(
            this.rotePath.split("/")[2] + "DelAll",
            this.dataonLineListSelections
          );
          done();
        })
        .catch((_) => {});
    },
    callStyleHandler() {
      return {
        textAlign: "center",
      };
    },
    init() {
      this.context = null;
      this.value = null;
      this.thisYear = null;
      this.className = null;
      this.courseName = null;
      this.$emit(this.rotePath.split("/")[2] + "Init");
    },
    add() {
      this.$emit(this.rotePath.split("/")[2] + "Add");
    },
    update(index, row) {
      this.$emit(this.rotePath.split("/")[2] + "Update", index, row);
    },
  },
  watch: {
    value: function (val, oldval) {
      this.$emit(this.rotePath.split("/")[2] + "Val", val);
    },
    thisYear: function (val, oldval) {
      this.$emit(this.rotePath.split("/")[2] + "Year", val);
      this.courseName = null;
    },
    courseName: function (val, oldval) {
      this.className = null;
      this.$emit(this.rotePath.split("/")[2] + "CourseName", val);
    },
    className: function (val, oldval) {
      this.$emit(this.rotePath.split("/")[2] + "ClassName", val);
    },
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.Select {
  position: absolute;
  right: 380px;
  top: 38px;
}
.Select02 {
  position: absolute;
  right: 10px;
  top: 38px;
}
.el-table {
  position: absolute;
  top: 86px;
}
.OneButton {
  position: absolute;
  top: 38px;
}
.has-gutter th {
  text-align: center;
}
.el-dialog_title {
  font-size: 30px;
  font-weight: bold;
}
</style>