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
                <el-select v-model="equipmentValue" style @change="equipmentValueChange">
                  <el-option :label="$t('FireMonitoring.EquipmentName')" value></el-option>
                  <el-option v-for="item in equipmentTyleList" :key="item.type" :label="item.name" :value="item.type"></el-option>
                </el-select>
              </div>
              <div>
                <el-select v-model="deviceStatus" @change="deviceStatusChange">
                  <el-option :label="$t('FireMonitoring.State')" value></el-option>
                  <el-option v-for="item in deviceStatusList" :key="item.type" :label="item.name" :value="item.type"></el-option>
                </el-select>
              </div>
              <div>
                <input class="installNumbers" :placeholder="$t('FireMonitoring.Hint')" @change="getDevsData" v-model="installNumber">
              </div>
            </div>
            <div class="installInfo">
              <div class="tableHeader">
                <span>{{$t('FireMonitoring.InstallationNumber')}}</span>
                <span>{{$t('FireMonitoring.EquipmentName')}}</span>
                <span>{{$t('FireMonitoring.EquipmentNumber')}}</span>
                <span>{{$t('FireMonitoring.State')}}</span>
                <span>{{$t('FireMonitoring.Area')}}</span>
                <span>{{$t('FireMonitoring.Address')}}</span>
                <span>{{$t('FireMonitoring.Details')}}</span>
              </div>
              <div class="tebleColumn" v-for="(item,index) in installInfoList" :key="index">
                <div>{{item.installNumber}}</div>
                <div>{{item.dcShortName}}</div>
                <div>{{item.deviceSN}}</div>
                <div style="color:rgba(0,143,19,1);" v-if="item.runStatusName=='正常' || item.runStatusName=='Normal'">{{item.runStatusName}}</div>
                <div style="color:red;" v-else-if="item.runStatusName=='报警' || item.runStatusName=='Alarming'">{{item.runStatusName}}</div>
                <div v-else-if="item.runStatusName=='离线'" style="color:#41414B;">{{item.runStatusName}}</div>
                <div v-else-if="item.runStatusName=='低电量'" style="color:#F7D501;">{{item.runStatusName}}</div>
                <div v-else>{{item.runStatusName}}</div>
                <div>{{item.areaName}}</div>
                <div>{{item.deviceAddr}}</div>
                <div style="color:rgba(112,212,254,1);" @click="seeDeviceDetail(item.deviceId)">{{$t('FireMonitoring.Details')}}</div>
              </div>
              <el-pagination class="pagination2" :current-page.sync="currentPage" layout="prev, pager, next" :total="total" style="text-align: center;" @current-change="handleCurrentChange"></el-pagination>
            </div>
          </div>
          <div class="rightCentent" v-show="show2">
            <RightCommon ref="rightChild"></RightCommon>
          </div>
        </div>
      </div>
    </div>
    <DeviceDetailsCom ref="childEquipmentDetails"></DeviceDetailsCom>
  </renderless-component-example>
</template>
<script>
import RightCommon from '../../common/components/RightCommon'
import DeviceDetailsCom from '../../common/components/DeviceDetails'
import qs from 'qs'
import Headers from '../../common/components/Header'
import LeftCommon from '../../common/components/LeftCommon'
import { deviceStatus, codeName, levCodeName } from './../rule/typeName'
import { getTimeToString } from './../rule/getTime'
import DetailsCommon from '../../common/components/DetailsCommon'
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
      installInfoList: [],
      installNumberList: [],
      deviceStatusList: [],
      equipmentTyleList: [],
      installNumber: '',
    }
  },
  components: {
    LeftCommon,
    Headers,
    DetailsCommon,
    RightCommon,
    DeviceDetailsCom,
  },
  mounted() {
    //查询设备列表
    this.getDevsData()
    //查询设备类型
    this.deiceTypes()
    //查询设备的状态列表
    this.deiceStusList()
  },
  methods: {
    getDevsData() {
      let this_ = this
      var currentData = qs.stringify({
        areaId: this.areaId,
        deviceType: this.equipmentValue,
        runStatus: this.deviceStatus,
        deviceSN: this.installNumber,
        pageNo: this.currentPage,
        lang: this.lang,
      })
      this.$http
        .post('http://srv.shine-iot.com:8060/fdev/mnt/devs', currentData)
        .then(function (response) {
          this_.installInfoList = response.data.data.records
          this_.total = response.data.data.total
        })
    },
    seeDeviceDetail(deviceId) {
      this.$refs.childEquipmentDetails.openEquipmentDetails(deviceId)
    },
    fatherClickFn(data) {
      this.areaId = data.id
      this.getDevsData()
      //显示右侧数据
      this.$refs.rightChild.fireMonitorInitData(this.lang, data.id)
    },
    //切换中英文
    switchLanguage(lang) {
      this.lang = lang
      this.getDevsData()
      this.$refs.rightChild.fireMonitorInitData(lang, this.areaId)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getDevsData()
    },
    equipmentValueChange() {
      this.getDevsData()
    },
    deviceStatusChange() {
      this.getDevsData()
    },
    installNumberChange() {
      this.getDevsData()
    },
    //查询设备类型
    deiceTypes() {
      let this_ = this
      var currentData = { lang: this_.lang }
      this.$http
        .get('http://srv.shine-iot.com:8060/fdev/mnt/types', { params: currentData })
        .then(function (response) {
          this_.equipmentTyleList = response.data.data
        })
    },
    //查询设备的状态列表
    deiceStusList() {
      let this_ = this
      var currentData = { lang: this_.lang }
      this.$http
        .get('http://srv.shine-iot.com:8060/fdev/mnt/stus', { params: currentData })
        .then(function (response) {
          this_.deviceStatusList = response.data.data
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