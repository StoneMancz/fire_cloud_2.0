<template>
  <el-drawer custom-class="eventDetailss" :visible.sync="deviceDrawers" size="41%">
    <div class="titleBk">{{$t('Index.Details')}}</div>
    <div class="detailsBk">
      <div class="detail_titel">{{$t('Index.Basic')}}</div>
      <div class="detailsContent">
        <div class="detailsItem">
          <div>{{$t('Index.equipmentName')}}：<span>{{deviceInfo.dcTypeName}}</span></div>
          <div>{{$t('Index.DeviceID')}}：<span>{{deviceInfo.deviceSN}}</span></div>
        </div>
        <div class="detailsItem">
          <div>{{$t('Index.Status')}}：<span>{{deviceInfo.runStatusName}}</span></div>
          <div style="color:#365CF5;cursor:pointer;">
            <div class="footer_flex clearfix">
              <div>
                {{$t('Index.Device.QRCode')}}
                <div class="flex-footera" id="qrcode2" style=""></div>
              </div>
            </div>
          </div>
        </div>
        <div class="detailsItem">
          <div>{{$t('Index.Device.batteryPower')}}：<span>{{deviceInfo.batteryName}}</span></div>
          <div>{{$t('Index.Device.checkInTime')}}：<span>{{deviceInfo.entryTime}}</span></div>
        </div>
        <div class="detailsItem">
          <div>{{$t('Index.Device.moduleMethod')}}：<span>{{deviceInfo.protocolTypeName}}</span></div>
          <div>{{$t('Index.Device.module')}}：<span>{{deviceInfo.protocolTypeName}}</span></div>
        </div>
        <div class="detailsItem">
          <div>{{$t('Index.Device.Types')}}：<span>{{deviceInfo.dcTypeName}}</span></div>
          <div>{{$t('Index.Device.Manufacturer')}}：<span>{{deviceInfo.providerName}}</span></div>
        </div>
      </div>
    </div>
    <div class="detailsBk">
      <div class="detail_titel">{{$t('Index.Installation.Information')}}</div>
      <div class="detailsContent">
        <div class="detailsItem">
          <div>{{$t('Index.Installation.unit')}}：<span>{{installation.orgName}}</span></div>
          <div>{{$t('Index.Installation.area')}}：<span>{{installation.areaName}}</span></div>
        </div>
        <div class="detailsItem" style="width:100%">
          <div style="width:100%">{{$t('Index.Installation.Address')}}：<span>{{installation.deviceAddr}}</span></div>
        </div>
        <div class="detailsItem">
          <div>{{$t('Index.Installation.Contact')}}：<span>{{installation.areaContact}}</span></div>
          <div>{{$t('Index.Installation.phone')}}：<span>{{installation.areaContactPhone}}</span></div>
        </div>
        <div class="detailsItem">
          <div>{{$t('Index.Installation.place')}}：<span>{{installation.placeName}}</span></div>
          <div>{{$t('Index.Installation.time')}}：<span>{{installation.deviceFixDate}}</span></div>
        </div>
        <div class="detailsItem">
          <div>{{$t('Index.Installation.Partition')}}：<span>{{installation.areaNo}}</span></div>
          <div>{{$t('Index.Installation.number')}}：<span>{{installation.installNumber}}</span></div>
        </div>
      </div>
    </div>
    <div class="detailsBk" v-if="deviceInfo.deviceTypeCode==16 || deviceInfo.deviceTypeCode==17">
      <div class="detail_titel">{{$t('Index.otherInformation.otherInformation')}}</div>
      <div class="detailsContent">
        <div class="detailsItem">
          <div>{{$t('Index.otherInformation.currentValue')}}：<span>{{buildInfoModel.curVal}}{{buildInfoModel.rangUnitName}}</span></div>
        </div>
        <div class="detailsItem">
          <div>{{$t('Index.otherInformation.alarmUpperLimit')}}：<span>{{buildInfoModel.upAlarm}}{{buildInfoModel.rangUnitName}}</span></div>
          <div>{{$t('Index.otherInformation.alarmLowerLimit')}}：<span>{{buildInfoModel.lowAlarm}}{{buildInfoModel.rangUnitName}}</span></div>
        </div>
        <div class="detailsItem">
          <div>{{$t('Index.otherInformation.upperWarningLimit')}}：<span>{{buildInfoModel.upWarn}}{{buildInfoModel.rangUnitName}}</span></div>
          <div>{{$t('Index.otherInformation.lowerWarningLimit')}}：<span>{{buildInfoModel.lowWarn}}{{buildInfoModel.rangUnitName}}</span></div>
        </div>
      </div>
    </div>

    <div class="detailsBk" v-if="deviceInfo.deviceTypeCode==7">
      <div class="detail_titel">{{$t('Index.otherInformation.otherInformation')}}</div>
      <div class="detailsContent">
        <div class="detailsItem">
          <div>{{$t('Index.otherInformation.currentState')}}：<span>{{switchData.runStatusName}}</span></div>
          <div>{{$t('Index.otherInformation.defaultState')}}：<span>{{switchData.deftStatusName}}</span></div>
        </div>
      </div>
    </div>

    <div class="detailsBk" v-show="deviceInfo.deviceTypeCode==30">
      <div class="detail_titel">{{$t('Index.More')}}</div>
      <div class="detailsContent">
        <div class="detailsItem">
          <div @click="channelDetails(deviceInfo)" class="otherDetail">{{$t('Index.channelDetails')}}</div>
          <div>{{$t('Index.service')}}</div>
        </div>
      </div>
    </div>

    <div class="detailsBk" v-show="deviceInfo.deviceTypeCode==17 || deviceInfo.deviceTypeCode==16" style="margin-top:10px;">
      <div class="detail_titel" style="margin-top:10px">{{$t('Index.More')}}</div>
      <div class="detailsContent">
        <div class="detailsItem">
          <div class="otherDetail" @click="historyWaterfnss(deviceInfo)">{{$t('ElectricalMonitoring.history')}}</div>
        </div>
      </div>
    </div>
    <HistoryWater ref="historyWater"></HistoryWater>
    <Gangway ref="gangways"></Gangway>
  </el-drawer>
