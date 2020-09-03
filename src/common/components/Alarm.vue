<template>
  <div>
    <audio src="../../static/warn2.mp3" controls style="display:none;" id="vd"></audio>
    <div id="bg" v-if="isShowBg"></div>
    <div v-if="isShowCaveatInfo">
      <div class="caveatInfo">
        <div class="caveatInfoTile">
          <span>告警信息</span>
          <div style="display: flex;">
            <img src="../../static/img/mute.png" class="mute" @click="silencer">
            <div style="width:2px;height:20px;background:rgba(255,255,255,0.08);margin-left:20px;"></div>
            <img src="../../static/img/delete.png" @click="closeCatInfo" class="delete" />
          </div>
        </div>
        <div class="caveatList">
          <div class="caveatChild" v-for="item in caveatList">
            <div class="caveatItem">
              <div class="cavetContent">
                <div style="width: 71px;">
                  <img src="../../static/img/fire.png" />
                  <span>时间：</span>
                </div>
                <span>{{item.eventTimeLong}}</span>
              </div>
              <div class="cavetContent">
                <div style="width: 150px;">
                  类型：
                </div>
                <span>{{item.eventType}}</span>
              </div>
              <div class="cavetContent">
                <div style="width: 120px;">设备名称：</div>
                <span>{{item.deviceTypeCode}}</span>
              </div>
            </div>
            <div class="caveatItem" style="margin-top:30px">
              <div class="cavetContent">
                <div style="width: 71px;">区域：</div>
                <span>{{item.areaName}}</span>
              </div>
              <div class="cavetContent" style="width:500px">
                <div style="width: 150px;">地址：</div>
                <span>{{item.deviceAddr}}</span>
              </div>
            </div>
            <div class="caveatItem" style="margin-top:30px">
              <div class="cavetContent">
                <div style="width: 71px;">联系人：</div>
                <span>{{item.areaContact}}</span>
              </div>
              <div class="cavetContent">
                <div style="width: 150px;">联系电话：</div>
                <span>{{item.areaContactPhone}}</span>
              </div>
              <div class="cavetContent">
                <div style="width: 120px;">操作：</div>
                <span style="color:rgba(112,212,254,1);cursor: pointer;" @click="eventDetails(item.eventId)"><u>查看详情</u></span>
              </div>
            </div>
            <div style="margin-top:30px">
              <el-button type="success" size="mini" style="border-color: #001773;width:100px;height:40px;background:rgba(0,23,115,1);border-radius:4px;">复位</el-button>
              <el-button type="success" size="mini" style="border-color: #001773;width:100px;height:40px;background:rgba(0,23,115,1);border-radius:4px;margin-left:20px" @click="silencer">消音</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DetailsCommon ref="child"></DetailsCommon>
    <WarningCom ref="warningComChild"></WarningCom>
  </div>
</template>
<script>
import { getTimeToString } from '../../components/rule/getTime'
import WarningCom from '../../common/components/warning'
import DetailsCommon from '../../common/components/DetailsCommon'
export default {
  components: {
    DetailsCommon,
    WarningCom,
  },
  data() {
    return {
      isShowBg: false,
      caveatList: [],
      warningList: [],
      isShowCaveatInfo: false,
    }
  },
  methods: {
    estabConnectWithWS(wsUrl) {
      const ws = new WebSocket(wsUrl)
      ws.onopen = function (e) {
        console.log('连接上 ws 服务端了')
      }

      ws.onmessage = (msg) => {
        console.log(msg)
        let msgobj = JSON.parse(msg.data)
        var music = document.getElementById('vd') //获取ID
        if (msgobj.msgType == 1) {
          msgobj.deviceTypeCode = msgobj.dcTypeName
          msgobj.eventType = msgobj.eventName
          msgobj.eventTimeLong = getTimeToString(msgobj.eventTimeLong)
          this.caveatList.unshift(msgobj)
          this.showDiv()
          music.play()
        } else if (msgobj.msgType == 2) {
          msgobj.deviceTypeCode = msgobj.dcTypeName
          msgobj.eventType = msgobj.eventName
          msgobj.eventTimeLong = getTimeToString(msgobj.eventTimeLong)
          this.warningList.unshift(msgobj)
          if (this.warningList.length > 4) {
            this.warningList.length = 4
          }
          this.$refs.warningComChild.initwarnList(this.warningList)
        }
      }

      ws.onclose = function (e) {
        console.log('ws 连接关闭了')
      }
    },
    eventDetails(eventId) {
      this.$refs.child.drawersFn(eventId)
    },
    closeCatInfo() {
      this.isShowBg = false
      this.isShowCaveatInfo = false
      var music = document.getElementById('vd') //获取ID
      music.pause()
    },
    silencer() {
      var music = document.getElementById('vd') //获取ID
      music.pause()
    },
    showDiv() {
      this.isShowBg = true
      this.isShowCaveatInfo = true
    },
  },
  mounted() {
    const wsUrl = 'ws://srv.shine-iot.com:8060/websocket/' + this.$store.state.userId
    //websocket连接
    this.estabConnectWithWS(wsUrl)
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

.caveatInfo {
  position: fixed;
  left: 23%;
  top: 10%;
  width: 52.8%;
  height: 75.5%;
  float: left;
  z-index: 99;
  background: linear-gradient(-30deg, rgba(0, 8, 41, 1) 0%, rgba(0, 14, 71, 1) 98%);
  border: 1px solid rgba(229, 46, 46, 0.8);
  border-radius: 8px;

  .caveatInfoTile {
    display: flex;
    width: 92%;
    margin-left: 40px;
    height: 12.8%;
    align-items: center;
    border-bottom: 2px solid rgba(255, 255, 255, 0.08);
    justify-content: space-between;

    span {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(230, 46, 46, 1);
    }

    .delete {
      width: 20px;
      height: 20px;
      margin-left: 20px;
    }

    .mute {
      cursor: pointer;
      width: 18px;
      height: 20px;
    }
  }

  .caveatList {
    position: relative;
    margin-left: 40px;
    height: 86.93%;
    width: 92%;
    overflow: auto;

    .caveatChild {
      padding-bottom: 40px;
      border-bottom: 2px solid rgba(255, 255, 255, 0.08);

      .caveatItem {
        display: flex;
        justify-content: flex-start;
        margin-top: 20px;

        .cavetContent {
          display: flex;
          width: 300px;
          color: white;

          div {
            width: 71px;
            text-align: right;
          }

          img {
            width: 12px;
            height: 15px;
          }

          span {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(230, 230, 230, 1);
          }
        }
      }
    }
  }

  /* 滚动条样式 */
  .caveatList::-webkit-scrollbar {
    width: 11px;
    height: 50px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .caveatList::-webkit-scrollbar-thumb {
    /* 滚动条里面小方块 */
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px #1A2655;
    background: #1A2655;
  }

  .caveatList::-webkit-scrollbar-track {
    /* 滚动条里面轨道 */
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    width: 15px;
    height: 503px;
    background: rgba(0, 13, 66, 1);
    border-radius: 4px;
  }
}
</style>