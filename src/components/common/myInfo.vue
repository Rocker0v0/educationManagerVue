<template>
  <div class="myInfo">
    <img :src="image" />
    <div><span v-if="$route.path.indexOf('Student')!=-1">学生</span>
    <span v-else-if="$route.path.indexOf('Teacher')!=-1">教师</span>
    <span v-else>用户</span>：{{ user }}</div>
    <div v-if="$route.path.indexOf('Home')==-1"><span v-if="$route.path.indexOf('Student')!=-1">学号</span>
    <span v-if="$route.path.indexOf('Teacher')!=-1">编号</span>：{{sno}}</div>
  </div>
</template>

<script>
export default {
  name: "myInfo",
  props:{
    user:{
      type:String,
      default:""
    },
    sno:{
      type:String,
      default(){
        return ""
      }
    }
  },
  data() {
    return {
      image:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      name: "Rocker",
      ID: "1001",
    };
  },
  created(){
    console.log(this.$route.path);
  }
};
</script>

<style>
.myInfo {
  width: 100%;
  height: 20%;
  background: #545c64;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: white;
}
.myInfo div {
  height: 20%;
  text-align: center;
  display: flex;
  align-items: center;
}
.myInfo img {
  width: 35%;
  height: 46%;
  border-radius: 50%;
}
</style>