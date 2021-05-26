<template>
  <div id="homeChildren06">
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
          @HomeChildSexAdd="addClick"
          @HomeChildSexUpdate="updateClick"
          @HomeChildSexVal="HomeChildSexVal"
          @HomeChildSexSelectByType="SelectByType"
          @HomeChildSexInit="HomeChildSexInit"
          @HomeChildSexDelAll="HomeChildSexDelAll"
          @HomeChildSexDelOne="HomeChildSexDelAll"
        >
          <template #dialog>
            <el-dialog
              :title="title"
              :visible.sync="dialogFormVisible"
              width="30%"
              center
            >
              <el-form :model="form">
                <el-form-item label="教室名称" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.classRoomName"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.describe"
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
  SelectClassRoomInfoByType,
  getAllClassRoom,modifyClassRoom,removeClassRoom,AddClassRoom
} from "../../network/ClassRoomManager";
export default {
  components: { homeTabControl, childContentControl },
  name: "childOne",
  data() {
    return {
      data: "教室信息管理",
      tableData: [
        {
          classRoomId: "1101",
          classRoomName: "A2201",
          describe: "2教学楼A区2楼2201号",
        },
        {
          classRoomId: "1101",
          classRoomName: "A2201",
          describe: "2教学楼A区2楼2201号",
        },
        {
          classRoomId: "1101",
          classRoomName: "A2201",
          describe: "2教学楼A区2楼2201号",
        },
        {
          classRoomId: "1101",
          classRoomName: "A2201",
          describe: "2教学楼A区2楼2201号",
        },
        {
          classRoomId: "1101",
          classRoomName: "A2201",
          describe: "2教学楼A区2楼2201号",
        },
        {
          classRoomId: "1101",
          classRoomName: "A2201",
          describe: "2教学楼A区2楼2201号",
        },
        {
          classRoomId: "1101",
          classRoomName: "A2201",
          describe: "2教学楼A区2楼2201号",
        },
        {
          classRoomId: "1101",
          classRoomName: "A2201",
          describe: "2教学楼A区2楼2201号",
        },
        {
          classRoomId: "1101",
          classRoomName: "A2201",
          describe: "2教学楼A区2楼2201号",
        },
        {
          classRoomId: "1101",
          classRoomName: "A2201",
          describe: "2教学楼A区2楼2201号",
        },
        {
          classRoomId: "1101",
          classRoomName: "A2201",
          describe: "2教学楼A区2楼2201号",
        },
      ],
      titleDate: [
        {
          label: "教室编号",
          prop: "classRoomId",
        },
        {
          label: "教室名称",
          prop: "classRoomName",
        },
        {
          label: "描述",
          prop: "describe",
        },
      ],
      options: [
        {
          value: "classRoomName",
          label: "教室名称",
        },
        {
          value: "classRoomId",
          label: "教室编号",
        },
      ],
      compare: {
        classRoomId: "教室编号",
        classRoomName: "教室名称",
        describe: "描述",
      },
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      thisRow: {},
      title: null,
      items: 11,
      page: 1,
      queryType: null,
      context: null,
      index: null,
      isabled: null,
      isAdd: null,
    };
  },
  methods: {
    //网络请求
    getAllClassRoomByService(selectClassRoomInfoByType) {
      getAllClassRoom(selectClassRoomInfoByType).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.index = res.index;
      });
    },
    
    // 添加
    AddClassRoomByService(classRoomVo) {
      AddClassRoom(classRoomVo).then((res) => {
        if (res.status != -1) {
          this.open2("添加成功！");
          let obj = this.getObject(this.page, this.items, this.context);
          this.getAllClassRoomByService(obj);
        }else{
          this.open3("该教室已经存在！")
        }
        this.form = {};
      });
    },
    // 修改
     modifyClassRoomByService(twoClassRoomVo) {
      modifyClassRoom(twoClassRoomVo).then((res) => {
        if (res.status != -1 && res.status != -2 ) {
          this.open2("修改成功！");
          let obj = this.getObject(this.page, this.items, this.context);
          this.getAllClassRoomByService(obj);
        } else if(res.status == -1){
          this.open3("该教室已经存在！");
        } else {
          this.open3("未修改");
        }
        this.form = {};
      });
    },
    removeClassRoomByService(list) {
      removeClassRoom(list).then((res) => {
        if (res.status !=-1) {
          this.open2("删除成功！");
          this.page = 1;
          let obj = this.getObject(1, this.items, this.context);
          this.getAllClassRoomByService(obj);
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
      // page, items, courseName, type, deptName
      switch (this.queryType) {
        case "classRoomId":
          obj = new SelectClassRoomInfoByType(page, items, context, null);
          break;
        case "classRoomName":
          obj = new SelectClassRoomInfoByType(page, items, null, context);
          break;
        default:
          obj = new SelectClassRoomInfoByType(page, items, null, null);
      }
      return obj;
    },

    currentChangeClick(e) {
      let obj = this.getObject(e, this.items, this.context);
      this.getAllClassRoomByService(obj);
    },
    childOneSubmit() {
      // 提交表单
      this.dialogFormVisible = false;
      if(this.isAdd == true){
        if(this.form.classRoomName&& this.form.describe){
            this.AddClassRoomByService(this.form)
        }else{
          this.open3("有未填写的表单!")
        }
      }else{
        let obj = {};
        obj.newClassRoomVo = this.form
        obj.oldClassRoomVo = this.thisRow
        this.modifyClassRoomByService(obj)
      }
    },
    updateClick(index, row) {
      console.log(index, row);
      this.isAdd = false;
      this.isabled = true;
      this.dialogFormVisible = true;
      this.thisRow = row;
      this.title = "修改教室信息";
      for (const key in row) {
        this.$set(this.form, key, row[key]);
      }
    },
    addClick() {
      this.title = "新增课程信息";
      this.isabled = false;
      this.dialogFormVisible = true;
      this.isAdd = true;
    },
    HomeChildSexInit() {
      let obj = new SelectClassRoomInfoByType(1, 11, null, null, null);
      this.getAllClassRoomByService(obj);
      this.context = null;
    },
    exit() {
      this.dialogFormVisible = false;
      this.form = {};
      this.thisRow = {};
    },
    HomeChildSexVal(value) {
      this.queryType = value;
    },
    SelectByType(context, page) {
      this.context = context;
      this.page = page;
      let obj = this.getObject(this.page, this.items, this.context);
      this.getAllClassRoomByService(obj);
    },
    HomeChildSexDelAll(dataonLineListSelections) {
      let list = [];
      for (var i = 0; i < dataonLineListSelections.length; i++) {
        list.push(dataonLineListSelections[i].classRoomId);
      }
      console.log(list);
      this.removeClassRoomByService(list)
    },
  },
    created() {
    let obj = this.getObject(this.page, this.items, this.context);
    this.getAllClassRoomByService(obj);
  },
};
</script>

<style >
#homeChildren06 {
  background: rgb(250, 250, 250);
}
#homeChildren06 > div {
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
