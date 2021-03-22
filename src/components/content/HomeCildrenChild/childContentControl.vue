<template>
  <div id="child_content_control">
    <div class="OneButton">
      <el-button type="success" @click="fromCommit" style="margin-left: 9px"
        >删除</el-button
      >
      <el-button type="success">新增</el-button>
    </div>
    <div class="Select">
      <el-select
        style="width: 150px"
        v-model="value"
        clearable
        placeholder="查询类型"
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
        style="width: 400px"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="success">查询</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="selectionLineChangeHandle"
      height="87.2%"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :cell-style="callStyleHandler"
      stripe
    >
      <el-table-column type="selection" width="60"></el-table-column>

      <slot name="homeChildContent"></slot>

      <el-table-column
        v-for="(item, index) in titleDate"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

  <dra-wer :drawer="drawer" :editRow="editRow" :editIndex="editIndex" :compare="compare" @updateDrawer="updateDrawerHandler"></dra-wer>
    
  </div>
</template>

<script>
import draWer from '../../common/Drawer.vue'
export default {
  name: "child_content_control",
  components:{
    draWer
  },
  props: {
    compare: {
      type: Object,
      default() {
        return {};
      },
    },
    titleDate: {
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
  },
  data() {
    return {
      context: "",
      dataonLineListSelections: [],
      value: "",
      drawer:false,
      editRow:null,
      editIndex:null
    };
  },
  methods: {
    handleEdit(index, row) {
      this.drawer = true
      console.log(index, row);
      this.editRow = row;
      this.editIndex = index;

    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    selectionLineChangeHandle(val) {
      this.dataonLineListSelections = val;
    },
    fromCommit() {
      console.log(this.dataonLineListSelections);
      for (var i = 0; i < this.dataonLineListSelections.length; i++) {
        console.log("id:" + this.dataonLineListSelections[i].id);
      }
    },
    callStyleHandler() {
      return {
        textAlign: "center",
      };
    },
     updateDrawerHandler(){
    this.drawer = false
  }
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
  right: 480px;
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
</style>