<template>
  <renderless-component-example>
    <div :id="this.id" class="Hydraulic" @click="SeeDeviceDetail"></div>
    <DeviceDetailsCom ref="childEquipmentDetails"></DeviceDetailsCom>
  </renderless-component-example>
</template>
<script>
import $ from 'jquery'
import 'echarts-liquidfill/src/liquidFill.js'
import DeviceDetailsCom from '../../../common/components/DeviceDetails'
export default {
  data() {
    return {
      id: 'hydraulic',
    }
  },
  components:{
    DeviceDetailsCom
  },
  methods: {
    showWaterTank(id, item) {
      item = item[0]
      var myChart = this.$echarts.init(document.getElementById(id))
      myChart.setOption({
        series: [
          {
            min: 0,
            max: item.buildRange,
            name: '水位压力',
            type: 'gauge',
            detail: {
              //仪表盘详情，用于显示数据
              formatter: '{value}MPa',
              offsetCenter: [0, '70%'],
              fontSize: 15,
            },
            radius: '85%',
            splitNumber: 10, //仪表盘刻度的分割段数。
            startAngle: 225, //仪表盘起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
            endAngle: -45, //仪表盘结束角度
            pointer: {
              width: 5,
              length: '80%',
            },
            axisLine: {
              //仪表盘轴线相关配置
              show: true,
              lineStyle: {
                color: [
                  [item.lowWarn / item.buildRange, '#FF0000'],
                  [item.upWarn / item.buildRange, '#008000'],
                  [1, '#FF0000'],
                ], //仪表盘的轴线可以被分成不同颜色的多段。
                width: 8, //轴线宽度
              },
            },
            splitLine: {
              //分割线样式
              length: 7, //分割线长度
              lineStyle: {
                width: 2,
                color: '#fff',
              },
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 10, //分割线之间分割刻度
              length: 4, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: '#BABABA',
                shadowColor: '#fff', //默认透明
                shadowBlur: 10,
              },
            },
            data: [
              {
                value: item.curVal,
              },
            ],
          },
        ],
      })
    },
    initWaterTank() {
      this.showWaterTank(this.id, this.item)
    },
    SeeDeviceDetail() {
      this.$refs.childEquipmentDetails.openEquipmentDetails(this.deviceId)
    }
  },
  props: ['item', 'deviceId'],
  mounted() {
    this.initWaterTank()
  },
  updated() {
    this.id = this.deviceId + 'hy'
    this.showWaterTank(this.id, this.item)
  },
}
</script>
<style lang="stylus" scoped>
.Hydraulic {
  width: 100%;
  height: 210px;
}
</style>