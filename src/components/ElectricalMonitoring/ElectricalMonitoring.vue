
<template>
  <renderless-component-example>
    <Headers></Headers>
    <div class="centent">
      <LeftCommon></LeftCommon>
      <div class="right">
        <div class="boxWrap">
          <div class="ElectricaData">
            <div class="filterData">
              <div>
                <input
                  class="installNumbers"
                  :placeholder="$t('ElectricalMonitoring.coding')"
                  v-model="deviceSN"
                  @change="changeElectData"
                />
              </div>
              <div>
                <el-select
                  v-model="loopStatus"
                  :placeholder="$t('FireMonitoring.State')"
                  @change="changeElectData"
                >
                  <el-option :label="$t('FireMonitoring.status')" value></el-option>
                  <el-option
                    v-for="item in status"
                    :key="item.type"
                    :label="item.name"
                    :value="item.type"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div class="electricTable" v-for="(item,index) in recordsData" :key="index">
              <div class="electricTile">
                <div class="deviceName">
                  <div>
                    <span>{{$t('ElectricalMonitoring.coding')}}：{{item.deviceSN}}</span>
                  </div>
                  <div style="width:153px">
                    <span>{{$t('ElectricalMonitoring.name')}}：{{item.dcTypeName}}</span>
                  </div>
                </div>
                <div class="deviceStatus">
                  <div>
                    <span>{{$t('ElectricalMonitoring.status')}}：{{item.runStatusName}}</span>
                  </div>
                  <div style="width:153px;display: flex;justify-content: space-between;">
                    <span>{{$t('ElectricalMonitoring.area')}}：{{item.areaName}}</span>
                    <span
                      class="button"
                      @click="seeDeviceDetail(item.deviceId)"
                    >{{$t('FireMonitoring.Details')}}</span>
                  </div>
                </div>
                <div class="deviceStatus">
                  <div>
                    <span>{{$t('ElectricalMonitoring.address')}}：{{item.deviceAddr}}</span>
                  </div>
                  <div class="button">{{$t('ElectricalMonitoring.Reset')}}</div>
                </div>
              </div>
              <div class="tableData">
                <div class="tableHeader">
                  <span>{{$t('ElectricalMonitoring.addrNum')}}</span>
                  <span>{{$t('ElectricalMonitoring.Loop')}}</span>
                  <span>{{$t('ElectricalMonitoring.name')}}</span>
                  <span>{{$t('ElectricalMonitoring.value')}}</span>
                  <span>{{$t('ElectricalMonitoring.LoopStatus')}}</span>
                  <span>{{$t('ElectricalMonitoring.operating')}}</span>
                </div>
                <div class="tebleColumnSwrap">
                  <div class="tebleColumn" v-for="(item1,index1) in item.electList" :key="index1">
                    <div>{{item1.addrNum}}</div>
                    <div>{{item1.loopNum}}</div>
                    <div>{{item1.typeName}}</div>
                    <div>{{item1.checkVal}}{{item1.unitName}}</div>
                    <div v-if="item1.loopStatus==1" style="color:green">{{item1.statusName}}</div>
                    <div v-if="item1.loopStatus!=1" style="color:yellow">{{item1.statusName}}</div>
                    <div
                      @click="openHistory(item1.electId,item1.typeName)"
                      class="historyCss"
                    >{{$t('ElectricalMonitoring.history')}}</div>
                  </div>
                </div>
              </div>
            </div>
            <el-pagination
              class="pagination2"
              :current-page.sync="currentPage"
              layout="prev, pager, next"
              :total="total"
              style="text-align: center;"
            ></el-pagination>
          </div>
          <div class="rightCentent" v-show="show2">
            <RightCommon ref="rightChild"></RightCommon>
          </div>
        </div>
      </div>
    </div>
    <HistoryRecord ref="history"></HistoryRecord>
    <DeviceDetailsCom ref="childEquipmentDetails"></DeviceDetailsCom>
    <img
      v-show="!show2"
      src="../../static/img/left.png"
      @click="openRightCommon"
      style="position: absolute;right: 0;top: 350px;width: 30px;height: 120px;cursor: pointer;"
    />
  </renderless-component-example>