</template>

<script>
import { getTimeToString } from '../../components/rule/getTime'
import HistoryWater from '../../components/water/components/HistoryWater'
import QRCode from 'qrcodejs2'
import Gangway from '../../components/ElectricalMonitoring/components/Gangway'
export default {
  data() {
    return {
      deviceDrawers: false,
      deviceInfo: {},
      installation: {},
      buildInfoModel: {},
      switchData: {},
      lang: localStorage.getItem('Language'),
    }
  },
  components: {
    HistoryWater,
    Gangway
  },
  methods: {
    openEquipmentDetails(deviceId, lang) {
      this.lang = lang
      this.deviceDrawers = true
      let this_ = this
      this.$http
        .get('http://srv.shine-iot.com:8060/device/base/detail/' + deviceId + '?lang=' + localStorage.getItem('Language'))
        .then(function (response) {
          let deviceDetailsData = response.data.data
          let deviceInfo = {
            deviceTypeCode: deviceDetailsData.deviceTypeCode,
            dcTypeName: deviceDetailsData.dcTypeName,
            deviceSN: deviceDetailsData.deviceSN,
            runStatusName: deviceDetailsData.runStatusName,
            batteryName: deviceDetailsData.batteryName,
            entryTime: getTimeToString(deviceDetailsData.entryTime),
            protocolTypeName: deviceDetailsData.protocolTypeName,
            signalModuleSN: deviceDetailsData.signalModuleSN,
            dcTypeName: deviceDetailsData.dcTypeName,
            providerName: deviceDetailsData.providerName,
            deviceId: deviceDetailsData.deviceId,
            dcTypeName: deviceDetailsData.dcTypeName,
          }
          let installation = {
            orgName: deviceDetailsData.orgName,
            areaName: deviceDetailsData.areaName,
            deviceAddr:
              deviceDetailsData.areaLocCity +
              deviceDetailsData.areaLocDist +
              deviceDetailsData.areaName +
              deviceDetailsData.deviceAddr,
            areaContact: deviceDetailsData.areaContact,
            areaContactPhone: deviceDetailsData.areaContactPhone,
            placeName: deviceDetailsData.placeName,
            deviceFixDate: deviceDetailsData.deviceFixDate,
            areaNo: deviceDetailsData.areaNo,
            installNumber: deviceDetailsData.installNumber,
          }

          if (deviceInfo.deviceTypeCode == 16 || deviceInfo.deviceTypeCode == 17) {
            let buildInfoModel = {
              curVal: deviceDetailsData.buildInfoModel.curVal,
              lowAlarm: deviceDetailsData.buildInfoModel.lowAlarm,
              lowWarn: deviceDetailsData.buildInfoModel.lowWarn,
              rangUnitName: deviceDetailsData.buildInfoModel.rangUnitName,
              upAlarm: deviceDetailsData.buildInfoModel.upAlarm,
              upWarn: deviceDetailsData.buildInfoModel.upWarn,
            }
            this_.buildInfoModel = buildInfoModel
          } else if (deviceInfo.deviceTypeCode == 7) {
            let switchData = {
              deftStatusName: deviceDetailsData.deftStatusName,
              runStatusName: deviceDetailsData.runStatusName,
            }
            this_.switchData = switchData
          }
          this_.qrcode(response.data.data.deviceQRCode)
          this_.installation = installation
          this_.deviceInfo = deviceInfo
        })
    },
    historyWaterfnss(item) {
      this.drawers = false
      this.$refs.historyWater.histval(item.deviceId, '', '')
      this.$refs.historyWater.openHistory(item.dcTypeName)
    },
    channelDetails(item){
      this.$refs.gangways.initData(item.deviceId,localStorage.getItem('Language'),1)
    },
    qrcode(text) {
      let that = this
      document.getElementById('qrcode2').innerHTML = ''
      let qrcode = new QRCode('qrcode2', {
        width: 110,
        height: 110,
        text: text,
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.eventDetailss {
  background: linear-gradient(-30deg, rgba(0, 8, 41, 1) 0%, rgba(0, 14, 71, 1) 98%);

  .titleBk {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    margin-left: 40px;
    color: rgba(255, 255, 255, 1);
  }

  .detailsBk {
    display: flex;
    flex-direction: column;
    width: 720px;
    margin-left: 40px;
    margin-top: 20px;
    padding-left: 28px;
    background: rgba(255, 255, 255, 0.06);

    .detail_titel {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      margin-top: 15px;
      color: rgba(229, 229, 229, 1);
    }

    .detailsContent {
      display: flex;
      flex-direction: column;
      padding-bottom: 10px;

      .otherDetail {
        font-size: 16px;
        cursor: pointer;
        font-family: PingFang SC;
        font-weight: 400;
        text-decoration: underline;
        margin-right: 59px;
        color: rgba(54, 92, 245, 1);
      }

      .detailsItem {
        display: flex;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        margin-top: 20px;
        color: rgba(229, 229, 229, 1);
        margin-right: 89px;

        div {
          width: 300px;

          .eventLevel {
            margin-left: 19px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(230, 0, 0, 1);
          }

          .eventdeal {
            margin-left: 53px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            cursor: pointer;
            text-decoration: underline;
            color: rgba(54, 92, 245, 1);
          }
        }

        /* 弹出 */
        .footer_flex div {
          width: 100px;
          float: left;
          cursor: pointer;
          position: relative;
          z-index: 10;
        }

        .footer_flex div:hover {
          // background-color: #ff8400;
        }

        /* button */
        .footer_flex div:hover .flex-footera {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .footer_flex div .flex-footera {
          position: absolute;
          width: 180px;
          height: 180px;
          top: 40px;
          text-align: center;
          padding-top: 15px;
          display: none;
          background: url('../../static/img/erweima.png') 1px top no-repeat;
        }
      }
    }
  }
}
</style>