<template>
  <renderless-component-example>
    <div id="bg" v-if="isShowBg1"></div>
    <div class="swrapp" v-if="isShowBg1">
      <div class="messageTitle">
        <span>{{typeName}}</span>
        <img src="../../../static/img/delete.png" @click="closeHistory">
      </div>
      <div class="filterTime">
        <el-date-picker v-model="historyValue" style="margin-left: 30px;z-index:99999999;width:220px;height:50px;" @change="historyChange" @blur="historyChange" type="datetimerange" :start-placeholder="$t('ElectricalMonitoring.Record.startTime')" :end-placeholder="$t('ElectricalMonitoring.Record.endTime')">
        </el-date-picker>
        <div class="timeItem" @click="aWeek">{{$t('ElectricalMonitoring.Record.lastWeek')}}</div>
        <div class="timeItem" @click="aMonth">{{$t('ElectricalMonitoring.Record.lastMonth')}}</div>
        <div class="timeItem" @click="threeMonth">{{$t('ElectricalMonitoring.Record.lastThreeMonths')}}</div>
      </div>
      <div class="historyEchar" id="history"></div>
    </div>
  </renderless-component-example>
</template>
<script>
import qs from 'qs'
import { getTimeToString } from '../../../components/rule/getTime'
export default {
  data() {
    return {
      isShowBg1: false,
      electId: '',
      startTime: '',
      typeName: '',
      historyValue: [],
    }
  },
  mounted() {},
  methods: {
    histval(electId, startTime, endTime) {
      this.electId = electId
      var currentData = qs.stringify({
        electId: electId,
        startTime: startTime,
        endTime: endTime,
      })
      let this_ = this
      this.$http
        .post('http://srv.shine-iot.com:8060/elect/channel/histval', currentData)
        .then(function (response) {
          let electMsgChannels = response.data.data.electMsgChannels
          let timeArry = electMsgChannels.map((item) => {
            return this_.formatDate(item.msgDate)
          })
          let checkValArry = electMsgChannels.map((item) => {
            return item.checkVal
          })
          let unitName = response.data.data.unitName
          let lowerVal = response.data.data.lowerVal
          let upperVal = response.data.data.upperVal
          this_.historyEchar(timeArry, checkValArry, lowerVal, upperVal, unitName)
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
      return month + '-' + date
    },
    historyChange() {
      this.startTime = this.historyValue[0].getTime()
      this.endTime = this.historyValue[1].getTime()
      this.histval(this.electId, this.startTime, this.endTime)
    },
    aWeek() {
      // 获取上一周的开始和结束时间
      var myDate = new Date()
      var weekDate = new Date(myDate.getTime() - 7 * 24 * 3600 * 1000) // 计算开始时间用
      var weekDate2 = new Date(myDate.getTime() - 7 * 24 * 3600 * 1000) // 计算结束时间用
      var day = weekDate.getDay()
      var time = weekDate.getDate() - day + (day === 0 ? -6 : 1)
      var startDate = new Date(weekDate.setDate(time))
      var beginTime =
        startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate()
      var endDate = new Date(weekDate2.setDate(time + 6))
      var endTime = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate()
      this.histval(this.electId, new Date(beginTime).getTime(), new Date(endTime).getTime())
    },
    aMonth() {
      // 获取上一月的开始和结束时间
      var myDate = new Date()
      var year = myDate.getFullYear()
      var month = myDate.getMonth()
      if (month === 0) {
        month = 12
        year = year - 1
      } else if (month < 10) {
        month = '0' + month
      }
      var monthDate = new Date(year, month, 0)
      var beginTime = year + '-' + month + '-01'
      var endTime = year + '-' + month + '-' + monthDate.getDate()
      this.histval(this.electId, new Date(beginTime).getTime(), new Date(endTime).getTime())
    },
    threeMonth() {
      // 获取上一月的开始和结束时间
      var myDate = new Date()
      var year = myDate.getFullYear()
      var month = myDate.getMonth()
      var monthEnd = myDate.getMonth()
      month = month - 3
      if (month === 0) {
        month = 12
        year = year - 1
      } else if (month < 10) {
        month = '0' + month
      }
      if (monthEnd === 0) {
        monthEnd = 12
        year = year - 1
      } else if (monthEnd < 10) {
        monthEnd = '0' + monthEnd
      }
      var monthDate = new Date(year, monthEnd, 0)
      var beginTime = year + '-' + month + '-01'
      var endTime = year + '-' + monthEnd + '-' + monthDate.getDate()
      this.histval(this.electId, new Date(beginTime).getTime(), new Date(endTime).getTime())
    },
    historyEchar(timeArry, checkValArry, lowerVal, upperVal, unitName) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('history'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          //				        trigger: 'yAxis',
        },
        color: ['#138af5', '#15b8bd'],
        grid: {
          left: '2%',
          right: '5%',
          top: '15%',
          bottom: '10%',
          containLabel: true,
        },
        xAxis: [
          {
            show: true,
            type: 'category',
            splitLine: {
              show: false,
            },
            data: timeArry,
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#FFFFFF',
              },
            },
            boundaryGap: true,
          },
        ],
        yAxis: [
          {
            name: unitName,
            type: 'value',
            splitLine: {
              show: true,
            },
            axisLabel: {
              color: '#FFFFFF',
            },
            axisLine: {
              lineStyle: {
                color: '#999',
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.2)',
              },
            },
          },
        ],
        series: [
          {
            name: '上限',
            type: 'line',
            data: [upperVal],
            markLine: {
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#8F0000',
                  },
                },
              },
              data: [
                {
                  type: 'average',
                  name: '上限预警',
                },
              ],
            },
          },
          {
            name: '下限 ',
            type: 'line',
            data: [lowerVal],
            markLine: {
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#8F0000',
                  },
                },
              },
              data: [
                {
                  type: 'average',
                  name: '下限预警',
                },
              ],
            },
          },
          {
            type: 'line',
            lineStyle: {
              normal: {
                width: 2,
                shadowOffsetY: 4,
                shadowBlur: 4,
                shadowColor: 'rgba(54,92,245,1)',
              },
            },
            data: checkValArry,
          },
        ],
      })
    },
    closeHistory() {
      this.isShowBg1 = false
    },
    openHistory(typeName) {
      this.typeName = typeName
      this.isShowBg1 = true
    },
  },
}
</script>
<style lang="stylus" scoped>
.el-date-editor .el-range-input {
  color: white;
  background-color: red !important;
}

#bg {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: #000000;
  z-index: 81;
  -moz-opacity: 0.4;
  opacity: 0.4;
}

.swrapp {
  position: fixed;
  width: 1000px;
  height: 483px;
  background: linear-gradient(-30deg, rgba(0, 8, 40, 1) 0%, rgba(0, 14, 71, 1) 98%);
  border-radius: 8px;
  left: 400px;
  right: 0;
  top: 18%;
  z-index: 92;

  .messageTitle {
    display: flex;
    height: 72px;
    justify-content: space-between;
    align-items: center;
    margin-left: 40px;
    margin-right: 40px;

    span {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(204, 204, 204, 1);
    }

    img {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }

  .filterTime {
    display: flex;

    .timeItem {
      display: flex;
      align-items: center;
      cursor: pointer;
      justify-content: center;
      margin-left: 30px;
      width: 160px;
      height: 60px;
      background: rgba(0, 23, 115, 1);
      border-radius: 4px;
      color: white;
    }
  }

  .historyEchar {
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 10px;
    height: 300px;
  }
}
</style>
