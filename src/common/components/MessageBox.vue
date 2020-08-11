<template>
  <renderless-component-example>
    <div id="bg" v-if="isShowBg"></div>
    <div class="messageBox" v-if="isShowBg">
      <div class="messageTitle">
        <span>消息盒子</span>
        <img src="../../../src/static/img/delete.png" @click="closeMessage">
      </div>
      <div class="swarpMessage">
        <div :class="index==messageTabIndex?'activeMessage':'messageList'" v-for="(item,index) in messageLists" :key="index" @click="messageDesc(index)">
          <span>{{item.eventDesc}}</span>
          <span>{{item.eventTime}}</span>
        </div>
      </div>
    </div>
  </renderless-component-example>
</template>

<script>
import qs from 'qs'
import { getTimeToString } from '../../components/rule/getTime'
export default {
  data() {
    return {
      isShowBg: false,
      messageLists: [],
      lang: localStorage.getItem('Language'),
      messageTabIndex: '',
    }
  },
  mounted() {
    this.getMessage(this.lang)
  },
  methods: {
    getMessage(lang) {
      let this_ = this
      var currentData = qs.stringify({
        lang: lang,
      })
      this.$http
        .post('http://srv.shine-iot.com:8060/event/evts/day', currentData)
        .then(function (response) {
          this_.messageLists = response.data.data.map((item) => {
            item.eventTime = getTimeToString(item.eventTime)
            return item
          })
        })
    },
    messageDesc(index) {
      this.messageTabIndex = index
    },
    closeMessage() {
      this.isShowBg = false
    },
    openMessage() {
      this.isShowBg = true
    },
  },
}
</script>

<style lang="stylus" scoped>
#bg {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: #000000;
  z-index: 81;
  -moz-opacity: 0.4;
  opacity: 0.4;
}

.messageBox {
  position: fixed;
  width: 1000px;
  height: 700px;
  left: 0;
  right: 0;
  top: 18%;
  margin: auto;
  float: left;
  z-index: 100;
  background: linear-gradient(-30deg, rgba(0, 8, 41, 1) 0%, rgba(0, 14, 71, 1) 98%);
  border-radius: 8px;

  .messageTitle {
    display: flex;
    width: 920px;
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

  .swarpMessage {
    height: 606px;
    overflow: auto;

    .messageList {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-left: 40px;
      margin-top: 29px;
      width: 922px;
      height: 71px;
      border-bottom: 2px solid rgba(255, 255, 255, 0.08);

      span {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }

      span:last-child {
        margin-top: 19px;
      }
    }

    .activeMessage {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 985px;
      height: 100px;
      background: rgba(255, 255, 255, 0.06);

      span {
        margin-top: 29px;
        margin-left: 39px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(230, 230, 230, 1);
      }

      span:last-child {
        margin-left: 39px;
        margin-top: 19px;
      }
    }
  }

  /* 滚动条样式 */
  .swarpMessage::-webkit-scrollbar {
    width: 15px;
    height: 588px;
    background: rgba(0, 13, 66, 1);
    border-radius: 4px;
  }

  .swarpMessage::-webkit-scrollbar-thumb {
    /* 滚动条里面小方块 */
    border-radius: 4px;
    width: 11px;
    height: 50px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .swarpMessage::-webkit-scrollbar-track {
    /* 滚动条里面轨道 */
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 13, 66, 1);
    border-radius: 4px;
  }
}
</style>