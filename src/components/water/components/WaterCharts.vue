<template>
  <div :id="this.id" class="showWaterTank"></div>
</template>
<script>
import $ from 'jquery'
import 'echarts-liquidfill/src/liquidFill.js'
export default {
  data() {
    return {
      id: 'waterTank',
    }
  },
  methods: {
    showWaterTank(id, item) {
      var myChart = this.$echarts.init(document.getElementById(id))
      let tank = item[0].curVal / item[0].buildRange
      myChart.setOption({
        series: [
          {
            type: 'liquidFill',
            radius: '85%',
            data: [tank],
            label: {
              normal: {
                textStyle: {
                  fontSize: 20, // 修改字体大小
                },
              },
            },
          },
        ],
      })
    },
    initWaterTank() {
      this.showWaterTank(this.id, this.item)
    },
  },
  props: ['item', 'deviceId'],
  mounted() {
    this.initWaterTank()
  },
  updated() {
    this.id = this.deviceId + 'wt'
    this.showWaterTank(this.id, this.item)
  },
}
</script>
<style lang="stylus" scoped>
.showWaterTank {
  width: 100%;
  height: 210px;
}
</style>