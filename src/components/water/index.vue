<template>
  <renderless-component-example>
    <Headers></Headers>
    <div class="centent">
      <LeftCommon></LeftCommon>
      <div class="right">
        <div class="boxWrap">
          <div class="MonitorData">
            <div class="filterData">
              <div>
                <el-select v-model="equipmentValue" placeholder="设备类型" style @change="equipmentValueChange">
                  <el-option :label="$t('Water.Types')" value></el-option>
                  <el-option v-for="item in equipmentTyleList" :key="item.type" :label="item.name" :value="item.type"></el-option>
                </el-select>
              </div>
              <div>
                <el-select v-model="deviceStatus" placeholder="当前状态" @change="deviceStatusChange">
                  <el-option :label="$t('Water.status')" value></el-option>
                  <el-option v-for="item in deviceStatusList" :key="item.type" :label="item.name" :value="item.type"></el-option>
                </el-select>
              </div>
              <div>
                <input class="installNumbers" :placeholder="$t('Water.hint')" v-model="deviceSN" @change="getWaterData">
              </div>
            </div>
            <div class="waterConten">
              <div class="showWaterTanks" v-for="(item1,index1) in waterList" :key="index1">
                <div class="watertitle">
                  <span>{{item1.runStatusName}}</span>
                  <span v-if="item1.deviceTypeCode==16 || item1.deviceTypeCode==17">{{item1.buildInfoModels[0].curVal}}{{item1.buildInfoModels[0].rangUnitName}}</span>
                  <span v-if="item1.deviceTypeCode==7">{{item1.runStatusName}}</span>
                  <span v-if="item1.deviceTypeCode==2">{{item1.buildInfoModels[0].curVal}}{{item1.buildInfoModels[0].rangUnitName}}</span>
                </div>
                <WaterCharts v-if="item1.deviceTypeCode==16" v-bind:deviceId="item1.deviceId" v-bind:item="item1.buildInfoModels"></WaterCharts>
                <HydraulicFn v-if="item1.deviceTypeCode==17" v-bind:deviceId="item1.deviceId" v-bind:item="item1.buildInfoModels"></HydraulicFn>
                <Thermometer v-if="item1.deviceTypeCode==2" v-bind:item="item1.buildInfoModels"></Thermometer>
                <Switchs v-if="item1.deviceTypeCode==7"></Switchs>
                <div class="Graphics" v-if="item1.deviceTypeCode==2" style="margin-top: -25px;">
                  <div>{{$t('Water.name')}}:{{item1.dcTypeName}}</div>
                  <div>{{$t('Water.coding')}}:{{item1.deviceSN}}</div>
                  <div>{{$t('Water.area')}}:{{item1.areaName}}</div>
                  <div>{{$t('Water.address')}}:{{item1.deviceAddr}}</div>
                </div>
                <div class="Graphics" v-else>
                  <div>{{$t('Water.name')}}:{{item1.dcTypeName}}</div>
                  <div>{{$t('Water.coding')}}:{{item1.deviceSN}}</div>
                  <div>{{$t('Water.area')}}:{{item1.areaName}}</div>
                  <div>{{$t('Water.address')}}:{{item1.deviceAddr}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="rightCentent" v-show="show2">
            <RightCommon ref="rightChild"></RightCommon>
          </div>
        </div>
      </div>
    </div>
  </renderless-component-example>
</template>
<script>
import RightCommon from '../../common/components/RightCommon'
import qs from 'qs'
import Headers from '../../common/components/Header'
import LeftCommon from '../../common/components/LeftCommon'
import { deviceStatus, codeName, levCodeName } from './../rule/typeName'
import { getTimeToString } from './../rule/getTime'
import DetailsCommon from '../../common/components/DetailsCommon'
import WaterCharts from './components/WaterCharts'
import HydraulicFn from './components/HydraulicFn'
import Thermometer from './components/Thermometer'
import Switchs from './components/Switchs'
export default {
  data() {
    return {
      equipmentValue: '',
      deviceStatus: '',
      show2: true,
      areaId: '',
      lang: localStorage.getItem('Language'),
      currentPage: '',
      total: 0,
      deviceStatusList: [],
      equipmentTyleList: [],
      deviceSN: '',
      waterList: [],
    }
  },
  components: {
    LeftCommon,
    Headers,
    DetailsCommon,
    RightCommon,
    WaterCharts,
    HydraulicFn,
    Thermometer,
    Switchs,
  },
  mounted() {
    //用水的列表
    this.facilitiesList()
    //当前状态
    this.statusList()
    //设备类型列表
    this.equipmentListFn()
  },
  methods: {
    fatherClickFn(data) {
      this.areaId = data.id
      this.equipmentListFn()
      this.facilitiesList()
      //显示右侧数据
      this.$refs.rightChild.initWaterEcharts(this.lang, data.id)
    },
    //切换中英文
    switchLanguage(lang) {
      this.lang = lang
      //用水的列表
      this.facilitiesList()
      //当前状态
      this.statusList()
      //设备类型列表
      this.equipmentListFn()
      //显示右侧数据
      this.$refs.rightChild.initWaterEcharts(this.lang, this.areaId)
    },
    statusList() {
      let this_ = this
      var currentData = {
        lang: this_.lang,
      }
      this.$http
        .get('http://srv.shine-iot.com:8060/facilities/stus', { params: currentData })
        .then(function (response) {
          this_.deviceStatusList = response.data.data
        })
    },
    equipmentListFn() {
      let this_ = this
      var currentData = {
        lang: this.lang,
        areaId: this.areaId,
      }
      this.$http
        .get('http://srv.shine-iot.com:8060/facilities/tpcodes', { params: currentData })
        .then(function (response) {
          this_.equipmentTyleList = response.data.data
        })
    },
    getWaterData() {
      this.facilitiesList()
    },
    equipmentValueChange() {
      this.facilitiesList()
    },
    deviceStatusChange() {
      this.facilitiesList()
    },
    facilitiesList() {
      let this_ = this
      var currentData = qs.stringify({
        lang: this_.lang,
        areaId: this_.areaId,
        deviceType: this_.equipmentValue,
        runStatus: this_.deviceStatus,
        deviceSN: this.deviceSN,
      })
      this.$http
        .post('http://srv.shine-iot.com:8060/facilities/devs', currentData)
        .then(function (response) {
          console.log('查看用水数据')
          console.log(response)
          this_.waterList = response.data.data
        })
    },
  },
}
</script>
<style lang="stylus" scoped>
.centent {
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);

  .right {
    flex: 9;
    margin-left: 30px;
    width: 90%;
    padding: 10px;
    padding-left: 0px;

    .boxWrap {
      display: flex;
      height: 100%;
      width: 100%;

      .rightCentent {
        position: relative;
        width: 640px;
        margin-bottom: 30px;
        background: rgba(0, 6, 31, 1);
      }

      .MonitorData {
        flex: 6;
        position: relative;
        margin-right: 30px;
        margin-bottom: 30px;
        padding-left: 30px;
        padding-top: 30px;
        background: #00061f;
        border: 1px solid rgba(112, 212, 254, 1);

        .filterData {
          widows: 100%;
          display: flex;

          div {
            width: 220px;
            margin-right: 20px;

            .installNumbers {
              width: 210px;
              color: white;
              height: 40px;
              background: rgba(0, 13, 65, 1);
              border-radius: 4px;
            }
          }
        }

        .waterConten {
          margin-right: 30px;
          margin-top: 0px;

          .showWaterTanks {
            margin-right: 20px;
            margin-top: 20px;
            float: left;
            width: 220px;
            border: 1px solid rgba(112, 212, 254, 0.25);
            background: rgba(0, 13, 66, 1);
            border-radius: 4px;
            height: 320px;

            .watertitle {
              display: flex;
              margin-left: 10px;
              margin-right: 10px;
              margin-top: 5px;
              justify-content: space-between;

              span {
                height: 12px;
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 300;
                color: rgba(230, 230, 230, 1);
              }
            }

            .Graphics {
              display: flex;
              flex-direction: column;
              margin-left: 20px;

              div {
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 100;
                color: rgba(204, 204, 204, 1);
              }
            }
          }
        }

        .installInfo {
          height: 680px;
          margin-top: 20px;
          margin-right: 30px;

          .tableHeader {
            display: flex;
            height: 60px;
            text-align: center;
            background: rgba(0, 14, 71, 1);
            border-radius: 4px;
            align-items: center;

            span {
              flex: 1;
              height: 16px;
              font-size: 16px;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(204, 204, 204, 1);
            }
          }

          .tebleColumn {
            display: flex;
            height: 38px;
            cursor: pointer;
            align-items: flex-start;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            margin-top: 22px;
            text-align: center;

            div {
              flex: 2;
              max-width: 200px;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 300;
              white-space: nowrap;
              overflow: hidden;
              color: rgba(229, 229, 229, 1);
            }
          }

          .pagination2 {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>