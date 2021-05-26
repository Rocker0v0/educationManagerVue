<template>
  <div id="chooseControl">
    <div style="height: 5px"></div>
    <el-col :span="12">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item
          v-for="(item, index) in routAndTitle"
          :key="index"
          :index="item.path"
          :class="{ commonStyle: isActicity }"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    routAndTitle: {
      type: Array,
      default() {
        return [
          
        ];
      },
    },
    default_active:{
      type:String,
      default(){
        return ''
      }
    }
  },
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