<template>
  <div class="home">
    <div class="tab_control">
      <div>
        <div class="imgAndText">
          <div class="img"></div>
          <div class="text">
            <span v-html="'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'"></span
            >学生信息管理系统
          </div>
        </div>
        <div class="exit">退出</div>
      </div>
    </div>
    <div class="left_control">
      <my-info></my-info>
      <choose-control></choose-control>
    </div>
    <div class="contentIndex"></div>
    <div class="right_control">
      <router-link to="/Home/HomeChildOne"></router-link>
      <router-link to="/Home/HomeChildTwo"></router-link>
      <router-link to="/Home/HomeChildThree"></router-link>
      <router-link to="/Home/HomeChildFour"></router-link>
      <router-link to="/Home/HomeChildSetting"></router-link>
      <router-view />
    </div>
    <div class="bottom_control">
      <div>
        <span
          >Roker网络有限责任有限公司 Copyright @2020-2021
          com.rocker.admin@qq</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import ChooseControl from "../components/content/chooseControl.vue";
import MyInfo from "../components/content/myInfo.vue";
export default {
  name: "home",
  components: {
    MyInfo,
    ChooseControl,
  },
  created(){ 
        if(this.$router.path != '/Home/HomeChildOne'){
            this.$router.replace('/Home/HomeChildOne')
        }
    }
};

</script>

<style>
.home {
  height: 100%;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-end;
  margin: 0 auto;
}
.tab_control {
  width: 100%;
  height: 7%;
  background: #545c64;
  display: flex;
  justify-content: center;
  color: white;
}
.tab_control > div {
  width: 75%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.img {
  width: 18%;
  height: 80%;
  background: url("/windows_8.png") no-repeat;
  background-size: 100% 100%;
}
.imgAndText {
  height: 100%;
  width: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.exit {
  height: 100%;
  width: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
.bottom_control {
  height: 4%;
  width: 100%;
  background: #dbd7d7;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>