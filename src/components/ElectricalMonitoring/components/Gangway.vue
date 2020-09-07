<template>
  <renderless-component-example>
    <div id="bg" v-if="isShowBg"></div>
    <div class="LoopData" v-if="isShowBg">
      <div class="messageTitle">
        <span>{{$t('ElectricalMonitoring.gangway.Details')}}</span>
        <img src="../../../../src/static/img/delete.png" @click="closeDetail">
      </div>
      <div class="loopList">
        <div class="tableHeader">
          <span>{{$t('ElectricalMonitoring.gangway.addressCode')}}</span>
          <span>{{$t('ElectricalMonitoring.gangway.gangwayTypes')}}</span>
          <span>{{$t('ElectricalMonitoring.gangway.gangwayNumber')}}</span>
          <span>{{$t('ElectricalMonitoring.gangway.status')}}</span>
          <span>{{$t('ElectricalMonitoring.gangway.value')}}</span>
          <span>{{$t('ElectricalMonitoring.gangway.upperLimit')}}</span>
          <span>{{$t('ElectricalMonitoring.gangway.lowerLimit')}}</span>
        </div>
        <div class="tebleColumn" v-for="(item,index) in gangWayList" :key="index">
          <div>{{item.addrNum}}</div>
          <div>{{item.typeName}}</div>
          <div>{{item.loopNum}}</div>
          <div>{{item.statusName}}</div>
          <div>{{item.checkVal}}</div>
          <div>{{item.upperVal}}</div>
          <div>{{item.lowerVal}}</div>
        </div>
      </div>
      <el-pagination class="pagination2" :current-page.sync="pageNo" 
      layout="prev, pager, next" :total="totalLoop" style="text-align: center;bottom:-15px;" @current-change="gangWayChange"></el-pagination>
    </div>
  </renderless-component-example>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      isShowBg: false,
      totalLoop: 0,
      gangWayList: [],
      deviceId: '',
      lang:localStorage.getItem('Language'),
      pageNo: 1,
    }
  },
  methods: {
    initData(deviceId, lang, pageNo) {
      this.isShowBg = true
      this.deviceId = deviceId
      this.lang = lang
      let this_ = this
      var currentData = qs.stringify({
        deviceId: deviceId,
        lang: lang,
        pageNo: pageNo,
      })
      this.$http
        .post('http://srv.shine-iot.com:8060/elect/dev/channels/pg', currentData)
        .then(function (response) {
          this_.pageNo = response.data.data.current
          this_.totalLoop = response.data.data.total
          this_.gangWayList = response.data.data.records
        })
    },
    gangWayChange() {
      this.initData(this.deviceId, this.lang, this.pageNo)
    },
    closeDetail() {
      this.isShowBg = false
    },
  },
  mounted() {},
}
</script>

<style lang="stylus" scoped>
#bg {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: #000000;
  z-index: 81;
  -moz-opacity: 0.4;
  opacity: 0.4;
}

.LoopData {
  position: fixed;
  width: 920px;
  height: 740px;
  left: 0;
  right: 0;
  top: 12%;
  margin: auto;
  float: left;
  z-index: 100;
  background: #00061F;
  color: white;

  .messageTitle {
    display: flex;
    width: 840px;
    height: 92px;
    justify-content: space-between;
    align-items: center;
    margin-left: 40px;
    margin-right: 40px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.12);

    span {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(204, 204, 204, 1);
    }

    img {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }
}

.loopList {
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
</style>