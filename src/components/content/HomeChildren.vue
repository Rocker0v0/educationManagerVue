<template>
  <div id="homeChildren">
    <div class="homeChildren_01">
      <div class="top">
        <home-tab-control :data="data"></home-tab-control>
      </div>
      <div class="content">
        <child-content-control
          :options="options"
          :tableData="tableData"
          :titleDate="titleDate"
          :compare="compare"
        >
          <template #homeChildContent>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item
                    v-for="(value1, key1, index1) in compare"
                    :key="index1"
                    :label="value1"
                  >
                    <div
                      v-for="(value2, key2, index2) in props.row"
                      :key="index2"
                    >
                      <span v-if="key1 == key2">{{ value2 }}</span>
                    </div>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
          </template>
        </child-content-control>
      </div>
      <div class="empty">
        <div class="page">
          <el-pagination
            @current-change="currentChangeClick"
            background
            layout="prev, pager, next"
            :total="1000"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import childContentControl from "./HomeCildrenChild/childContentControl.vue";
import homeTabControl from "./HomeCildrenChild/homeTabControl.vue";

export default {
  name: "homeChildren",
  props: {
    compare: {
      type: Object,
      default() {
        return {};
      },
    },
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    titleDate: {
      type: Array,
      default() {
        return [];
      },
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    data: {
      type: String,
      default() {
        return "";
      },
    },
  },
  components: {
    homeTabControl,
    childContentControl,
  },

  data() {
    return {};
  },
  methods: {
    currentChangeClick(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped>
#homeChildren > div {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
.homeChildren_01 > div {
  width: 100%;
}
.top {
  height: 3%;
}
.content {
  height: 86.5%;
  position: relative;
}
.empty {
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>