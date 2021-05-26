<template>
  <div class="tab_control" id="homeTopControl">
    <div>
      <div class="imgAndText">
        <div class="img"></div>
        <div class="text">
          <span v-html="'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'"></span
          >{{ topTitle }}
        </div>
      </div>
      <div class="exit" @click="exit">退出</div>
    </div>
  </div>
</template>

<script>
import { delSession } from "../../network/login";
export default {
  props: {
    topTitle: {
      type: String,
      default() {
        return "";
      },
    },
    code: {
      type: Number,
      default() {
        return null;
      },
    },
  },
  name: "homeTopControl",
  methods: {
    exit() {
      this.delSessionBySerice(this.code).then((res) => {
            this.$router.replace("/Login");
      });
    },
    delSessionBySerice(code) {
      return delSession(code);
    },
  },
};
</script>

<style scope>
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
</style>