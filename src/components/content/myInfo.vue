<template>
  <div class="myInfo">
    <img :src="image" />
    <div>昵称：{{ name }}</div>
    <div>ID：{{ ID }}</div>
  </div>
</template>

<script>
export default {
  name: "myInfo",
  data() {
    return {
      image:
        "https://img0.baidu.com/it/u=3461177213,1528805342&fm=26&fmt=auto&gp=0.jpg",
      name: "Rocker",
      ID: "1001",
    };
  },
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