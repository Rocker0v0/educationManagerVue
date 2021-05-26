<template>
  <div id="homeChildren05">
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
           @HomeChildFiveAdd="addClick"
          @HomeChildFiveUpdate="updateClick"
          @HomeChildFiveVal="HomeChildFiveVal"
          @HomeChildFiveSelectByType="SelectByType"
          @HomeChildFiveInit="HomeChildFiveInit"
          @HomeChildFiveDelAll="HomeChildFiveDelAll"
          @HomeChildFiveDelOne="HomeChildFiveDelAll"
        >
          <template #dialog>
            <el-dialog
              :title="title"
              :visible.sync="dialogFormVisible"
              width="30%"
              center
            >
              <el-form :model="form">
                <el-form-item label="院系名称" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.deptName"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="院系负责人" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.director"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="上级部门" :label-width="formLabelWidth">
                  <el-select
                    v-model="form.parentDeptName"
                    placeholder="请选择上级部门"
                    @focus="getParentDept"
                    :disabled="isdisabled"
                  >
                    <!-- @focus="getClassName" -->
                    <el-option
                      v-for="(item, index) in parent_dept_list"
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
  getDeptInfoList,
  SelectDeptManagerByType,
  getDeptAndMajorNameList,
  addDeptInfo,
  removeDeptInfo,
  modifyDeptInfo
} from "../../network/DeptManager";
export default {
  components: { homeTabControl, childContentControl },
  name: "childOne",
  data() {
    return {
      data: "院系信息管理",
      parent_dept_list: ["软件工程", "管理学院"],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      thisRow: {},
      title: "",
      items: 11,
      page: 1,
      queryType: null,
      context: null,
      index: null,
      isdisabled:null,
      isAdd: null,
      tableData: null,
      titleDate: [
        {
          label: "院系编号",
          prop: "deptId",
        },
        {
          label: "院系名称",
          prop: "deptName",
        },
        {
          label: "上级部门",
          prop: "parentDeptName",
        },
        {
          label: "学院负责人",
          prop: "director",
        },
      ],

      options: [
        {
          value: "deptId",
          label: "院系编号",
        },
        {
          value: "parentDeptName",
          label: "上级部门",
        },
        {
          value: "deptName",
          label: "院系名称",
        },
      ],
      compare: {
        deptId: "院系编号",
        deptName: "院系名称",
        director: "院系负责人",
        parentDeptName: "上级部门",
      },
    };
  },
  methods: {
    // 网络请求
    getDeptInfoListByService(selectDeptManagerByType) {
      getDeptInfoList(selectDeptManagerByType).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.index = res.index;
      });
    },
    //获取上级院系
    getDeptAndMajorNameListByService(){
      getDeptAndMajorNameList().then(res=>{
        this.parent_dept_list = res.data
      })
    },
    //添加
    addDeptInfoByService(deptManagerVo) {
      addDeptInfo(deptManagerVo).then((res) => {
        if (res.status != -1 && res.status!= -2) {
          this.open2("添加成功！");
          let obj = this.getObject(this.page, this.items, this.context);
          this.getDeptInfoListByService(obj);
        } else if(res.status == -1){
          this.open3("该系部已到上限！");
        }else{
          this.open3("该系部名称已经存在！")
        }
        this.form = {};
      });
    },
    // 修改
    modifyDeptInfoByService(twoDeptManagerVo) {
      modifyDeptInfo(twoDeptManagerVo).then((res) => {
        if (res.status != -1 && res.status != -2 ) {
          this.open2("修改成功！");
          let obj = this.getObject(this.page, this.items, this.context);
          this.getDeptInfoListByService(obj);
          
        } else if(res.status == -1){
          this.open3("该名称部门名称已经存在！");
        } else {
          this.open3("未修改");
        }
        this.form = {};
      });
    },
    // 删除
     removeDeptInfoByService(list) {
      removeDeptInfo(list).then((res) => {
        if (res.status !=-1) {
          this.open2("删除成功！");
          this.page = 1;
          let obj = this.getObject(1, this.items, this.context);
          this.getDeptInfoListByService(obj);
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
        case "deptId":
          obj = new SelectDeptManagerByType(page, items, context, null, null);
          break;
        case "parentDeptName":
          obj = new SelectDeptManagerByType(page, items, null, context, null);
          break;
        case "deptName":
          obj = new SelectDeptManagerByType(page, items, null, null, context);
          break;
        default:
          obj = new SelectDeptManagerByType(page, items, null, null, null);
      }
      return obj;
    },
    currentChangeClick(e) {
      let obj = this.getObject(e, this.items, this.context);
      this.getDeptInfoListByService(obj);
    },
    childOneSubmit() {
      // 提交表单
      this.dialogFormVisible = false;
      console.log(this.form);
      // this.form = {};
      if(this.isAdd == true){
        console.log("这是添加");
        if(this.form.deptName && this.form.director && this.form.parentDeptName)
        this.addDeptInfoByService(this.form)
      }else{
        let obj = {};
        obj.newDeptManagerVo = this.form
        obj.oldDeptManagerVo = this.thisRow
        this.modifyDeptInfoByService(obj)
        console.log("这是修改");
      }
    },
    updateClick(index, row) {
      console.log(index, row);
      this.isdisabled = true
      this.dialogFormVisible = true;
      this.title = "编辑院系";
      this.thisRow = row;
      this.isAdd = false
      for (const key in row) {
        this.$set(this.form, key, row[key]);
      }
    },
    HomeChildFiveDelAll(dataonLineListSelections){
      let list = [];
      for (var i = 0; i < dataonLineListSelections.length; i++) {
        list.push(dataonLineListSelections[i].deptId);
      }
      console.log(list);
      this.removeDeptInfoByService(list);
    },
    addClick() {
      this.dialogFormVisible = true;
      this.title = "新增院系";
      this.isdisabled = false
      this.isAdd = true
    },
    exit() {
      this.dialogFormVisible = false;
      this.form = {};
      this.thisRow = {};
    },
    HomeChildFiveVal(value) {
      this.queryType = value;
    },
    getParentDept() {
      console.log("获取上级部门");
      this.getDeptAndMajorNameListByService()
    },
    SelectByType(context, page) {
      this.context = context;
      this.page = page;
      let obj = this.getObject(this.page, this.items, this.context);
      this.getDeptInfoListByService(obj);
    },
    HomeChildFiveInit(){
      let obj = new SelectDeptManagerByType(1, 11, null, null, null);
      this.getDeptInfoListByService(obj);
      this.context = null;
    }
  },
  created() {
    let obj = this.getObject(this.page, this.items, this.context);
    this.getDeptInfoListByService(obj);
  },
};
</script>

<style scoped>
#homeChildren05 {
  background: rgb(250, 250, 250);
}
#homeChildren05 > div {
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