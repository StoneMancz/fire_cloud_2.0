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
                <el-select v-model="deviceStatus" placeholder="设备状态" style @change="deviceStatusChange">
                  <el-option :label="$t('Newsletter.status')" value></el-option>
                  <el-option v-for="item in deviceStatusList" :key="item.type" :label="item.name" :value="item.type"></el-option>
                </el-select>
              </div>
              <div>
                <el-select v-model="installNumber" placeholder="MAC/IMEI" style @change="installNumberChange">
                  <el-option :label="$t('Newsletter.All')" value></el-option>
                  <el-option v-for="item in installNumberList" :key="item.type" :label="item.name" :value="item.type"></el-option>
                </el-select>
              </div>
            </div>
            <div class="installInfo">
              <div class="tableHeader">
                <span>{{$t('Newsletter.deviceID')}}</span>
                <span>MAC/IMEI</span>
                <span>{{$t('Newsletter.status')}}</span>
                <span>{{$t('Newsletter.area')}}</span>
                <span>{{$t('Newsletter.address')}}</span>
                <span>{{$t('Newsletter.Details')}}</span>
              </div>
              <div class="tebleColumn" v-for="(item,index) in installInfoList" :key="index">
                <div>{{item.deviceSN}}</div>
                <div>{{item.macImei}}</div>
                <div>{{item.runStatusName}}</div>
                <div>{{item.areaName}}</div>
                <div>{{item.deviceAddr}}</div>
                <div @click="nodeDetails(item.deviceId)">{{$t('Newsletter.Details')}}</div>
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
    this.getDevsData()
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
        lang: this.lang,
      })
      this.$http
        .post('http://srv.shine-iot.com:8060/gwdtu/devs', currentData)
        .then(function (response) {
          this_.installInfoList = response.data.data
        })
    },
    nodeDetails(deviceId) {
      this.$refs.childEquipmentDetails.openEquipmentDetails(deviceId)
    },
    fatherClickFn(data) {
      this.areaId = data.id
      this.getDevsData()
      //显示右侧数据
      this.$refs.rightChild.initNewsletter(this.lang, data.id)
    },
    //切换中英文
    switchLanguage(lang) {
      this.lang = lang
      this.getDevsData()
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
      this.$http.get('http://srv.shine-iot.com:8060/fdev/mnt/types').then(function (response) {
        this_.equipmentTyleList = response.data.data
      })
    },
    //查询设备的状态列表
    deiceStusList() {
      let this_ = this
      this.$http.get('http://srv.shine-iot.com:8060/gwdtu/stus').then(function (response) {
        console.log('设备状态列表')
        console.log(response)
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