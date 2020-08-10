<template>
  <renderless-component-example>
    <div class="Polyline">
      <div class="polylineSelect">
        <div class="echartsTilte">状态趋势图</div>
        <div class="echartsChild">
          <el-select v-model="ecahrtsValue1" placeholder="设备类型" style="width:120px" @change="equipmentTypeChange">
            <el-option label="全部" value></el-option>
            <el-option v-for="item in equipmentTypeData" :key="item.type" :label="item.name" :value="item.type"></el-option>
          </el-select>
          <el-date-picker v-model="trendValue1" @change="pickerChange" style="background: #000D42;margin-left:10px;width:150px" type="datetimerange"></el-date-picker>
        </div>
      </div>
      <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
    </div>
    <div class="PieChart">
      <div class="PieChartSelect">
        <div class="echartsTilte">状态统计图</div>
        <div style="margin-left:200px;" class="echartsChild">
          <el-select v-model="ecahrtsValue2" placeholder="设备类型" @change="equipmentTypeChange2">
            <el-option label="全部" value></el-option>
            <el-option v-for="item in equipmentTypeData" :key="item.type" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </div>
      </div>
      <div id="myChart2" :style="{width: '100%', height: '90%'}"></div>
    </div>
    <div class="histogram">
      <div class="echartsTilte">数量统计图</div>
      <div id="myChart3" :style="{width: '100%', height: '90%'}"></div>
    </div>
  </renderless-component-example>
</template>

