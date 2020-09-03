<template>
    <renderless-component-example>
      <div :id="this.id" class="showWaterTank" @click="SeeDeviceDetail"></div>
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
      id: 'waterTank',
    }
  },
  components:{
    DeviceDetailsCom
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
    SeeDeviceDetail() {
      this.$refs.childEquipmentDetails.openEquipmentDetails(this.deviceId)
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