</template>
<script>
import qs from "qs";
import Headers from "../../common/components/Header";
import LeftCommon from "../../common/components/LeftCommon";
import RightCommon from "../../common/components/RightCommon";
import HistoryRecord from "./components/HistoryRecord";
import DeviceDetailsCom from "../../common/components/DeviceDetails";
export default {
  data() {
    return {
      show2: true,
      pageNo: 1,
      areaId: "",
      total: 0, // 事件列表length
      deviceSN: "",
      loopStatus: "",
      lang: localStorage.getItem("Language"),
      status: [],
      recordsData: [],
    };
  },
  components: {
    Headers,
    RightCommon,
    LeftCommon,
    HistoryRecord,
    DeviceDetailsCom,
  },
  mounted() {
    this.initElecticaData(
      this.pageNo,
      this.areaId,
      this.deviceSN,
      this.loopStatus,
      this.lang
    );
    this.statusList();
  },
  methods: {
    initElecticaData(pageNo, areaId, deviceSN, loopStatus, lang) {
      let this_ = this;
      var currentData = qs.stringify({
        pageNo: pageNo,
        areaId: areaId,
        deviceSN: deviceSN,
        loopStatus: loopStatus,
        lang: lang,
      });
      this.$http
        .post("http://srv.shine-iot.com:8060/elect/devs", currentData)
        .then(function (response) {
          this_.recordsData = response.data.data.records;
          this_.total = response.data.data.total;
          this_.pageNo = response.data.data.current;
        });
    },
    seeDeviceDetail(deviceId) {
      this.$refs.childEquipmentDetails.openEquipmentDetails(deviceId);
    },
    closeRightComponents() {
      this.show2 = false;
    },
    openRightCommon() {
      this.show2 = true;
    },
    changeElectData() {
      this.initElecticaData(
        this.pageNo,
        this.areaId,
        this.deviceSN,
        this.loopStatus,
        this.lang
      );
    },
    //查询当前状态列表接口
    statusList() {
      let this_ = this;
      var currentData = { lang: this_.lang };
      this.$http
        .get("http://srv.shine-iot.com:8060/elect/channel/stus", {
          params: currentData,
        })
        .then(function (response) {
          this_.status = response.data.data;
        });
    },
    fatherClickFn(data) {
      this.areaId = data.id;
      //显示右侧数据
      this.$refs.rightChild.initElectEchar(this.lang, data.id);
      this.initElecticaData(
        this.pageNo,
        this.areaId,
        this.deviceSN,
        this.loopStatus,
        this.lang
      );
    },
    openHistory(electId, typeName) {
      this.$refs.history.histval(electId, "", "");
      this.$refs.history.openHistory(typeName);
    },
    switchLanguage(lang) {
      this.lang = lang;
      this.initElecticaData(
        this.pageNo,
        this.areaId,
        this.deviceSN,
        this.loopStatus,
        this.lang
      );
      this.$refs.rightChild.initElectEchar(this.lang, this.areaId);
      this.statusList();
    },
  },
};
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

        .filterData {
          widows: 100%;
          display: flex;
          margin-top: 30px;
          margin-bottom: 30px;

          div {
            width: 220px;
            margin-right: 20px;

            .installNumbers {
              width: 210px;
              color: white;
              height: 40px;
              background: rgba(0, 13, 65, 1);
              border-radius: 4px;
            }
          }
        }

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
                cursor: pointer;
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

                .historyCss {
                  font-size: 14px;
                  font-family: PingFang SC;
                  font-weight: 300;
                  text-decoration: underline;
                  color: #70D4FE;
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
