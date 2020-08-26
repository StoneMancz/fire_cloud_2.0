
<template>
  <renderless-component-example>
    <Headers></Headers>
    <div class="centent">
      <LeftCommon></LeftCommon>
      <div class="right">
        <div class="boxWrap">
          <div class="ElectricaData">
            <div class="electricTable" v-for="(item,index) in recordsData" :key="index">
              <div class="electricTile">
                <div class="deviceName">
                  <div>
                    <span>设备编码：{{item.deviceSN}}</span>
                  </div>
                  <div style="width:133px">
                    <span>设备名称：{{item.dcTypeName}}</span>
                  </div>
                </div>
                <div class="deviceStatus">
                  <div>
                    <span>设备状态：{{item.runStatusName}}</span>
                  </div>
                  <div style="width:133px"><span>设备区域：{{item.areaName}}</span></div>
                </div>
                <div class="deviceStatus">
                  <div>
                    <span>地址：{{item.deviceAddr}} </span>
                  </div>
                  <div class="button">复位</div>
                </div>
              </div>
              <div class="tableData">
                <div class="tableHeader">
                  <span>回路</span>
                  <span>设备名称</span>
                  <span>当前值</span>
                  <span>状态</span>
                  <span>操作</span>
                </div>
                <div class="tebleColumnSwrap">
                  <div class="tebleColumn" v-for="(item1,index1) in item.electList" :key="index1">
                    <div>{{item1.addrNum}}</div>
                    <div>{{item1.typeName}}</div>
                    <div>{{item1.checkVal}}{{item1.unitName}}</div>
                    <div>{{item1.statusName}}</div>
                    <div @click="openHistory(item1.electId,item1.typeName)">历史记录</div>
                  </div>
                </div>
              </div>
            </div>
            <el-pagination class="pagination2" :current-page.sync="currentPage" layout="prev, pager, next" :total="total" style="text-align: center;"></el-pagination>
          </div>
          <div class="rightCentent" v-show="show2">
            <RightCommon ref="rightChild"></RightCommon>
          </div>
        </div>
      </div>
    </div>
    <HistoryRecord ref="history"></HistoryRecord>
  </renderless-component-example>
</template>
<script>
import qs from 'qs'
import Headers from '../../common/components/Header'
import LeftCommon from '../../common/components/LeftCommon'
import RightCommon from '../../common/components/RightCommon'
import HistoryRecord from './components/HistoryRecord'
export default {
  data() {
    return {
      show2: true,
      pageNo: 1,
      areaId: '',
      total: 0, // 事件列表length
      deviceSN: '',
      loopStatus: '',
      lang: 'zh-CN',
      recordsData: [],
    }
  },
  components: {
    Headers,
    RightCommon,
    LeftCommon,
    HistoryRecord,
  },
  mounted() {
    this.initElecticaData(this.pageNo, this.areaId, this.deviceSN, this.loopStatus, this.lang)
  },
  methods: {
    initElecticaData(pageNo, areaId, deviceSN, loopStatus, lang) {
      let this_ = this
      var currentData = qs.stringify({
        pageNo: pageNo,
        areaId: areaId,
        deviceSN: deviceSN,
        loopStatus: loopStatus,
        lang: lang,
      })
      this.$http
        .post('http://srv.shine-iot.com:8060/elect/devs', currentData)
        .then(function (response) {
          this_.recordsData = response.data.data.records
          this_.total = response.data.data.total
          this_.pageNo = response.data.data.current
        })
    },
    fatherClickFn(data) {
      this.areaId = data.id
      //显示右侧数据
      this.$refs.rightChild.initElectEchar(this.lang, data.id)
      this.initElecticaData(this.pageNo, this.areaId, this.deviceSN, this.loopStatus, this.lang)
    },
    openHistory(electId, typeName) {
      this.$refs.history.histval(electId, '', '')
      this.$refs.history.openHistory(typeName)
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

      .ElectricaData {
        flex: 6;
        position: relative;
        margin-right: 30px;
        margin-bottom: 30px;
        padding-left: 42px;
        background: #00061f;
        border: 1px solid rgba(112, 212, 254, 1);

        .electricTable {
          float: left;
          width: 460px;
          height: 360px;
          margin-right: 20px;
          margin-top: 10px;
          background: rgba(0, 13, 66, 0.25);
          border: 1px solid rgba(112, 212, 254, 0.25);
          border-radius: 4px;

          .electricTile {
            width: 100%;
            display: flex;
            flex-direction: column;
            padding-left: 19px;
            padding-right: 20px;
            padding-top: 20px;

            .deviceName {
              display: flex;
              width: 100%;
              justify-content: space-between;

              div {
                span {
                  font-size: 14px;
                  font-family: PingFang SC;
                  font-weight: 300;
                  color: rgba(204, 204, 204, 1);
                }
              }
            }

            .deviceStatus {
              display: flex;
              width: 100%;
              margin-top: 14px;
              justify-content: space-between;

              div {
                span {
                  font-size: 14px;
                  font-family: PingFang SC;
                  font-weight: 300;
                  color: rgba(204, 204, 204, 1);
                }
              }

              .button {
                width: 40px;
                height: 20px;
                text-align: center;
                font-size: 12px;
                color: rgba(204, 204, 204, 1);
                background: rgba(0, 23, 115, 1);
                border-radius: 2px;
              }
            }
          }

          .tableData {
            width: 100%;
            padding-left: 19px;
            padding-top: 20px;
            padding-right: 20px;

            .tableHeader {
              display: flex;
              height: 40px;
              text-align: center;
              background: rgba(0, 13, 66, 0.4);
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

            .tebleColumnSwrap {
              height: 160px;
              width: 100%;
              overflow-y: scroll;

              .tebleColumn {
                display: flex;
                height: 26px;
                cursor: pointer;
                align-items: flex-start;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                margin-top: 14px;
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

            /* 滚动条样式 */
            .tebleColumnSwrap::-webkit-scrollbar {
              width: 10px;
              height: 180px;
              background: rgba(0, 13, 66, 1);
              border-radius: 2px;
            }

            .tebleColumnSwrap::-webkit-scrollbar-thumb {
              /* 滚动条里面小方块 */
              border-radius: 2px;
              width: 11px;
              height: 50px;
              -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              background: rgba(0, 0, 0, 0.2);
            }

            .tebleColumnSwrap::-webkit-scrollbar-track {
              /* 滚动条里面轨道 */
              -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              background: rgba(0, 13, 66, 1);
              border-radius: 4px;
            }
          }
        }

        .pagination2 {
          position: absolute;
          bottom: 1%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .rightCentent {
        position: relative;
        width: 640px;
        margin-bottom: 30px;
        background: rgba(0, 6, 31, 1);
      }
    }
  }
}
</style>
