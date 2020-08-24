<template>
    <div :id="this.id" class="showWaterTank"></div>
</template>
<script>
import $ from 'jquery';
import 'echarts-liquidfill/src/liquidFill.js';
export default {
    data(){
        return {
           id:'waterTank',
           item:{
                areaName: "西佘山",
                buildRange: "3",
                dcTypeName: "液位计",
                deviceAddr: "山顶消防水库",
                deviceAlti: "",
                deviceGpsLati: "31.09588",
                deviceGpsLong: "121.18133",
                deviceId: 21,
                deviceTypeCode: 16,
                installNumber: "865820030763135",
                lowAlarm:"2",
                lowWarn:"2.2",
                mainSensor:"2.6923",
                mainSensorUnit:12,
                mainSensorUnitName:"m",
                runStatus:69,
                runStatusName:"高液位预警",
                upAlarm:"2.7",
                upWarn:"2.6",
           }
        }
    },
    methods:{
      showWaterTank(id,item){
        var myChart = this.$echarts.init(document.getElementById(id));
        let tank=item.mainSensor/item.buildRange;
        myChart.setOption({series: [{
              type:'liquidFill',
              data:[tank],
              label:{
                  normal:{
                      textStyle:{
                          fontSize:20  // 修改字体大小
                      }
                  }
              }
        }]});
       },
       initWaterTank(){
           this.showWaterTank(this.id,this.item);
       }
    },
    mounted(){
        this.initWaterTank();
    },
    updated(){
       // this.id=this.deviceId12+"wt";
        this.showWaterTank(this.id,this.item);
    }
}
</script>
<style lang="stylus" scoped>
    .showWaterTank{
        width:230px;
        height:210px;
    }
</style>