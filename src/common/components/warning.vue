<template>
  <div>
    <div class="warning">
      <div class="warninConten" v-for="(item,index) in warningList">
        <div class="warnTitle">
          <span>事件提醒</span>
          <img src="../../static/img/delete.png" @click="warnClick(index)">
        </div>
        <div class="warnData">
          <span>
            事件：{{item.eventType}}
          </span>
          <span>
            时间：{{item.eventTimeLong}}
          </span>
        </div>
        <div class="warnData">
          <span>
            区域：{{item.areaName}}
          </span>
          <span>
            设备：{{item.deviceTypeCode}}
          </span>
        </div>
        <div class="warnData">
          <span style="width:100%">
            地址：{{item.deviceAddr}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      warningList: [],
    }
  },
  methods: {
    initwarnList(item) {
      this.warningList = item
    },
    warnClick(index) {
      this.warningList.splice(index, 1)
    },
  },
}
</script>
<style lang="stylus">
.warning {
  position: fixed;
  z-index: 2014;
  right: 40px;
  bottom: 30px;

  .warninConten {
    width: 393px;
    height: 193px;
    margin-bottom: 10px;
    background: linear-gradient(-30deg, rgba(0, 8, 41, 1) 0%, rgba(0, 14, 71, 1) 98%);
    box-shadow: 0px 0px 45px 15px rgba(0, 6, 31, 0.3);
    border-radius: 15px;

    .warnData {
      display: flex;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      margin-left: 19px;
      margin-right: 20px;
      padding-top: 19px;
      color: rgba(204, 204, 204, 1);
    }
  }

  .warnData span:first-child {
    width: 130px;
  }

  .warnData span:nth-child(2) {
    margin-left: 40px;
  }

  .warnTitle {
    height: 56px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    margin-left: 19px;
    margin-right: 20px;
    padding-top: 19px;
    display: flex;
    justify-content: space-between;

    img {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    span {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(230, 230, 230, 1);
    }
  }
}
</style>