<template>
  <div class="boxRightContent">
    <div class="titleRight">
      <div class="firstChild">
        <div :class="(1==tabIndex)?'activity':'normal'" @click="tabChange(1)">{{$t('Index.statistics')}}</div>
        <div :class="(2==tabIndex)?'activity':'normal'" @click="tabChange(2)">{{$t('Index.eventList')}}</div>
      </div>
      <img src="../../../src/static/img/rightDelete.png">
    </div>
    <div class="graphical" v-show="1==tabIndex">
      <Indexgraphical ref="graphical"></Indexgraphical>
    </div>
    <EventMessage ref="events" v-show="2==tabIndex"></EventMessage>
  </div>
</template>
<script>
import qs from 'qs'
import Indexgraphical from '../../common/components/Indexgraphical'
import EventMessage from '../../common/components/EventMessage'
import { mapState, mapGetters } from 'vuex'
import { deviceStatus, DeviceType, LevCodeName } from '../../components/rule/typeName'
export default {
  components: {
    Indexgraphical,
    EventMessage,
  },
  data() {
    return {
      activeName: 'echarts',
      tabIndex: 1,
      echartEquipmentType: '',
      trendValue1: [],
      lang: localStorage.getItem('Language'),
      areaID: '',
    }
  },
  mounted() {
    if (this.$route.path == '/index') {
      this.initEcharData(this.lang, this.areaID)
    } else if (this.$route.path == '/fireMonitoring') {
      this.fireMonitorInitData(this.lang, this.areaID)
    } else if (this.$route.path == '/ElectricalMonitoring') {
      this.initElectEchar(this.lang, this.areaID)
    } else if (this.$route.path == '/controllerList') {
      this.initControllEchar(this.lang, this.areaID)
    } else if (this.$route.path == '/newsletter') {
      this.initNewsletter(this.lang, this.areaID)
    } else if (this.$route.path == '/water') {
      this.initWaterEcharts(this.lang, this.areaID)
    }
  },
  methods: {
    initEcharData(lang, areaID) {
      this.echartEquipmentType = this.$store.state.echartEquipmentType
      this.areaID = areaID
      this.lang = lang
      //查询设备报警趋势
      this.$refs.graphical.alarmTrend(
        'http://srv.shine-iot.com:8060/device/alarm/cnt',
        this.areaID,
        this.echartEquipmentType,
        '',
        ''
      )
      //查询设备数量分布图
      this.$refs.graphical.devicesNumber(
        'http://srv.shine-iot.com:8060/device/type/cnt',
        areaID,
        lang
      )
      //设备状态分布图
      this.$refs.graphical.deviceStatusFn(
        'http://srv.shine-iot.com:8060/device/stus/cnt',
        lang,
        areaID,
        ''
      )
      //设备类型
      this.$refs.graphical.equipmentType('http://srv.shine-iot.com:8060/device/tpcodes', lang)
      //初始化事件列表
      this.$refs.events.eventAreaEvts(
        'http://srv.shine-iot.com:8060/event/area/evts',
        lang,
        areaID,
        '',
        '',
        '',
        '',
        1
      )
      //查询事件等级
      this.$refs.events.eventLevelFn()
      //设备类型
      this.$refs.events.equipmentType('http://srv.shine-iot.com:8060/device/tpcodes', lang)
    },
    //火灾监控初始化图例
    fireMonitorInitData(lang, areaID) {
      this.areaID = areaID
      this.lang = lang
      //查询设备报警趋势
      this.$refs.graphical.alarmTrend(
        'http://srv.shine-iot.com:8060/fdev/mnt/alarm/cnt',
        this.areaID,
        '',
        '',
        ''
      )
      //查询设备数量分布图
      this.$refs.graphical.devicesNumber(
        'http://srv.shine-iot.com:8060/fdev/mnt/type/cnt',
        areaID,
        lang
      )
      //设备状态分布图
      this.$refs.graphical.deviceStatusFn(
        'http://srv.shine-iot.com:8060/fdev/mnt/stus/cnt',
        lang,
        areaID,
        ''
      )
      //设备类型
      this.$refs.graphical.equipmentType('http://srv.shine-iot.com:8060/fdev/mnt/types', lang)
      //初始化事件列表
      this.$refs.events.eventAreaEvts(
        'http://srv.shine-iot.com:8060/fdev/mnt/area/evts',
        lang,
        areaID,
        '',
        '',
        '',
        '',
        1
      )
      //查询事件等级
      this.$refs.events.eventLevelFn()
      //设备类型
      this.$refs.events.equipmentType('http://srv.shine-iot.com:8060/fdev/mnt/types', lang)
    },
    //电器火灾的图例
    initElectEchar(lang, areaID) {
      this.areaID = areaID
      this.lang = lang
      //查询设备报警趋势
      this.$refs.graphical.alarmTrend(
        'http://srv.shine-iot.com:8060/elect/alarm/cnt',
        this.areaID,
        '',
        '',
        ''
      )
      //查询设备数量分布图
      this.$refs.graphical.devicesNumber(
        'http://srv.shine-iot.com:8060/elect/channel/type/cnt',
        areaID,
        lang
      )
      //设备状态分布图
      this.$refs.graphical.deviceStatusFn(
        'http://srv.shine-iot.com:8060/elect/channel/stus/cnt',
        lang,
        areaID,
        ''
      )

      //设备类型
      this.$refs.graphical.equipmentType(
        'http://srv.shine-iot.com:8060/elect/channel/tycodes',
        lang
      )
      //初始化事件列表
      this.$refs.events.eventAreaEvts(
        'http://srv.shine-iot.com:8060/elect/area/evts',
        lang,
        areaID,
        '',
        '',
        '',
        '',
        1
      )
      //查询事件等级
      this.$refs.events.eventLevelFn()
      //设备类型
      this.$refs.events.equipmentType('http://srv.shine-iot.com:8060/elect/channel/tycodes', lang)
    },
    //报警控制器的初始化图例
    initControllEchar(lang, areaID) {
      this.areaID = areaID
      this.lang = lang
      //查询设备报警趋势
      this.$refs.graphical.alarmTrend(
        'http://srv.shine-iot.com:8060/fctrl/alarm/cnt',
        this.areaID,
        '',
        '',
        ''
      )
      //查询设备数量分布图
      this.$refs.graphical.devicesNumber(
        'http://srv.shine-iot.com:8060/fctrl/type/cnt',
        areaID,
        lang
      )
      //设备状态分布图
      this.$refs.graphical.deviceStatusFn(
        'http://srv.shine-iot.com:8060/device/stus/cnt',
        lang,
        areaID,
        ''
      )

      //设备类型
      this.$refs.graphical.equipmentType('http://srv.shine-iot.com:8060/fctrl/tpcodes', lang)
      //初始化事件列表
      this.$refs.events.eventAreaEvts(
        'http://srv.shine-iot.com:8060/event/area/evts',
        lang,
        areaID,
        '',
        '',
        '',
        '',
        1
      )
      //查询事件等级
      this.$refs.events.eventLevelFn()
      //设备类型
      this.$refs.events.equipmentType('http://srv.shine-iot.com:8060/fctrl/tpcodes', lang)
    },
    initNewsletter(lang, areaID) {
      this.areaID = areaID
      this.lang = lang
      //查询设备报警趋势
      this.$refs.graphical.alarmTrend(
        'http://srv.shine-iot.com:8060/gwdtu/offline/cnt',
        this.areaID,
        '',
        '',
        ''
      )
      //查询设备数量分布图
      this.$refs.graphical.devicesNumber(
        'http://srv.shine-iot.com:8060/gwdtu/type/cnt',
        areaID,
        lang
      )
      //设备状态分布图
      this.$refs.graphical.deviceStatusFn(
        'http://srv.shine-iot.com:8060/gwdtu/stus/cnt',
        lang,
        areaID,
        ''
      )

      //设备类型
      this.$refs.graphical.equipmentType('http://srv.shine-iot.com:8060/gwdtu/tpcodes', lang)
      //初始化事件列表
      this.$refs.events.eventAreaEvts(
        'http://srv.shine-iot.com:8060/gwdtu/area/evts',
        lang,
        areaID,
        '',
        '',
        '',
        '',
        1
      )
      //查询事件等级
      this.$refs.events.eventLevelFn()
      //设备类型
      this.$refs.events.equipmentType('http://srv.shine-iot.com:8060/gwdtu/tpcodes', lang)
    },
    //消防用水统计图
    initWaterEcharts(lang, areaID) {
      this.areaID = areaID
      this.lang = lang
      //查询设备报警趋势
      this.$refs.graphical.alarmTrend(
        'http://srv.shine-iot.com:8060/facilities/alarm/cnt',
        this.areaID,
        '',
        '',
        ''
      )
      //查询设备数量分布图
      this.$refs.graphical.devicesNumber(
        'http://srv.shine-iot.com:8060/facilities/type/cnt',
        areaID,
        lang
      )
      //设备状态分布图
      this.$refs.graphical.deviceStatusFn(
        'http://srv.shine-iot.com:8060/facilities/stus/cnt',
        lang,
        areaID,
        ''
      )

      //设备类型
      this.$refs.graphical.equipmentType('http://srv.shine-iot.com:8060/device/tpcodes', lang)
      //初始化事件列表
      this.$refs.events.eventAreaEvts(
        'http://srv.shine-iot.com:8060/facilities/area/evts',
        lang,
        areaID,
        '',
        '',
        '',
        '',
        1
      )
      //查询事件等级
      this.$refs.events.eventLevelFn()
      //设备类型
      this.$refs.events.equipmentType('http://srv.shine-iot.com:8060/device/tpcodes', lang)
    },
    tabChange(num) {
      this.tabIndex = num
      if (this.tabIndex == 2) {
        //事件等级
      } else {
        if (this.$route.path == '/index') {
          this.initEcharData(this.lang, this.areaID)
        } else if (this.$route.path == '/fireMonitoring') {
          this.fireMonitorInitData(this.lang, this.areaID)
        } else if (this.$route.path == '/ElectricalMonitoring') {
          this.initElectEchar(this.lang, this.areaID)
        } else if (this.$route.path == '/controllerList') {
          this.initControllEchar(this.lang, this.areaID)
        } else if (this.$route.path == '/newsletter') {
          this.initNewsletter(this.lang, this.areaID)
        } else if (this.$route.path == '/water') {
          this.initWaterEcharts(this.lang, this.areaID)
        }
      }
    },
  },
}
</script>
<style lang="stylus" scoped>
.boxRightContent {
  height: 100%;

  .titleRight {
    display: flex;
    justify-content: space-between;
    margin: 10px;
    margin-left: 30px;
    margin-bottom: 10px;
    height: 50px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.08);

    .firstChild {
      display: flex;
      width: 200px;
      justify-content: space-between;

      .normal {
        cursor: pointer;
        height: 28px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 300;
        color: rgba(204, 204, 204, 1);
      }

      .activity {
        height: 30px;
        cursor: pointer;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(112, 212, 254, 1);
        padding-bottom: 10px;
        border-bottom: 4px solid rgba(112, 212, 254, 0.4);
      }
    }

    img {
      cursor: pointer;
      width: 14px;
      height: 14px;
    }
  }

  .graphical {
    height: 93%;
    margin-left: 30px;
    margin-right: 30px;
  }

  .echartsShow2 {
    display: block;
    position: absolute;
    right: 0;
    top: 0px;
    cursor: pointer;
    z-index: 2;
  }
}
</style>