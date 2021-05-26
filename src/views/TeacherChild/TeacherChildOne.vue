<template>
  <div id="TeacherChildren01">
    <div class="homeChildren_01">
      <div class="top">
        <home-tab-control :data="data"></home-tab-control>
      </div>
      <div class="content">
        <span v-html="'&nbsp;&nbsp;学年:'"> </span>
          <el-select
          style="width: 150px; margin-left: 10px"
          v-model="value"
          clearable
          placeholder="请选择学年"
        >
          <el-option label="上学年" value="上学年"></el-option>
          <el-option label="下学年" value="下学年"></el-option>
        </el-select>
        <span v-html="'&nbsp;&nbsp;周次:'"> </span>
        <el-select
          style="width: 150px; margin-left: 10px"
          v-model="week"
          clearable
          placeholder="请选择周数"
        >
          <el-option v-for="(item, key) in week_list" :key="key" :value="item">
          </el-option>
        </el-select>
        <course
          :isWeek="isWeek"
          :week="week"
          :class_list="resClass_list"
        ></course>
      </div>
    </div>
  </div>
</template>

<script scoped>
import Course from "../../components/common/course.vue";
import childContentControl from "../../components/content/HomeCildrenChild/childContentControl.vue";
import homeTabControl from "../../components/content/HomeCildrenChild/homeTabControl.vue";
import { getTeacherCourseInfo } from "../../network/teacherClient";
export default {
  components: { homeTabControl, childContentControl, Course },
  name: "childOne",
  data() {
    return {
      data: "学生信息管理",
      resClass_list: null,
      initClass_list: null,
      week_list: [
        "第1周",
        "第2周",
        "第3周",
        "第4周",
        "第5周",
        "第6周",
        "第7周",
        "第8周",
        "第9周",
        "第10周",
        "第11周",
        "第12周",
        "第13周",
        "第14周",
        "第15周",
        "第16周",
        "第17周",
        "第18周",
      ],
      smaster_list: ["1", "2", "3", "4", "5", "6", "7"],
      value: "上学年",
      isWeek: false,
      week: null,
      sno: null,
    };
  },
  methods: {
    // 网络请求
    getTeacherCourseInfoByService(teacherId, type) {
      getTeacherCourseInfo(teacherId, type).then((res) => {
   
        this.resClass_list = res.data;
        console.log(res);
        this.initClass_list = res.data;
             this.week = "第1周"
      });
    },
  },
  created() {
    this.sno = this.$parent.sno;
    if (this.sno) this.getTeacherCourseInfoByService(this.sno, "上学年");
    
  },
  watch: {
    week: function (newVal, oldVal) {
      this.resClass_list = JSON.parse(JSON.stringify(this.initClass_list));
      if (this.week != '') {
        this.isWeek = true;
        this.initClass_list.forEach((element, index) => {
          if (
            parseInt(newVal.slice(1, newVal.length - 1)) <
              parseInt(element.startWeek) ||
            parseInt(newVal.slice(1, newVal.length - 1)) >
              parseInt(element.endWeek)
          ) {
            this.$set(this.resClass_list, index, {});
          }
        });
      } else {
        this.week = oldVal
        this.isWeek = false;
      }
    },
    value: function (newVal, oldVal) {
      if(!newVal){
        this.value = oldVal
      }else{
          this.getTeacherCourseInfoByService(this.sno, newVal);
      }
    },
  },
};
</script>

<style scoped>
#TeacherChildren01 {
  background: rgb(250, 250, 250);
}
#TeacherChildren01 > div {
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
.content > span {
  color: rgb(148, 148, 144);
}
.empty {
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table {
  height: 100%;
  margin-top: 7px;
}
table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
}
thead > div {
  width: 100%;
  text-align: center;
  padding: 0;
  margin: 0;
}
td {
  width: 125.5px;
  height: 63px;
  border: 1px solid rgb(163, 162, 160);
  border-collapse: collapse;
  position: relative;
}
th {
  width: 125.5px;
  height: 43px;
  padding-top: 20px;
  border: 1px solid rgb(163, 162, 160);
  border-collapse: collapse;
  color: whitesmoke;
  background: #545c64;
}
.classitem {
  background: rgb(174, 167, 212);
}
.classitem2 {
  background: rgb(231, 228, 228);
}
</style>
