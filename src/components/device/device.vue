<template>
  <div id="fireMonitoring">
    <div class="leftTable">
      <div class="tableSelect">
        <div class="select">
          <div>
            <el-select v-model="value" placeholder="设备编号">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div>
            <el-select v-model="value" placeholder="设备状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div>
            <el-select v-model="value" placeholder="MAC/IMEI">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="table">
        <!-- <el-table :data="tableData" style="width: 100%" >
                  <el-table-column prop="name" label="事件名称"></el-table-column>
                  <el-table-column prop="time" label="时间"></el-table-column>
                  <el-table-column prop="deviceName" label="设备名称"></el-table-column>
                  <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>-->
        <div class="tebleHeader">
          <div>安装编号</div>
          <div>设备名称</div>
          <div>设备编码</div>
          <div>当前状态</div>
          <div>所属区域</div>
          <div>地址</div>
          <div>详情</div>
        </div>
        <div class="tebleColumn" v-for="item in tableData" :key="item.id">
          <div>{{item.deviveId}}</div>
          <div>{{item.name}}</div>
          <div>{{item.deviceNum}}</div>
          <div v-if="item.type == 1" style="color:green">● 正常</div>
          <div v-if="item.type == 2" style="color:orange">● 警告</div>
          <div v-if="item.type == 3" style="color:red">● 异常</div>
          <div>{{item.area}}</div>
          <div>{{item.address}}</div>
          <div>
            <span class="detalis">详情</span>
          </div>
        </div>
      </div>
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :total="50"
        style="text-align: center;"
      ></el-pagination>
      <span class="echartsShow" v-show="show1" @click="EchartShow(1)">
        <i class="el-icon-arrow-left" style="color:#fff;font-size:0.13rem"></i>
      </span>
    </div>
    <div class="rightecharts" v-show="show2">
      <span class="echartsShow2" v-show="show3" @click="EchartShow(2)">
        <i class="el-icon-close" style="color:#fff;font-size:0.13rem"></i>
      </span>

      <el-tabs v-model="activeName" @tab-click="handleClick" style="height:90%;padding:2.5%">
        <el-tab-pane label="数据统计图例" name="echarts" style="height:90%">
          <div class="Echarts echarts2">
            <!-- <span>设备状态分布图</span> -->
            <!-- <ve-ring :data="chartData" :extend="chartExtend" :height="wapperHeight"></ve-ring> -->
            <div class="select selects">
              <el-select v-model="value" placeholder="设备类型" style="float: right;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div id="myChart2" :style="{width: '100%', height: '80%'}"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="事件列表" name="dataList">
          <div class="select2">
            <div>
              <el-select v-model="value" placeholder="事件等级">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div>
              <el-select v-model="value" placeholder="设备类型">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div>
              <el-date-picker v-model="value1" type="date" placeholder="发生时间"></el-date-picker>
            </div>
            <div class="baobiaobtn">报表导出</div>
          </div>
          <div class="selectList">
            <!-- <el-table :data="tableData" style="width: 100%" >
                  <el-table-column prop="name" label="事件名称"></el-table-column>
                  <el-table-column prop="time" label="时间"></el-table-column>
                  <el-table-column prop="deviceName" label="设备名称"></el-table-column>
                  <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>-->
            <div class="table">
              <div class="tebleHeader">
                <div>事件名称</div>
                <div>时间</div>
                <div>设备名称</div>
                <div>地址</div>
              </div>
              <div class="tebleColumn" v-for="item in tableData2" :key="item.id">
                <div>{{item.name}}</div>
                <div>{{item.time}}</div>
                <div>{{item.deviceName}}</div>
                <div>{{item.address}}</div>
              </div>
            </div>
          </div>
          <el-pagination
            class="pagination2"
            layout="prev, pager, next"
            :total="50"
            style="text-align: center;"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    this.chartExtend = {
      "xAxis.0.axisLabel.color": "white", //x轴文本颜色
      "yAxis.0.axisLabel.color": "white", //y轴文本改变颜色
      legend: {
        textStyle: {
          color: "white"
        }
      }
    };
    this.yAxis = [
      {
        axisLabel: {
          show: true,
          textStyle: {
            color: "white" //这里是改变字体颜色
          }
        }
      }
    ];
    this.title = {
      textStyle: {
        color: "#fff", //标题颜色
        fontWeight: "bold", //粗体
        fontSize: 24 //字体大小
      }
    };
    return {
      wapperHeight: "320px",
      value: "",
      value1: "",
      chartExtend: "",
      yAxis: "",
      title: "",
      activeName: "echarts",
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 }
        ],
        textStyle: {
          color: "white"
        }
      },
      options: [
        {
          value: "1",
          label: "初级"
        },
        {
          value: "2",
          label: "中级"
        },
        {
          value: "3",
          label: "高级"
        },
        {
          value: "4",
          label: "紧急"
        }
      ],
      show1: false,
      show2: true,
      show3: true,
      tableData: [
        {
          id: 1,
          deviveId: "012345678901",
          name: "某某某",
          deviceNum: "000000",
          type: 1,
          area: "东佘山",
          deviceName: "东佘山123大道1234路...",
          address: "某某某某某某..."
        },
        {
          id: 2,
          deviveId: "012345678901",
          name: "某某某",
          deviceNum: "000000",
          type: 2,
          area: "东佘山",
          deviceName: "东佘山123大道1234路...",
          address: "某某某某某某..."
        },
        {
          id: 3,
          deviveId: "012345678901",
          name: "某某某",
          deviceNum: "000000",
          type: 3,
          area: "东佘山",
          deviceName: "东佘山123大道1234路...",
          address: "某某某某某某..."
        },
        {
          id: 4,
          deviveId: "012345678901",
          name: "某某某",
          deviceNum: "000000",
          type: 1,
          area: "东佘山",
          deviceName: "东佘山123大道1234路...",
          address: "某某某某某某..."
        },
        {
          id: 5,
          deviveId: "012345678901",
          name: "某某某",
          deviceNum: "000000",
          type: 2,
          area: "东佘山",
          deviceName: "东佘山123大道1234路...",
          address: "某某某某某某..."
        },
        {
          id: 7,
          deviveId: "012345678901",
          name: "某某某",
          deviceNum: "000000",
          type: 3,
          area: "东佘山",
          deviceName: "东佘山123大道1234路...",
          address: "某某某某某某..."
        },
        {
          id: 8,
          deviveId: "012345678901",
          name: "某某某",
          deviceNum: "000000",
          type: 1,
          area: "东佘山",
          deviceName: "东佘山123大道1234路...",
          address: "某某某某某某..."
        },
        {
          id: 9,
          deviveId: "012345678901",
          name: "某某某",
          deviceNum: "000000",
          type: 1,
          area: "东佘山",
          deviceName: "东佘山123大道1234路...",
          address: "某某某某某某..."
        },
        {
          id: 10,
          deviveId: "012345678901",
          name: "某某某",
          deviceNum: "000000",
          type: 1,
          area: "东佘山",
          deviceName: "东佘山123大道1234路...",
          address: "某某某某某某..."
        },
        {
          id: 11,
          deviveId: "012345678901",
          name: "某某某",
          deviceNum: "000000",
          type: 1,
          area: "东佘山",
          deviceName: "东佘山123大道1234路...",
          address: "某某某某某某..."
        },
        {
          id: 12,
          deviveId: "012345678901",
          name: "某某某",
          deviceNum: "000000",
          type: 1,
          area: "东佘山",
          deviceName: "东佘山123大道1234路...",
          address: "某某某某某某..."
        },
        {
          id: 13,
          deviveId: "012345678901",
          name: "某某某",
          deviceNum: "000000",
          type: 2,
          area: "东佘山",
          deviceName: "东佘山123大道1234路...",
          address: "某某某某某某..."
        },
        {
          id: 14,
          deviveId: "012345678901",
          name: "某某某",
          deviceNum: "000000",
          type: 1,
          area: "东佘山",
          deviceName: "东佘山123大道1234路...",
          address: "某某某某某某..."
        }
      ],
      tableData2: [
        {
          id: 1,
          name: "某某某",
          time: "2020.12.11 12:10",
          deviceName: "某某某某某某...",
          address: "某某某某某某..."
        },
        {
          id: 2,
          name: "某某某",
          time: "2020.12.11 12:10",
          deviceName: "某某某某某某...",
          address: "某某某某某某..."
        },
        {
          id: 3,
          name: "某某某",
          time: "2020.12.11 12:10",
          deviceName: "某某某某某某...",
          address: "某某某某某某..."
        },
        {
          id: 4,
          name: "某某某",
          time: "2020.12.11 12:10",
          deviceName: "某某某某某某...",
          address: "某某某某某某..."
        },
        {
          id: 5,
          name: "某某某",
          time: "2020.12.11 12:10",
          deviceName: "某某某某某某...",
          address: "某某某某某某..."
        },
        {
          id: 6,
          name: "某某某",
          time: "2020.12.11 12:10",
          deviceName: "某某某某某某...",
          address: "某某某某某某..."
        },
        {
          id: 7,
          name: "某某某",
          time: "2020.12.11 12:10",
          deviceName: "某某某某某某...",
          address: "某某某某某某..."
        },
        {
          id: 8,
          name: "某某某",
          time: "2020.12.11 12:10",
          deviceName: "某某某某某某...",
          address: "某某某某某某..."
        },
        {
          id: 9,
          name: "某某某",
          time: "2020.12.11 12:10",
          deviceName: "某某某某某某...",
          address: "某某某某某某..."
        },
        {
          id: 10,
          name: "某某某",
          time: "2020.12.11 12:10",
          deviceName: "某某某某某某...",
          address: "某某某某某某..."
        },
        {
          id: 11,
          name: "某某某",
          time: "2020.12.11 12:10",
          deviceName: "某某某某某某...",
          address: "某某某某某某..."
        },
        {
          id: 12,
          name: "某某某",
          time: "2020.12.11 12:10",
          deviceName: "某某某某某某...",
          address: "某某某某某某..."
        }
      ]
    };
  },
  mounted() {
    this.getDate();
    this.EchartsImg2();
  },
  methods: {
    EchartsImg2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表

      myChart.setOption({
        title: {
          text: "设备状态分布图",
          textStyle: {
            color: "#fff",
            fontSize: 18
          }
        },
        color: ["#008f13", "#8f8f8f", "#8f0000"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          left: 10,
          bottom: "10%",
          textStyle: {
            color: "#fff"
          },
          data: ["正常", "异常", "报警"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: false
              }
            },
            label: {
              //  饼图图形上的文本标签

              normal: {
                // normal 是图形在默认状态下的样式
                show: true,
                position: "center",
                color: "#fff",
                fontSize: 25,
                formatter: "123台某某某设备" // {b}:数据名； {c}：数据值； {d}：百分比，可以自定义显示内容，
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "正常" },
              { value: 310, name: "异常" },
              { value: 234, name: "报警" }
            ]
          }
        ]
      });
    },
    EchartShow(index) {
      if (index == 1) {
        (this.show1 = false), (this.show2 = true), (this.show3 = true);
      } else {
        (this.show1 = true), (this.show2 = false), (this.show3 = false);
        this.getDate();
      }
    },
    getDate() {
      this.chartExtend = {
        "xAxis.0.axisLabel.color": "white", //x轴文本颜色
        "yAxis.0.axisLabel.color": "white", //y轴文本改变颜色
        legend: {
          textStyle: {
            color: "white"
          }
        }
      };
      this.yAxis = [
        {
          axisLabel: {
            show: true,
            textStyle: {
              color: "white" //这里是改变字体颜色
            }
          }
        }
      ];
      this.title = {
        textStyle: {
          color: "#fff", //标题颜色
          fontWeight: "bold", //粗体
          fontSize: 24 //字体大小
        }
      };
    },

    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style scoped>