<script>
import qs from 'qs'
import { deviceStatus, DeviceType, LevCodeName } from '../../components/rule/typeName'
export default {
  data() {
    return {
      ecahrtsValue1: '', // 第一图例设备类型
      ecahrtsValue2: '', //第二图例设备类型
      deviceType: '', //设备类型
      equipmentTypeData: [],
      areaID: '',
      trendValue1: [],
    }
  },
  methods: {
    equipmentTypeChange() {
      this.alarmTrend(this.areaID, this.ecahrtsValue1, this.startTime, this.endTime)
    },
    equipmentTypeChange2() {
      console.log(this.ecahrtsValue2)
      this.deviceStatusFn(this.areaID, this.ecahrtsValue2)
    },
    pickerChange() {
      this.startTime = this.trendValue1[0].getTime()
      this.endTime = this.trendValue1[1].getTime()
      this.alarmTrend(this.areaID, this.ecahrtsValue1, this.startTime, this.endTime)
    },
    //设备状态分布图
    deviceStatusFn(areaId, deviceType) {
      this.areaID = areaId
      this.deviceType = deviceType
      let this_ = this
      var currentData = qs.stringify({
        areaId: this.areaID,
        deviceType: this.deviceType,
      })
      this.$http
        .post('http://srv.shine-iot.com:8060/device/stus/cnt', currentData)
        .then(function (response) {
          console.log(response)
          let responseData = response.data
          let deviceStatusData = responseData.map(function (item, i) {
            let obj = {
              value: item.num,
              name: item.name,
            }
            return obj
          })
          let deviceStatusName = deviceStatusData.map((item) => item.name)
          let colorArr = deviceStatusName.map((item1) => {
            if (item1 == '报警') {
              return '#FF0000'
            } else if (item1 == '告警') {
              return '#C71585'
            } else if (item1 == '预警') {
              return '#800080'
            } else if (item1 == '故障') {
              return '#FFA500'
            } else if (item1 == '低电量') {
              return '#ffff00'
            } else if (item1 == '离线') {
              return '#808080'
            } else if (item1 == '正常') {
              return '#008000'
            }
          })
          this_.EchartsImg2(deviceStatusName, deviceStatusData, colorArr)
        })
    },
    //查询设备类型
    equipmentType() {
      let this_ = this
      var currentData = qs.stringify({ areaId: this_.areaId })
      this.$http
        .post('http://srv.shine-iot.com:8060/device/tpcodes', currentData)
        .then(function (response) {
          this_.equipmentTypeData = response.data.data
        })
    },
    // 事件列表接口调用
    alarmTrend(areaID, deviceType, startTime, endTime) {
      let this_ = this
      var currentData = qs.stringify({
        areaId: areaID,
        deviceType: deviceType,
        startTime: startTime,
        endTime: endTime,
      })
      this.$http
        .post('http://srv.shine-iot.com:8060/device/alarm/cnt', currentData)
        .then(function (response) {
          console.log('设备的报警趋势')
          console.log(response)
          let chartData = response.data.map((item) => {
            item.msgDate = this_.formatDate(item.msgDate)
            return item
          })
          let alarmCntTime = chartData.map((item) => item.msgDate)
          let alarmCntNum = chartData.map((item) => item.msgCnt)
          this_.EchartsImg(alarmCntTime, alarmCntNum)
        })
    },
    //将时间戳转换成日期
    formatDate(d) {
      var now = new Date(d)
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var date = now.getDate()
      var hour = now.getHours()
      var minute = now.getMinutes()
      var second = now.getSeconds()
      if (second < 10) {
        second = '0' + second
      }

      if (minute < 10) {
        minute = '0' + minute
      }

      if (hour < 10) {
        hour = '0' + hour
      }

      if (date < 10) {
        date = '0' + date
      }

      if (month < 10) {
        month = '0' + month
      }
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
    },
    //设备数量分布图
    devicesNumber(areaId) {
      this.areaID = areaId
      let this_ = this
      var currentData = qs.stringify({ areaId: areaId })
      this.$http
        .post('http://srv.shine-iot.com:8060/device/type/cnt', currentData)
        .then(function (response) {
          let chartData = response.data
          let deviceTypeCntName = chartData.map((item) => DeviceType(item.deviceTypeCode))
          let deviceTypeCntNum = chartData.map((item) => item.deviceCnt)
          let deviceTypeColor = chartData.map((item) => {
            if (item.deviceTypeCode == 1) {
              return '#ffa07a'
            } else if (item.deviceTypeCode == 8) {
              return '#008080'
            } else if (item.deviceTypeCode == 12) {
              return '#a0522d'
            } else if (item.deviceTypeCode == 3) {
              return '#ee82ee'
            } else if (item.deviceTypeCode == 6) {
              return '#fafad2'
            } else if (item.deviceTypeCode == 4) {
              return '#b0c4de'
            } else if (item.deviceTypeCode == 7) {
              return '#008080'
            } else if (item.deviceTypeCode == 16) {
              return '#1e90ff'
            } else if (item.deviceTypeCode == 17) {
              return '#87cefa'
            } else if (item.deviceTypeCode == 14) {
              return '#7b68ee'
            } else if (item.deviceTypeCode == 31) {
              return '#e0ffff'
            } else if (item.deviceTypeCode == 30) {
              return '#ffb6c1'
            }
          })
          this_.EchartsImg3(deviceTypeCntName, deviceTypeCntNum, deviceTypeColor)
        })
    },
    EchartsImg(deviceAlarmCntTime, deviceAlarmCntNum) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          textStyle: {
            color: '#fff',
            fontSize: 18,
          },
        },
        color: ['red'],
        tooltip: {
          formatter: '{c0}',
        },
        grid: {
          left: '10px',
          right: '10px',
          top: '30px',
          bottom: '35px',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: deviceAlarmCntTime,
          axisLabel: {
            show: true,
            opacity: 0.2,
            textStyle: {
              color: '#fff',
            },
          },
        },
        yAxis: {
          type: 'value',
          name: '数量/次',
          nameTextStyle: {
            color: '#666666',
            size: 12,
          },
          color: '#fff',
          axisLabel: {
            formatter: function (v) {
              return parseInt(v)
            },
            textStyle: {
              color: '#fff',
              opacity: 0.2,
            },
          },
        },
        series: [
          {
            data: deviceAlarmCntNum,
            type: 'line',
          },
        ],
      })
    },
    EchartsImg2(deviceStatusName, responseData, colorArr) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 10,
          top: -4,
          textStyle: {
            //图例文字的样式
            color: '#fff',
            fontSize: 14,
          },
          data: deviceStatusName,
        },
        //设置饼状图每个颜色块的颜色
        color: colorArr,
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: responseData,
          },
        ],
      })
    },
    EchartsImg3(deviceTypeCntName, deviceTypeCntNum, deviceTypeColor) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart3'))
      // 绘制图表
      myChart.setOption({
        color: ['#365cf5'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: '30px',
          left: '5%',
          right: '4%',
          bottom: '-10',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: deviceTypeCntName,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 15,
              textStyle: {
                color: '#fff',
                fontSize: '12',
              },
            },
          },
        ],
        yAxis: {
          type: 'value',
          name: '台/个',
          nameTextStyle: {
            color: '#fff',
          },
          axisLabel: {
            formatter: function (v) {
              return parseInt(v)
            },
            textStyle: {
              color: '#fff',
            },
          },
        },
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '60%',
            data: deviceTypeCntNum,
            itemStyle: {
              color: function (paras) {
                return deviceTypeColor[paras.dataIndex]
              },
            },
          },
        ],
      })
    },
  },
}
</script>
<style lang="stylus" scoped>
.Polyline {
  height: 30%;
  background: rgba(0, 13, 66, 0.25);
  border-radius: 4px;

  span {
    font-weight: bold;
    font-size: 20px;
    line-height: 30px;
  }

  .polylineSelect {
    display: flex;
    width: 100%;
    align-items: center;
    padding-top: 10px;
    margin-left: 10px;
    overflow: hidden;

    .echartsTilte {
      min-width: 130px;
      margin-left: 10px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }

    .echartsChild {
      display: flex;
      width: 100%;
      margin-right: 20px;
      justify-content: flex-end;
    }
  }
}

.PieChart {
  margin-top: 15px;
  height: 30%;
  background: rgba(0, 13, 66, 0.25);
  border-radius: 4px;

  .PieChartSelect {
    display: flex;
    width: 100%;
    align-items: center;
    padding-top: 10px;
    margin-left: 10px;
    overflow: hidden;

    .echartsTilte {
      min-width: 130px;
      margin-left: 10px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }

    .echartsChild {
      display: flex;
      width: 100%;
      margin-right: 20px;
      justify-content: flex-end;
    }
  }
}

.histogram {
  margin-top: 15px;
  height: 30%;
  background: rgba(0, 13, 66, 0.25);
  border-radius: 4px;

  .echartsTilte {
    min-width: 130px;
    padding-top: 10px;
    margin-left: 10px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
</style>