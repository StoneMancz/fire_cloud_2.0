<template>
  <div>
    <el-drawer title="事件详情" custom-class="eventDetails" :visible.sync="drawers" :with-header="false" size="41%">
      <div v-if="showEvenDetails==1">
        <div class="titleBk">事件详情</div>
        <div class="detailsBk">
          <div class="detail_titel">事件信息</div>
          <div class="detailsContent">
            <div class="detailsItem">
              <div>事件名称：<span>{{eventDetails.eventName}}</span></div>
              <div>事件等级：<span class="eventLevel">{{eventDetails.eventLevel}}</span></div>
            </div>
            <div class="detailsItem">
              <div>发生时间：<span>{{eventDetails.eventTime}}</span></div>
              <div>操作：<span class="eventdeal" @click="eventHandling">事件处理</span></div>
            </div>
            <div style="margin-top:20px">描述：<span>{{eventDetails.eventDesc}}</span></div>
          </div>
        </div>
        <div class="detailsBk">
          <div class="detail_titel">设备信息</div>
          <div class="detailsContent">
            <div class="detailsItem">
              <div>设备名称：<span>{{equipmentDetails.deviceName}}</span></div>
              <div>设备编号：<span>{{equipmentDetails.deviceSN}}</span></div>
            </div>
            <div class="detailsItem">
              <div>所属区域：<span>{{equipmentDetails.arae}}</span></div>
              <div>操作：<span class="eventdeal" @click="deviceDetails">设备详情</span></div>
            </div>
            <div style="margin-top:20px">详细地址：<span>{{equipmentDetails.deviceAddr}}</span></div>
          </div>
        </div>
        <div class="detailsBk">
          <div class="detail_titel">安装信息</div>
          <div class="detailsContent">
            <div class="detailsItem">
              <div>单位：<span>{{contact.areaContact}}</span></div>
              <div>区域：<span>{{contact.areaContactPhone}}</span></div>
            </div>
          </div>
        </div>
        <div class="detailsBk">
          <div class="detail_titel">更多</div>
          <div class="detailsContent">
            <div style="margin-top:30px">
              <span class="otherDetail">设备详情</span>
              <span class="otherDetail">事件详情</span>
              <span class="otherDetail">历史记录</span>
              <span class="otherDetail">设备联动</span>
              <span class="otherDetail">维修操作</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="showEvenDetails==2">
        <div class="titleBk">事件详情</div>
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

      <div v-else-if="showEvenDetails==3">
        <div class="titleBk">设备详情</div>
        <div class="detailsBk">
          <div class="detail_titel">基本信息</div>
          <div class="detailsContent">
            <div class="detailsItem">
              <div>设备名称：<span>{{deviceDetailsData.deviceTypeCode}}</span></div>
              <div>运行状态：<span class="eventLevel">{{deviceDetailsData.runStatus}}</span></div>
            </div>
            <div class="detailsItem">
              <div>设备编号：<span>{{deviceDetailsData.deviceSN}}</span></div>
              <div>电池电量：<span>{{deviceDetailsData.batteryLevel}}</span></div>
            </div>
            <div class="detailsItem">
              <div>设备类型：<span>{{deviceDetailsData.deviceTypeCode}}</span></div>
            </div>
          </div>
        </div>
        <div class="detailsBk">
          <div class="detail_titel">安装信息</div>
          <div class="detailsContent">
            <div class="detailsItem">
              <div>所属区域：<span>{{deviceDetailsData.areaName}}</span></div>
              <div>安装编号：<span>{{deviceDetailsData.installNumber}}</span></div>
            </div>
            <div class="detailsItem">
              <div>详细地址：<span>{{deviceDetailsData.deviceAddr}}</span></div>
            </div>
            <div class="detailsItem">
              <div>联系人<span>{{deviceDetailsData.areaContact}}</span></div>
              <div>联系电话：<span>{{deviceDetailsData.areaContactPhone}}</span></div>
            </div>
          </div>
        </div>
        <div class="detailsBk">
          <div class="detail_titel">其他信息</div>
          <div class="detailsContent"></div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import qs from 'qs'
import { deviceStatus, DeviceType, LevCodeName } from '../../components/rule/typeName'
export default {
  data() {
    return {
      areaID: '',
      showEvenDetails: 1,
      drawers: false,
      eventDetails: {},
      equipmentDetails: {},
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
            eventName: deviceStatus(eventData.eventType),
            eventLevel: LevCodeName(eventData.eventLevel),
            eventTime: this_.formatDate(eventData.eventTime),
            eventDesc: eventData.eventDesc,
          }
          let equipmentDetails = {
            deviceId: eventData.deviceId,
            deviceName: DeviceType(eventData.deviceTypeCode),
            deviceSN: eventData.deviceSN,
            arae: eventData.areaName,
            deviceAddr: eventData.deviceAddr,
          }

          let contact = {
            areaContact: eventData.areaContact,
            areaContactPhone: eventData.areaContactPhone,
          }
          this_.contact = contact
          this_.equipmentDetails = equipmentDetails
          this_.eventDetails = eventDetails
        })
    },
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
    deviceDetails() {
      let this_ = this
      this.$http
        .get('http://srv.shine-iot.com:8060/device/base/detail/' + this.equipmentDetails.deviceId)
        .then(function (response) {
          this_.deviceDetailsData = response.data.data
          this_.deviceDetailsData.deviceTypeCode = DeviceType(
            this_.deviceDetailsData.deviceTypeCode
          )
          this_.deviceDetailsData.runStatus = deviceStatus(this_.deviceDetailsData.runStatus)
        })
      this.showEvenDetails = 3
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
    margin-top: 30px;
    padding-left: 28px;
    background: rgba(255, 255, 255, 0.06);

    .detail_titel {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      margin-top: 29px;
      color: rgba(229, 229, 229, 1);
    }

    .detailsContent {
      display: flex;
      flex-direction: column;
      padding-bottom: 30px;

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