<template>
  <div id="chooseControl">
    <div style="height: 5px"></div>
    <el-col :span="12">
      <el-menu
        default-active="/Home/HomeChildOne"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item
          index="/Home/HomeChildOne"
          :class="{ commonStyle: isActicity }"
        >
          <i class="el-icon-arrow-right" route=""></i>
          <span slot="title">学生信息管理</span>
        </el-menu-item>
        <el-menu-item
          index="/Home/HomeChildTwo"
          :class="{ commonStyle: isActicity }"
        >
          <i class="el-icon-arrow-right"></i>
          <span slot="title">学生选课管理</span>
        </el-menu-item>
        <el-menu-item
          index="/Home/HomeChildThree"
          :class="{ commonStyle: isActicity }"
        >
          <i class="el-icon-arrow-right"></i>
          <span slot="title">学生成绩管理</span>
        </el-menu-item>
        <el-menu-item
          index="/Home/HomeChildSetting"
          :class="{ commonStyle: isActicity }"
        >
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "",
  methods: {},
  data() {
    return {
      isActicity: true,
    };
  },
};
</script>
<style scoped>
.chooseControl {
  width: 100%;
}
.el-col {
  width: 100%;
}
.commonStyle {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0px;
}
</style>