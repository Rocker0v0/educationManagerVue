<template>
  <div class="students">
    <home-top-control :topTitle="topTitle" :code="code"></home-top-control>
    <div class="left_control">
      <my-info :user="user" :sno="sno"></my-info>
      <choose-control :routAndTitle="routAndTitle"></choose-control>
    </div>
    <div class="contentIndex"></div>
    <div class="right_control">
      <router-link to="/Student/StudentChildOne"></router-link>
      <router-link to="/Student/StudentChildTwo"></router-link>
      <router-link to="/Student/StudentChildThree"></router-link>
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
  name: "students",

  data() {
    return {
      topTitle: "教务管理系统",
      routAndTitle: [
        {
          path: "/Student/StudentChildOne",
          title: "我的课表",
          icon: "el-icon-user-solid",
        },
        {
          path: "/Student/StudentChildTwo",
          title: "我的成绩",
          icon: "el-icon-s-data",
        },
        {
          path: "/Student/StudentChildThree",
          title: "我的选课",
          icon: "el-icon-s-ticket",
        },
        {
          path: "/Student/StudentChildFour",
          title: "已选课程",
          icon: "el-icon-s-operation",
        },
      ],
      code: 3,
      user: null,
      sno: null,
    };
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
        this.user = res.name.SNAME;
        this.sno = res.data.SUser;
      }
    });
    if (this.$route.path != "/Student/welcomeStudent") {
      this.$router.push({ path: "/Student/welcomeStudent" });
    }
  },
  components: {
    MyInfo,
    ChooseControl,
    HomeTopControl,
    HomeBottonControl,
  },
};
</script>

<style scoped>
.students {
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