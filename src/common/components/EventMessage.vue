<template>
  <div>
    <div class="select" style="margin-top:10px">
      <div style="width:120px">
        <el-select v-model="eventLevelValue" placeholder="事件等级" @change="eventTypeChange" style="width:120px">
          <el-option :label="$t('Index.all')" value></el-option>
          <el-option v-for="item in eventLevelValueData" :key="item.type" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </div>
      <div style="margin-left:20px;width:120px">
        <el-select v-model="eventDevcieValue3" placeholder="设备类型" style @change="equipmentTypeChange3">
          <el-option :label="$t('Index.all')" value></el-option>
          <el-option v-for="item in equipmentTypeData" :key="item.type" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </div>
      <div style="width:120px;margin-left:20px;">
        <el-date-picker v-model="eventTimes" @change="pickerEventChange" style="width:150px;float:left;background: #000D42;" type="datetimerange"></el-date-picker>
      </div>
    </div>
    <div class="eventList">
      <div class="tableHeader">
        <span>{{$t('Index.eventName')}}</span>
        <span style=" flex: 2;">{{$t('Index.time')}}</span>
        <span>{{$t('Index.equipmentName')}}</span>
        <span style=" flex: 2;">{{$t('Index.address')}}</span>
      </div>
      <div class="tebleColumn" v-for="(item,index) in eventAreaEvtsList" @click="eventDetails(item.eventId)" :key="index">
        <div>{{item.eventName}}</div>
        <div style=" flex: 2;">{{item.eventTime}}</div>
        <div>{{item.deviceName}}</div>
        <el-tooltip :content="item.deviceDetailedAddr" placement="bottom" effect="light">
          <div style=" flex: 2;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;cursor: pointer;">{{item.deviceAddr}}</div>
        </el-tooltip>
      </div>
      <el-pagination class="pagination2" :current-page.sync="currentPage" layout="prev, pager, next" :total="total" style="text-align: center;" @current-change="handleCurrentChange"></el-pagination>
    </div>
    <DetailsCommon ref="child"></DetailsCommon>
  </div>
</template>

<script>
import qs from 'qs'
import { deviceStatus, DeviceType, LevCodeName } from '../../components/rule/typeName'
import DetailsCommon from '../../../src/common/components/DetailsCommon'
import { getTimeToString } from '../../components/rule/getTime'
export default {
  components: {
    DetailsCommon,
  },
  data() {
    return {
      eventLevelValue: '',
      currentPage: 1,
      areaId: '',
      lang: localStorage.getItem('Language'),
      total: 0, // 事件列表length
      equipmentTypeData: [],
      eventLevelValueData: [],
      eventDevcieValue3: '',
      eventTimes: '',
      eventAreaEvtsList: [], //事件列表
      eventAreaEvtsUrl: '',
    }
  },
  mounted() {},
  methods: {
    eventTypeChange() {
      if (!this.eventTimes) {
        this.eventAreaEvts(
          this.eventAreaEvtsUrl,
          this.lang,
          this.areaID,
          this.eventDevcieValue3,
          this.eventLevelValue,
          '',
          '',
          this.currentPage
        )
      } else {
        this.eventAreaEvts(
          this.eventAreaEvtsUrl,
          this.lang,
          this.areaID,
          this.eventDevcieValue3,
          this.eventLevelValue,
          this.eventTimes[0].getTime(),
          this.eventTimes[1].getTime(),
          this.currentPage
        )
      }
    },
    equipmentType(url, lang) {
      let this_ = this

      var currentData = { areaId: this_.areaId, lang: lang }
      this.$http.get(url, { params: currentData }).then(function (response) {
        this_.equipmentTypeData = response.data.data
      })
    },
    eventLevelFn(lang) {
      let this_ = this
      this.$http
        .get('http://srv.shine-iot.com:8060/event/level?lang=' + lang)
        .then(function (response) {
          this_.eventLevelValueData = response.data.data
        })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (!this.eventTimes) {
        this.eventAreaEvts(
          this.eventAreaEvtsUrl,
          this.lang,
          this.areaID,
          this.eventDevcieValue3,
          this.eventLevelValue,
          '',
          '',
          this.currentPage
        )
      } else {
        this.eventAreaEvts(
          this.eventAreaEvtsUrl,
          this.lang,
          this.areaID,
          this.eventDevcieValue3,
          this.eventLevelValue,
          this.eventTimes[0].getTime(),
          this.eventTimes[1].getTime(),
          this.currentPage
        )
      }
    },
    eventDetails(eventId) {
      this.$refs.child.drawersFn(eventId)
    },
    pickerEventChange() {
      if (!this.eventTimes) {
        this.eventAreaEvts(
          this.eventAreaEvtsUrl,
          this.lang,
          this.areaID,
          this.eventDevcieValue3,
          this.eventLevelValue,
          '',
          '',
          this.currentPage
        )
      } else {
        this.eventAreaEvts(
          this.eventAreaEvtsUrl,
          this.lang,
          this.areaID,
          this.eventDevcieValue3,
          this.eventLevelValue,
          this.eventTimes[0].getTime(),
          this.eventTimes[1].getTime(),
          this.currentPage
        )
      }
    },
    equipmentTypeChange3() {
      if (!this.eventTimes) {
        this.eventAreaEvts(
          this.eventAreaEvtsUrl,
          this.lang,
          this.areaID,
          this.eventDevcieValue3,
          this.eventLevelValue,
          '',
          '',
          this.currentPage
        )
      } else {
        this.eventAreaEvts(
          this.eventAreaEvtsUrl,
          this.lang,
          this.areaID,
          this.eventDevcieValue3,
          this.eventLevelValue,
          this.eventTimes[0].getTime(),
          this.eventTimes[1].getTime(),
          this.currentPage
        )
      }
    },
    eventAreaEvts(url, lang, areaId, deviceType, eventLevel, startTime, endTime, pageNo) {
      let this_ = this
      this.eventAreaEvtsUrl = url
      this.lang = lang
      this.eventDevcieValue3=deviceType
      var currentData = qs.stringify({
        lang: lang,
        areaId: areaId,
        deviceType: deviceType,
        eventLevel: eventLevel,
        startTime: startTime,
        endTime: endTime,
        pageNo: pageNo,
      })
      this.$http.post(url, currentData).then(function (response) {
        let eventList = response.data.data.records
        let eventListNew = eventList.map((item) => {
          let obj = {
            eventId: item.eventId,
            eventName: item.eventTypeName,
            eventTime: getTimeToString(item.eventTimeLong),
            deviceName: item.dcTypeName,
            deviceAddr: item.deviceAddr,
            deviceDetailedAddr:
              item.areaLocCity + item.areaLocDist + item.areaName + item.deviceAddr,
          }
          return obj
        })

        this_.total = response.data.data.total
        this_.eventAreaEvtsList = eventListNew
      })
    },
  },
}
</script>

<style lang="stylus">
.select {
  width: 100%;
  margin-left: 30px;
  display: flex;
}

.eventList {
  height: 561px;
  margin-left: 30px;
  margin-top: 20px;
  margin-right: 30px;

  .tableHeader {
    display: flex;
    height: 54px;
    text-align: center;
    background: rgba(0, 13, 66, 0.4);
    border-radius: 4px;
    align-items: center;
    padding-left: 21px;

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
    height: 33px;
    cursor: pointer;
    align-items: flex-start;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-left: 25px;
    margin-top: 21px;
    text-align: center;

    div {
      flex: 1;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: rgba(229, 229, 229, 1);
    }
  }
}

.pagination2 {
  position: absolute;
  bottom: 1%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>