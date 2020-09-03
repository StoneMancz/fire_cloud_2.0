<template>
  <div>
    <el-drawer title="事件详情" custom-class="eventDetails" :visible.sync="drawers" :with-header="false" size="41%">
      <div v-if="showEvenDetails==1">
        <div class="titleBk">{{$t('Index.event.eventDetails')}}</div>
        <div class="detailsBk">
          <div class="detail_titel">{{$t('Index.event.EventInformation')}}</div>
          <div class="detailsContent">
            <div class="detailsItem">
              <div>{{$t('Index.event.name')}}：<span>{{eventDetails.eventName}}</span></div>
              <div>{{$t('Index.event.grade')}}：<span class="eventLevel">{{eventDetails.eventLevel}}</span></div>
            </div>
            <div class="detailsItem">
              <div>{{$t('Index.event.Time')}}：<span>{{eventDetails.eventTime}}</span></div>
            </div>
          </div>
        </div>
        <div class="detailsBk">
          <div class="detail_titel">{{$t('Index.Device.DeviceInfo')}}</div>
          <div class="detailsContent">
            <div class="detailsItem">
              <div>{{$t('Index.Device.Types')}}：<span>{{equipmentDetails.deviceName}}</span></div>
              <div>{{$t('Index.Device.Numbering')}}：<span>{{equipmentDetails.deviceSN}}</span></div>
            </div>
            <div class="detailsItem">
              <div>{{$t('Index.Device.status')}}：{{equipmentDetails.runStatusName}}</div>
              <div style="color:#365CF5;cursor:pointer;">
                <div class="footer_flex clearfix">
                  <div>
                    {{$t('Index.Device.QRCode')}}
                    <div class="flex-footera" id="qrcode1" style=""></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="detailsItem">
              <div>{{$t('Index.Device.batteryPower')}}：{{equipmentDetails.batteryName}}</div>
              <div>{{$t('Index.Device.checkInTime')}}：{{equipmentDetails.entryTime}}</div>
            </div>
            <div style="margin-top:20px;color:white">{{$t('Index.Device.module')}}：<span>{{equipmentDetails.signalModuleSN}}</span></div>
          </div>
        </div>
        <div class="detailsBk">
          <div class="detail_titel">{{$t('Index.Installation.Information')}}</div>
          <div class="detailsContent">
            <div class="detailsItem">
              <div>{{$t('Index.Installation.unit')}}：<span>{{installation.orgName}}</span></div>
              <div>{{$t('Index.Installation.area')}}：<span>{{installation.areaName}}</span></div>
            </div>
            <div style="margin-top:20px;color:white">{{$t('Index.Installation.Address')}}：<span>{{installation.deviceAddr}}</span></div>
            <div class="detailsItem">
              <div>{{$t('Index.Installation.Contact')}}：<span>{{installation.areaContact}}</span></div>
              <div>{{$t('Index.Installation.phone')}}：<span>{{installation.areaContactPhone}}</span></div>
            </div>
            <div class="detailsItem">
              <div>{{$t('Index.Installation.place')}}：<span>{{installation.placeName}}</span></div>
              <div>{{$t('Index.Installation.time')}}：<span>{{installation.deviceFixDate}}</span></div>
            </div>
            <div class="detailsItem">
              <div>{{$t('Index.Installation.Partition')}}：<span>{{installation.areaNO}}</span></div>
              <div>{{$t('Index.Installation.number')}}：<span>{{installation.installNumber}}</span></div>
            </div>
          </div>
        </div>
        <div class="detailsBk">
          <div class="detail_titel">{{$t('Index.More')}}</div>
          <div class="detailsContent">
            <div style="margin-top:30px">
              <span class="otherDetail" @click="SeeDeviceDetail(equipmentDetails.deviceId)">{{$t('Index.Details')}}</span>
              <span class="otherDetail" @click="eventHandling">{{$t('Index.dealWith')}}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="showEvenDetails==2">
        <div class="titleBk">{{$t('Index.event.eventDetails')}}</div>
        <div class="qualitativEvent">
          <div class="qualitativEventItem">
            <div>
              <span class="required">*</span>
              <span class="handlDesc">事件定性：</span>
              <el-select v-model="eventqualitativeValue" placeholder="事件定性" class="handlSelect">
                <el-option v-for="item in eventqualitative" :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </div>
            <div style="margin-left:30px">
              <span class="required">*</span>
              <span class="handlDesc">事件处理：</span>
              <el-select v-model="eventResult" placeholder="事件处理" class="handlSelect" @change="changeEvent">
                <el-option v-for="item in eventHandlingArr" :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </div>
          </div>
          <div class="qualitativEventItem" v-if="showBlockTime">
            <span class="required">*</span>
            <span class="handlDesc">时间:</span>
            <el-date-picker v-model="eventHandlingTime" @change="pickerChange" style="background: #000D42;margin-left:10px;width:220px" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="closeEvent">
          <span class="closeEvenDesc">是否关闭当前事件：</span>
          <el-radio v-model="radio" label="2">是</el-radio>
          <el-radio v-model="radio" label="1">否</el-radio>
        </div>
        <div class="handldescription">
          <div class="descHeader"></div>
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="textarea">
          </el-input>
        </div>
        <div style="margin-top:60px;margin-left: 40px;">
          <button class="submits" @click="sumbmitEventHanding">提交</button>
          <button class="cancel" @click="cancel">取消</button>
        </div>
      </div>
    </el-drawer>
    <DeviceDetailsCom ref="childEquipmentDetails"></DeviceDetailsCom>
  </div>
