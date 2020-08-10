<template>
  <div>
    <Headers></Headers>
    <div class="centent">
      <LeftCommon></LeftCommon>
      <div class="right">
        <div class="boxWrap">
          <div class="leftMap">
            <Map ref="mapChild"></Map>
          </div>
          <div class="rightCentent" v-show="show2">
            <RightCommon ref="rightChild"></RightCommon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
import MapLoader from '../../assets/js/AMap'
// 按需引入点聚合
import { mapState, mapGetters } from 'vuex'
import qs from 'qs'
import LeftCommon from '../../common/components/LeftCommon'
// 引入marker
import Headers from '../../common/components/Header'
import RightCommon from '../../common/components/RightCommon'
import DetailsCommon from '../../common/components/DetailsCommon'
import { equipmentCode } from '../../../src/components/Language/code'
import { deviceStatus, DeviceType, LevCodeName } from './../rule/typeName'
import Map from '../../common/components/Map'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'd131f815357afc30295997020bd15940',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
})
export default {
  name: 'Bmaptrace',
  components: {
    LeftCommon,
    Headers,
    RightCommon,
    DetailsCommon,
    Map,
  },
  data() {
    return {
      areaID: '',
      map: '',
      alarmTrendData: [],
      center: { lng: 116.404, lat: 39.915 },
      show: false,
      value: '',
      show2: true,
      show5: false,
      options: [],
      markers: [],
      value: '',
      options: [],
      options2: [],
      tableData: [],
      deviceAlarmCntNum: [],
      deviceAlarmCntTime: [],
      mapTypeList: [],
      startTime: '',
      endTime: '',
      pageSize: 10,
      currentPage: 1,
    }
  },
  mounted() {
    //获取地图底部数据
    this.$refs.mapChild.kcntFunction(this.areaID)
    //获取图形化数据
    this.$refs.rightChild.initEcharData()
  },
  methods: {
    handler({ BMap, map }) {
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
      map.enableScrollWheelZoom(true)
      let mapStyle = { style: 'midnight' }
      map.setMapStyle(mapStyle)
      this.BMap = BMap
      this.map = map
    },
    fatherClickFn(data) {
      this.areaID = data.id
      //显示右侧数据
      this.$refs.rightChild.initEcharData(data.id)
      //点击区域在地图上展示区域下面得设备
      this.$refs.mapChild.areDeviceMap(data)
      //获取地图底部数据
      this.$refs.mapChild.kcntFunction(this.areaID)
    },
    showEven() {
      this.show2 = true
      this.show5 = false
    },
    deviceAlarmTrends() {
      this.$http.post('')
    },
    infoWindowClose(marker) {
      marker.showFlag = false
    },
    infoWindowOpen(marker) {
      marker.showFlag = true
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (!this.eventTimes) {
        this.eventAreaEvts(
          this.areaID,
          this.eventDevcieValue3,
          this.eventLevelValue,
          '',
          '',
          this.currentPage
        )
      } else {
        this.eventAreaEvts(
          this.areaID,
          this.eventDevcieValue3,
          this.eventLevelValue,
          this.eventTimes[0].getTime(),
          this.eventTimes[1].getTime(),
          this.currentPage
        )
      }
    },
  },
}
</script>

<style scoped>
#rightWrap #event {
  background: url('~@/static/img/left.png');
  width: 30px;
  height: 120px;
  position: absolute;
  margin-left: -20px;
  z-index: 2;
  top: 50%;
  margin-top: -45px;
}

.centent {
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
}

#index {
  color: #fff;
  height: 100%;
  width: 100%;
}

.right {
  flex: 9;
  margin-left: 30px;
  width: 90%;
  padding: 10px;
  padding-left: 0px;
}

.boxWrap {
  display: flex;
  height: 100%;
  width: 100%;
}

.leftMap {
  flex: 6;
  position: relative;
  margin-right: 30px;
  margin-bottom: 30px;
  background: #00061f;
  border: 1px solid rgba(112, 212, 254, 1);
}

.rightCentent {
  position: relative;
  width: 640px;
  margin-bottom: 30px;
  background: rgba(0, 6, 31, 1);
}

/*弹窗遮罩层*/
.popBox::before {
  content: '';
  cursor: default;
  background-color: rgba(173, 173, 173, 0.66);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.pagination {
  position: absolute;
  bottom: 2.5%;
  left: 50%;
  transform: translate(-50%, -50%);
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
</style>