#fireMonitoring {
  color: #fff;
  height: 100%;
  display: flex;
}
.leftTable {
  flex: 6;
  margin-right: 15px;
  position: relative;
  background: #00061f;
  padding: 10px;
}
.select {
  overflow: hidden;
}
.dtaList {
  height: 100%;
  background: #00061f;
  color: #fff;
}
.Echarts {
  height: 93%;
  width: 100%;
  padding: 1%;
  margin: 0 auto 10px auto;
  background: #000d42;
  position: relative;
}
.Echarts span {
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
}
.rightecharts {
  flex: 4;
  background: #00061f;
  position: relative;
}
.tableSelect .select div {
  float: left;
  margin-right: 50px;
}
.rightecharts .select div {
  float: left;
  margin-right: 20px;
}

.baobiaobtn {
  float: right;
  margin-right: 0;
  line-height: 40px;
  margin-right: 20px;
  background: #000d42;
  text-align: center;
  color: #c0c4cc;
  font-size: 15px;
  cursor: pointer;
  padding: 0 20px;
}
.rightecharts >>> .el-date-editor.el-input,
>>> .el-date-editor.el-input__inner {
  width: 120px;
}
.tableSelect >>> .el-input__inner {
  width: 200px;
  height: 50px;
  background: #000d42;
  border: none;
}
.rightecharts >>> .el-input__inner {
  width: 120px;
  background: #000d42;
  border: none;
}
.table {
  width: 100%;
  margin: 20px auto;
  background: #00061f;
}
.tebleHeader {
  background: #000d42;
}
.tebleColumn,
.tebleHeader {
  display: flex;
  border-bottom: 1px solid #0f152c;
}
.tebleColumn div,
.tebleHeader div {
  flex: 1;
  height: 45px;
  line-height: 40px;
}
>>> .el-pagination {
  color: white !important;
  background: transparent !important;
}
>>> .el-pager,
>>> .el-pager li {
  background: transparent !important;
}
>>> .el-pagination .btn-next,
>>> .el-pagination .btn-prev {
  background: transparent !important;
  color: #fff !important;
}
.el-pagination >>> button:disabled,
.el-pagination >>> button:disabled {
  color: white !important;
  background: transparent !important;
}
.detalis {
  color: #70d4fe;
  cursor: pointer;
}

