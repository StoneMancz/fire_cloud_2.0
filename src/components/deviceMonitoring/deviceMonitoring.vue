<template>
  <div id="fireMonitoring">
    <div class="leftTable">
      <div class="tableSelect">
        <div class="select">
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
            <el-select v-model="value" placeholder="当前状态">
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
      <div class="table" style="height:85%">
        <!-- <el-table :data="tableData" style="width: 100%" >
                  <el-table-column prop="name" label="事件名称"></el-table-column>
                  <el-table-column prop="time" label="时间"></el-table-column>
                  <el-table-column prop="deviceName" label="设备名称"></el-table-column>
                  <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>-->
        <div class="canvasList" v-for="item in canvasList">
          <div class="deviceTypes">
            <span style="text-align:left;color:#008F13">正常</span>
            <span style="text-align:right">31米</span>
          </div>
          <div class="deviceTypeImg" style="overflow: hidden;width:100%;height:65%;">
            <ve-liquidfill
              :data="chartData2"
              v-if="item.type == 1"
              :settings="chartSettings"
              :class="{'canvas1': Number(isActive) === 1, 'canvas2': Number(isActive) === 2, canvas3: Number(isActive) > 2}"
              style="width:140%;"
            ></ve-liquidfill>
            <ve-gauge
              :data="chartData3"
              :seriesMap="seriesMap2"
              v-if="item.type == 2"
              :class="{'canvas4': Number(isActive) === 1, 'canvas5': Number(isActive) === 2, canvas6: Number(isActive) > 2}"
            ></ve-gauge>
            <div style="width:60%;margin:0px auto;margin-top:20px" v-if="item.type == 3">
              <img
                src="./../../image/switch.png"
                alt
                style="display:block;width:100%;margin-top:-20%"
              />
              <div class="switchs">
                <span class="active">打开</span>
                <span style="border-left: 1px solid #70D4FE;border-right: 1px solid #70D4FE;">关闭</span>
                <span>自动</span>
              </div>
            </div>
            <div style="width:60%;margin:0px auto;margin-top:20px" v-if="item.type == 4">
              <img
                src="./../../image/switch1.png"
                alt
                style="display:block;width:100%;margin-top:-20%"
              />
              <div class="switchs">
                <span style="border-right: 1px solid #70D4FE;">打开</span>
                <span class="active">关闭</span>
              </div>
            </div>
          </div>
          <div class="deviceCantent">
            <span>名称：{{item.name}}</span>
            <span>编码：{{item.num}}</span>
            <span>区域：{{item.area}}</span>
            <span>地址：{{item.address}}</span>
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

      <el-tabs style="padding:2.5%" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="数据统计图例" name="echarts">
          <div class="Echarts echarts1">
            <div class="select selects">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="float: right;"></el-date-picker>
              <el-select v-model="value" placeholder="设备类型" style="float: right;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <!-- <span>设备报警趋势</span> -->
            <!-- <ve-line :data="chartData" :extend="chartExtend" :height="wapperHeight"></ve-line> -->
            <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
          </div>
          <div class="Echarts echarts2">
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
            <!-- <span>设备状态分布图</span> -->
            <!-- <ve-ring :data="chartData" :extend="chartExtend" :height="wapperHeight"></ve-ring> -->

            <div id="myChart2" :style="{width: '100%', height: '100%'}"></div>
          </div>
          <div class="Echarts echarts3">
            <!-- <span>设备数量分布图</span> -->
            <!-- <ve-histogram :data="chartData" :extend="chartExtend" :height="wapperHeight"></ve-histogram> -->
            <div id="myChart3" :style="{width: '100%', height: '100%'}"></div>
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
    this.chartSettings1 = {
      labelMap: {
        speed: "速度"
      },
      dataName: {
        speed: "km/h"
      }
    };
    this.chartSettings = {
      seriesMap: {
        上海: {
          label: {
            fontSize: 18,
            insideColor: "#fff"
          }
        }
      }
    };
    this.seriesMap2 = {
      seriesMap: {
        速度: {
          label: {
            fontSize: 12,
            insideColor: "#fff"
          }
        }
      }
    };
    return {
      screenWidth: document.body.clientWidth,
      fenbianlv: localStorage.getItem("fenbianlv"),
      wapperHeight: "320px",
      value: "",
      value1: "",
      chartExtend: "",
      yAxis: "",
      title: "",
      activeName: "echarts",
      isActive: 0,
      chartData2: {
        columns: ["city", "percent"],
        rows: [
          {
            city: "上海",
            percent: 0.45
          }
        ]
      },

      chartData3: {
        columns: ["type", "a", "b", "value"],
        rows: [{ type: "速度", value: 80, a: 1, b: 2 }],
        seriesMap: {
          //大刻度标签。
          distance: -70, //数字刻度距离
          textStyle: {
            //数字刻度样式
            color: "#fff",
            fontSize: 12
          }
        }
      },
      canvasList: [
        {
          type: 1,
          num: 0.45,
          name: "某某某某某某",
          num: "123456789456",
          area: "某某某某",
          address: "某某某某某某某某某"
        },
        {
          type: 1,
          num: 0.45,
          name: "某某某某某某",
          num: "123456789456",
          area: "某某某某",
          address: "某某某某某某某某某"
        },
        {
          type: 2,
          num: 0.45,
          name: "某某某某某某",
          num: "123456789456",
          area: "某某某某",
          address: "某某某某某某某某某"
        },
        {
          type: 2,
          num: 0.45,
          name: "某某某某某某",
          num: "123456789456",
          area: "某某某某",
          address: "某某某某某某某某某"
        },
        {
          type: 3,
          num: 0.45,
          name: "某某某某某某",
          num: "123456789456",
          area: "某某某某",
          address: "某某某某某某某某某"
        },
        {
          type: 4,
          num: 0.45,
          name: "某某某某某某",
          num: "123456789456",
          area: "某某某某",
          address: "某某某某某某某某某"
        },
        {
          type: 1,
          num: 0.45,
          name: "某某某某某某",
          num: "123456789456",
          area: "某某某某",
          address: "某某某某某某某某某"
        },
        {
          type: 1,
          num: 0.45,
          name: "某某某某某某",
          num: "123456789456",
          area: "某某某某",
          address: "某某某某某某某某某"
        }
      ],
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
    this.EchartsImg();
    this.EchartsImg2();
    this.EchartsImg3();
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
    console.log(
      1900 < Number(that.screenWidth) && Number(that.screenWidth) < 2500
    );
    if (1900 < Number(that.screenWidth) && Number(that.screenWidth) < 2500) {
      this.isActive = 1;
      console.log("当前分辨率为1920*1080", that.screenWidth, this.isActive);
    } else if (
      1000 < Number(that.screenWidth) &&
      Number(that.screenWidth) < 1900
    ) {
      this.isActive = 2;
      console.log("当前分辨率为1366*768", that.screenWidth, this.isActive);
    } else if (Number(that.screenWidth) > 2500) {
      this.isActive = 3;
      console.log("当前分辨率为2K", that.screenWidth, this.isActive);
    }
  },
  methods: {
    EchartsImg() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表

      myChart.setOption({
        title: {
          text: "设备报警趋势",
          textStyle: {
            color: "#fff",
            fontSize: 18
          }
        },
        color: ["#365CF5"],
        tooltip: {},
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          type: "value",
          name: "数量/件",
          nameTextStyle: {
            color: "#fff"
          },
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      });
    },
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
          orient: "vertical",
          left: 10,
          bottom: 50,
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
                fontSize: 14,
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
    EchartsImg3() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart3"));
      // 绘制图表

      myChart.setOption({
        title: {
          text: "设备报警趋势",
          textStyle: {
            color: "#fff",
            fontSize: 18
          }
        },
        color: ["#365cf5"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff"
              }
            }
          }
        ],
        yAxis: {
          type: "value",
          name: "数量/件",
          nameTextStyle: {
            color: "#fff"
          },
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220]
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
  },

  watch: {}
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
  margin-right: 10px;
  padding: 15px;
  position: relative;
  background: #00061f;
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
  height: 30% !important;
  width: 100%;
  padding: 1%;
  margin: 0 auto 15px auto;
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
  height: 10%;
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
  height: 90%;
}
.tebleHeader {
  background: #000d42;
}
.tebleColumn,
.tebleHeader {
  display: flex;
}
.tebleColumn div,
.tebleHeader div {
  flex: 1;
  height: 45px;
  line-height: 40px;
  border-bottom: 1px solid #0f152c;
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
.canvasList {
  width: 24.5%;
  padding: 0.1rem;
  height: 45%;
  border: 1px solid #47859e;
  float: left;
  margin: 0.01rem;
  background: #000828;
  border-radius: 5px;
  overflow: hidden;
}
.canvasList span {
  display: block;
}
.deviceTypeImg {
  height: 350px;
  position: relative;
}
.deviceTypes {
  height: 8%;
}
.deviceTypes span {
  display: block;
  float: left;
  width: 50%;
}
.deviceCantent {
  height: 32%;
}
.switchs {
  width: 90%;
  display: flex;
  margin: 0 auto;
  border: 1px solid #70d4fe;
  line-height: 35px;
  border-radius: 5px;
}
.switchs span {
  flex: 1;
  text-align: center;
  cursor: pointer;
}
.switchs span:hover {
  background: #70d4fe;
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
.selects {
  width: 55%;
  position: absolute;
  right: 0;
  z-index: 2;
}
.active {
  background: #70d4fe;
}
.canvas1 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: 1%;
}
.canvas2 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: 1%;
}
.canvas3 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: 1%;
}
.canvas4 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: 1%;
}
.canvas5 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: 1%;
}
.canvas6 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: 1%;
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