</template>

<script>
import qs from 'qs'
import QRCode from 'qrcodejs2'
import { deviceStatus, DeviceType, LevCodeName } from '../../components/rule/typeName'
import DeviceDetailsCom from '../../common/components/DeviceDetails'
export default {
  data() {
    return {
      areaID: '',
      showEvenDetails: 1,
      drawers: false,
      eventDetails: {},
      equipmentDetails: {},
      installation: {},
      facilities: {},
      contact: {},
      radio: '1',
      startTime: '',
      endTime: '',
      eventqualitativeValue: '',
      eventResult: '',
      eventqualitative: [],
      eventHandlingArr: [],
      textarea: '',
      showBlockTime: false,
      eventHandlingTime: [],
      deviceDetailsData: {},
    }
  },
  components: {
    DeviceDetailsCom,
  },
  methods: {
    drawersFn(eventId) {
      this.drawers = true
      this.showEvenDetails = 1
      let this_ = this
      this.$http
        .get('http://srv.shine-iot.com:8060/event/devo/' + eventId)
        .then(function (response) {
          let eventData = response.data.data
          let eventDetails = {
            eventId: eventData.eventId,
            eventName: eventData.eventTypeName,
            eventLevel: eventData.eventLevelName,
            eventTime: this_.formatDate(eventData.eventTime),
            eventDesc: eventData.eventDesc,
          }
          let equipmentDetails = {
            deviceId: eventData.deviceId,
            deviceName: eventData.dcTypeName,
            deviceSN: eventData.deviceSN,
            runStatusName: eventData.runStatusName,
            batteryName: eventData.batteryName,
            entryTime: this_.formatDate(eventData.entryTime),
            signalModuleSN: eventData.signalModuleSN,
          }

          let installation = {
            orgName: eventData.orgName,
            areaName: eventData.areaName,
            deviceAddr: eventData.deviceAddr,
            areaContact: eventData.areaContact,
            areaContactPhone: eventData.areaContactPhone,
            placeName: eventData.placeName,
            deviceFixDate: this_.formatDate(eventData.deviceFixDate),
            areaNO: eventData.areaNO,
            installNumber: eventData.installNumber,
          }

          let facilities = {
            deviceTypeCode: eventData.deviceTypeCode,
          }
          this_.facilities = facilities
          this_.installation = installation
          this_.equipmentDetails = equipmentDetails
          this_.eventDetails = eventDetails
          this_.qrcode(eventData.deviceQRCode)
        })
    },
    SeeDeviceDetail(deviceId) {
      this.drawers = false
      this.$refs.childEquipmentDetails.openEquipmentDetails(deviceId)
    },
    viewQrCode() {},
    formatDate(d) {
      var now = new Date(d)
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var date = now.getDate()
      var hour = now.getHours()
      var minute = now.getMinutes()
      var second = now.getSeconds()
      if (second < 10) {
        second = '0' + second
      }

      if (minute < 10) {
        minute = '0' + minute
      }

      if (hour < 10) {
        hour = '0' + hour
      }

      if (date < 10) {
        date = '0' + date
      }

      if (month < 10) {
        month = '0' + month
      }
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
    },
    changeEvent() {
      if (this.eventResult == 5) {
        this.showBlockTime = true
      } else {
        this.showBlockTime = false
      }
    },
    pickerChange() {
      this.startTime = this.eventHandlingTime[0].getTime()
      this.endTime = this.eventHandlingTime[1].getTime()
    },
    eventTerm() {
      let this_ = this
      //事件处理方式
      this.$http.get('http://srv.shine-iot.com:8060/event/method').then(function (response) {
        this_.eventHandlingArr = response.data.data
      })
      //事件定性
      this.$http.get('http://srv.shine-iot.com:8060/event/defined').then(function (response) {
        this_.eventqualitative = response.data.data
      })
    },
    eventHandle(
      deviceId,
      eventId,
      dealDefined,
      dealMethod,
      startShieldTime,
      endShieldTime,
      isClose,
      dealNote
    ) {
      let this_ = this
      var currentData = qs.stringify({
        deviceId: deviceId,
        eventId: eventId,
        dealDefined: dealDefined,
        dealMethod: dealMethod,
        startShieldTime: startShieldTime,
        endShieldTime: endShieldTime,
        isClose: isClose,
        dealNote: dealNote,
      })
      this.$http
        .post('http://srv.shine-iot.com:8060/event/handle', currentData)
        .then(function (response) {
          if (response.data) {
            this_.$message({
              message: '处理成功',
              type: 'success',
            })
            this_.showEvenDetails = 1
          }
        })
    },
    sumbmitEventHanding() {
      this.eventHandle(
        this.equipmentDetails.deviceId,
        this.eventDetails.eventId,
        this.eventqualitativeValue,
        this.eventResult,
        this.startTime,
        this.endTime,
        this.radio,
        this.textarea
      )
    },
    eventHandling() {
      this.showEvenDetails = 2
    },
    cancel() {
      this.showEvenDetails = 1
    },
    qrcode(text) {
      let that = this
      document.getElementById('qrcode1').innerHTML = ''
      let qrcode = new QRCode('qrcode1', {
        width: 110,
        height: 110,
        text: text,
      })
    },
  },
  mounted() {
    this.eventTerm()
  },
}
</script>

