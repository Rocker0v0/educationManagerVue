<template>
  <div id="child_tab_control">
    <div class="studentInfoManagerText">>>当前位置:{{ data }}</div>
  </div>
</template>

<script>
export default {
  name: "child_tab_control",
  props: {
    data: {
      type: String,
      default() {
        return "";
      },
    },
  },
};
</script>

<style scoped>
#child_tab_control div {
  height: 100%;
  width: 100%;
}
.studentInfoManagerText {
  font-size: 15px;
  color: rgb(148, 148, 144);
}
</style>