>>> .el-tabs__item {
  color: #fff !important;
}
>>> .el-tabs__nav-wrap::after {
  background-color: transparent;
}
>>> .el-input__inner {
  width: 120px;
  background: #000d42;
  border: none;
}
.echartsShow {
  display: block;
  height: 50px;
  background: rgba(255, 255, 255, 0.4);
  width: 25px;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -25px;
  line-height: 60px;
  cursor: pointer;
}
.echartsShow2 {
  display: block;
  position: absolute;
  right: 0;
  top: 0px;
  cursor: pointer;
  z-index: 2;
}
>>> .el-tabs,
.el-tabs--top,
#pane-echarts,
.el-tabs__content {
  height: 100% !important;
}
>>> .el-tabs__header {
  height: 5%;
}
>>> .el-tabs__content {
  height: 100% !important;
}
.deviceType {
  position: absolute;
  right: 0;
  top: 0;
}
.pagination {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
.selectList {
  position: relative;
}
.selects {
  width: 55%;
  position: absolute;
  right: 0;
  z-index: 2;
}
.pagination2 {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
}
>>> .is-active {
  color: #70d4fe !important;
}
.select2 {
  width: 100%;
  height: 40px;
  overflow: hidden;
}
.select2 div {
  float: left;
  width: 120px;
  margin-right: 20px;
  overflow: hidden;
  cursor: pointer;
}

.select2 > div:last-child {
  float: right;
  margin-right: 0;
  line-height: 40px;
  margin-right: 20px;
  background: #000d42;
  text-align: center;
  color: #c0c4cc;
  font-size: 15px;
  cursor: pointer;
}
</style>