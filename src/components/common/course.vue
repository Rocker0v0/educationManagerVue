<template>
  <div id="course">
    <div class="table">
      <table>
        <thead>
          <div>
            <tr align="center">
              <th>节次/周次</th>
              <th>星期日</th>
              <th>星期一</th>
              <th>星期二</th>
              <th>星期三</th>
              <th>星期四</th>
              <th>星期五</th>
              <th>星期六</th>
            </tr>
          </div>
        </thead>
        <tbody>
          <div v-for="(item, index1) in class_item" :key="++index1">
            <tr align="center">
              <td class="classitem">
                  <div class="current"></div>第{{ item }}节</td>
              <td
                v-for="(day_item, key2) in ['1', '2', '3', '4', '5', '6', '7']"
                :key="key2"
                rowspan="2"
                class="classitem2"
              >
                <div
                  v-for="(item2, index) in class_list"
                  :key="index"
                >
                  <div
                    v-if="
                      item2.day == key2 &&
                      (item2.classOne == item || item2.classTwo == item)
                    "
                    class="tdChoose"
                  >
                    <div v-if="isWeek">
                      {{ item2.courseName }}<br />
                      <div v-if="route == '/Student/StudentChildOne'">
                        教师: {{ item2.teacherName }}<br />
                      </div>
                      教室: {{ item2.classRoomName }}<br />周次:  {{ week }}
                    </div>
                    <div v-else>
                      {{ item2.courseName }}<br />
                      <div v-if="route == '/Student/StudentChildOne'">
                        <span v-html="'教师: '"></span
                        >{{ item2.teacherName }}<br />
                      </div>
                      <span v-html="'教室: '"></span
                      >{{ item2.classRoomName }}<br /><span
                        v-html="'周次: '"
                      ></span>
                      第{{ item2.startWeek }}-{{ item2.endWeek }}周
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr align="center">
              <td class="classitem"><div class="current"></div>第{{ item * 1 + 1 }}节</td>
            </tr>
          </div>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "course",
  props: {
    isWeek: {
      type: Boolean,
      default() {
        return false;
      },
    },
    week: {
      type: String,
      default() {
        return "";
      },
    },
    class_list:{
        type:Array,
        default(){
            return [
        {
          courseName: "大学语文",
          teacherName: "王鹏飞",
          semester: "1",
          startWeek: "9",
          endWeek: "16",
          day: "1",
          classOne: "7",
          classTwo: "8",
          classRoomName: "A2201",
        },
        {
          courseName: "大学语文",
          teacherName: "王鹏飞",
          semester: "3",
          startWeek: "9",
          endWeek: "16",
          day: "2",
          classOne: "5",
          classTwo: "6",
          classRoomName: "A2201",
        },
        {
          courseName: "大学语文",
          teacherName: "王鹏飞",
          semester: "5",
          startWeek: "9",
          endWeek: "16",
          day: "3",
          classOne: "3",
          classTwo: "4",
          classRoomName: "A2201",
        },
        {
          courseName: "大学语文",
          teacherName: "王鹏飞",
          semester: "9",
          startWeek: "9",
          endWeek: "16",
          day: "4",
          classOne: "5",
          classTwo: "6",
          classRoomName: "A2201",
        },
      ]
        }
    }
  },
  data() {
    return {
      class_item: ["1", "3", "5", "7", "9"],
      route: null,
    };
  },
  created() {
    this.route = this.$route.path;
  },
};
</script>

<style scoped>
.table {
  height: 100%;
  margin-top: 7px;
}
table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
}
thead > div {
  width: 100%;
  text-align: center;
  padding: 0;
  margin: 0;
}

td {
  width: 125.5px;
  height: 63px;
  border: 1px solid rgb(163, 162, 160);
  border-collapse: collapse;
  position: relative;
}
th {
  width: 125.5px;
  height: 43px;
  padding-top: 20px;
  border: 1px solid rgb(163, 162, 160);
  border-collapse: collapse;
  color: whitesmoke;
  background: #4a64d8;
}
.classitem {
  background: rgb(174, 167, 212);
}
.classitem2 {
  background: rgb(231, 228, 228);
}
.tdChoose {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 100%;
  background: #8091dd;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.current{
    height: 22px;
}
</style>