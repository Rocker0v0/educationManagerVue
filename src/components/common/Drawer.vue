<template>
  <div id="Drawer">
    <el-drawer
      title="编辑"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <span v-for="(value,key,index) in editRow" :key="index">{{value}}</span>
    </el-drawer>
  </div>
</template>

<script>
export default {

props:{
    compare: {
      type: Object,
      default() {
        return {};
      },
    },
    drawer:{
        type:Boolean,
        default(){
            return false
        }
    },
    editRow:{
        type:Object,
        default(){
            return {}
        }
    },
    editIndex:{
        type:Number,
        default(){
            return -1
        }
    }
},

  name: "Drawer",
  data() {
      return {
        direction: 'rtl',
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
          this.$emit("updateDrawer")
      }
    }
};
</script>

<style>
</style>