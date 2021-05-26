<template>
  <div
    class="mainPage"
    :style="{ background: 'url(' + img.url + ')', backgroundSize: '100% 100%' }"
  >
    <div class="login">
      <div class="title">
        <u><i>欢迎登录信息管理系统</i></u>
      </div>
      <div class="userImageDiv">
        <img src="contact.ico" />
        <input
          class="user"
          placeholder="请输入用户名"
          v-model="username"
          type="text"
        />
      </div>
      <div class="userImageDiv">
        <img src="lock.ico" />
        <input
          class="password"
          placeholder="请输入密码"
          v-model="password"
          type="password"
        />
      </div>
      <div class="specalDiv">
        <div>
          <span><strong>验证码:</strong></span>
        </div>
        <span v-html="'&nbsp;&nbsp'"></span>
        <input
          class="Yanzheng"
          @input="thisIdentifyCode = $event.target.value"
          type="text"
        />
        <span v-html="'&nbsp;&nbsp;'"></span>
        <div>
          <button class="getRandomCode" @click="getRandomCodeClick">
            {{ getIdentifyCode }}
          </button>
        </div>
        <span v-html="'&nbsp;&nbsp;&nbsp;'"></span>
        <div id="RandomCode" ref="RandomCode">
          <verify-code-fun
            :identifyCode="identifyCode"
            :contentWidth="contentWidth"
            :contentHeight="contentHeight"
          ></verify-code-fun>
        </div>
      </div>
      <div style="font-size: 20px">
        <el-radio-group v-model="radio">
          <el-radio :label="3">学生</el-radio>
          <el-radio :label="6">老师</el-radio>
          <el-radio :label="9">管理员</el-radio>
        </el-radio-group>
      </div>
      <div>
        <div @click="userInfoSubmit" class="submit boom">
          <span>登录</span>
        </div>
      </div>
      <div class="tip" :class="{ activity: activity }">
        {{ tip }}
      </div>
      <div class="brief">
        <a href="#">忘记密码？</a> <span v-html="'|&nbsp;&nbsp;'"></span
        ><a href="#">帮助？</a>
      </div>
    </div>
  </div>
</template>

<script>
import VerifyCodeFun from "../components/common/verifyCodeFun";
import {
  getVerifyCode,
  getStatueCode,
  setSession,
  getSession,
} from "../network/login";
export default {
  name: "login",
  data() {
    return {
      identifyCode: "",
      contentWidth: null,
      contentHeight: null,
      getIdentifyCode: "获取验证码",
      username: null,
      password: null,
      thisIdentifyCode: "",
      tip: "",
      activity: true,
      status: null,
      radio: 3,
      img: {
        url: require("../assets/image/login.jpeg"),
        name: "bg",
      },
    };
  },
  components: { VerifyCodeFun },
  methods: {
    getRandomCodeClick(e) {
      this.getIdentifyCode = "点击换一张";
      // this.getRandomCode();
      this.getVerifyCodeByServer();
    },
    getRandomCode() {
      let str = "";
      for (let i = 0; i < 4; i++) {
        str = str + Math.floor(Math.random() * 10);
      }
      this.identifyCode = str;
    },
    //网络请求
    getVerifyCodeByServer() {
      getVerifyCode().then((res) => {
        console.log(res);
        this.identifyCode = res.toString();
      });
    },

    //获取登录成功或者失败的状态码
    getStatueCodeByService(userName, password, code) {
      return getStatueCode(userName, password, code);
    },
    //登陆成功，设置session
    setSessionByServer(username, password, code) {
      return setSession(username, password, code);
    },
    //获取session
    getSessionByServer(code) {
      getSession(code).then((res) => {
        console.log(res);
        if (res.data != null) {
          switch (code) {
            case 3:
              this.username = res.data.SUser;
              this.password = res.data.SPass;
              break;
            case 6:
              this.username = res.data.TUSER;
              this.password = res.data.TPASS;
              break;
            case 9:
              this.username = res.data.USERNAME;
              this.password = res.data.USERPWD;
              break;
          }
        } else {
          this.username = null;
          this.password = null;
        }
      });
    },
    //提交anxios请求
    userInfoSubmit() {
      if (
        this.username != "" &&
        this.password != "" &&
        this.thisIdentifyCode != ""
      ) {
        //网络请求
        if (this.thisIdentifyCode != this.identifyCode) {
          this.tip = "验证码错误";
        } else {
          this.getStatueCodeByService(
            this.username,
            this.password,
            this.radio
          ).then((res) => {
            this.status = res.statue;
            if (this.status == 1) {
              this.setSessionByServer(
                this.username,
                this.password,
                this.radio
              ).then((res) => {
                switch (this.radio) {
                  case 3:
                    this.$router.push({ path: "/Student" });
                    break;
                  case 6:
                    this.$router.push({ path: "/Teacher" });
                    break;
                  case 9:
                    this.$router.push({ path: "/Home" });
                    break;
                }
              });
            } else {
              this.tip = res.message;
            }
          });
        }
      } else {
        if (this.username == "") {
          this.tip = "请输入用户名！";
        } else if (this.password == "") {
          this.tip = "请输入密码！";
        } else {
          this.tip = "请输入验证码!";
        }
      }
      setTimeout(() => {
        this.tip = "";
      }, 4000);
    },
  },
  mounted() {
    this.contentWidth = this.$refs.RandomCode.offsetWidth;
    this.contentHeight = this.$refs.RandomCode.offsetHeight;
    //加载界面，获取验证码
    this.getRandomCodeClick();
    this.getSessionByServer(this.radio);
  },
  watch: {
    radio: function (newVal, oldVal) {
      this.getSessionByServer(this.radio);
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 18px;
}
button {
  border: 0 none;
  background: #5b88ed;
  border-radius: 5px;
  outline: none;
}
button:focus {
  border: 0 none;
  outline: none;
}

.mainPage {
  width: 100%;
  height: 1009px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  width: 20%;
  height: 50%;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: rgb(255, 255, 255, 0.5);
}
.login > div {
  width: 85%;
  height: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login input {
  background: rgba(246, 250, 249, 0.7);
  outline: none;
  border: none;
  width: 100%;
  height: 60%;
}
.Yanzheng {
  flex-basis: 14%;
  max-height: 35%;
}
#RandomCode {
  width: 35%;
  height: 80%;
  background-color: white;
  display: flex;
  justify-content: center;
}
.getRandomCode {
  font-size: 10px;
  padding: 5px;
  background-color: rgba(145, 146, 148, 0.8);
  color: white;
  cursor: pointer;
}
.getRandomCode:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
.submit {
  width: 100%;
  height: 60%;
  background: rgba(13, 104, 241, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}
.specalDiv span {
  color: rgb(46, 44, 44);
}
.brief {
  align-self: center;
}
a {
  text-decoration: none;
}
.userImageDiv {
  position: relative;
}
.userImageDiv img {
  width: 8%;
  height: 30%;
  position: absolute;
  left: 2px;
}
.userImageDiv input {
  text-indent: 30px;
  font-size: 14px;
}
.boom {
  position: relative;
  cursor: pointer;
}
.boom:focus {
  outline: none;
}
.boom:after {
  content: "";
  display: block;
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  pointer-events: none;
  background-color: #333;
  background-repeat: no-repeat;
  background-position: 50%;
  opacity: 0;
  transition: all 0.3s;
}
.boom:active:after {
  opacity: 0.3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0s;
}
.tip {
  max-height: 4%;
}
.activity {
  color: red;
}
</style>