<style lang="stylus">
.eventDetails {
  background: linear-gradient(-30deg, rgba(0, 8, 41, 1) 0%, rgba(0, 14, 71, 1) 98%);

  .titleBk {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    margin-left: 40px;
    margin-top: 39px;
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

          /* 弹出 */
          .footer_flex div {
            width: 100px;
            float: left;
            text-align: center;
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

  .qualitativEvent {
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    margin-top: 60px;
    width: 720px;
    height: 160px;
    background: rgba(255, 255, 255, 0.06);

    .qualitativEventItem {
      display: flex;
      height: 40px;
      align-items: center;
      margin-top: 30px;
      margin-left: 30px;

      div {
        display: flex;
        align-items: center;

        .required {
          font-size: 18px;
          color: #E50000;
        }

        .handlDesc {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 300;
          color: white;
        }

        .handlSelect {
          width: 200px;
          height: 40px;
          margin-left: 20px;
          background: rgba(0, 13, 66, 1);
          border-radius: 4px;
        }
      }
    }
  }

  .closeEvent {
    width: 720px;
    height: 75px;
    background: rgba(255, 255, 255, 0.06);
    margin-left: 40px;
    margin-top: 30px;

    .closeEvenDesc {
      font-size: 16px;
      margin-left: 30px;
      font-family: PingFang SC;
      font-weight: 300;
      color: rgba(204, 204, 204, 1);
      line-height: 75px;
    }
  }

  .submits {
    width: 140px;
    height: 60px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(204, 204, 204, 1);
    background: rgba(0, 23, 115, 1);
    border-radius: 4px;
  }

  .cancel {
    margin-left: 40px;
    width: 140px;
    height: 60px;
    border: 1px solid rgba(153, 153, 153, 1);
    border-radius: 4px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    background-color: #000829;
    color: rgba(153, 153, 153, 1);
  }

  .handldescription {
    margin-top: 30px;
    margin-left: 40px;
    width: 720px;
    height: 280px;
    background: rgba(230, 230, 230, 1);
    border: 2px solid rgba(153, 153, 153, 1);
    border-radius: 4px;

    .descHeader {
      width: 100%;
      height: 58px;
      background: rgba(204, 204, 204, 1);
      border-radius: 4px 4px 0px 0px;
    }
  }
}
</style>