<template>
  <div class="home">
    <home-top-control :topTitle="topTitle" :code="code"></home-top-control>
    <div class="left_control">
      <my-info :user="user" ></my-info>
      <choose-control :routAndTitle="routAndTitle"></choose-control>
    </div>
    <div class="contentIndex"></div>
    <div class="right_control">
      <router-view />
    </div>
    <home-botton-control></home-botton-control>
  </div>
</template>

<script>
import ChooseControl from "../components/common/chooseControl.vue";
import HomeBottonControl from "../components/common/homeBottonControl.vue";
import HomeTopControl from "../components/common/homeTopControl.vue";
import MyInfo from "../components/common/myInfo.vue";
import { getSession } from "../network/login";
export default {
  name: "home",
  data() {
    return {
      topTitle: "教务管理系统",
      routAndTitle: [
        {
          path: "/Home/HomeChildOne",
          title: "学生信息管理",
          icon: "el-icon-user",
        },
        {
          path: "/Home/HomeChildTwo",
          title: "教师信息管理",
          icon: "el-icon-s-custom",
          
        },
        {
          path: "/Home/HomeChildNine",
          title: "班级信息管理 ",
          icon: "el-icon-s-opportunity",
        },
        {
          path: "/Home/HomeChildFive",
          title: "学院信息管理 ",
          icon: "el-icon-s-finance",
        },
        {
          path: "/Home/HomeChildFour",
          title: "课程信息管理",
          icon: "el-icon-s-management",
        },
        {
          path: "/Home/HomeChildSex",
          title: "教室信息管理",
          icon: "el-icon-s-home",
        },
        {
          path: "/Home/HomeChildThree",
          title: "统一选课管理",
          icon: "el-icon-s-grid",
        },
        {
          path: "/Home/HomeChildEight",
          title: "学生成绩管理 ",
          icon: "el-icon-s-data",
        },
        {
          path: "/Home/HomeChildSeven",
          title: "课程安排管理 ",
          icon: "el-icon-s-operation",
        },
      ],
      code: 9,
      user: null,
    };
  },
  components: {
    MyInfo,
    ChooseControl,
    HomeTopControl,
    HomeBottonControl,
  },
  methods: {
    getSessionByService(index) {
      return getSession(index);
    },
  },
  created() {
    this.getSessionByService(this.code).then((res) => {
      console.log(res);
      if (res.data == null) {
        this.$router.replace("/Login");
      } else {
        this.user = res.data.USERNAME;
        console.log(res.data);
        // this.$store.commit("addUser",this.data)
      }
    });
    if (this.$router.path != "/Home/welcome") {
      this.$router.replace("/Home/welcome");
    }
  },
};
</script>

<style scoped>
.home {
  height: 100%;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-end;
  margin: 0 auto;
}

.left_control {
  height: 83%;
  width: 15%;
  color: beige;
}
.right_control {
  height: 83%;
  width: 69.5%;
}
.right_control > div {
  height: 100%;
}
.contentIndex {
  height: 80%;
  width: 0.5%;
}
</style>