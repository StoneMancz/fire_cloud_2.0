<template>
  <renderless-component-example>
    <Headers></Headers>
    <div class="centent">
      <LeftCommon></LeftCommon>
      <div class="right">
        <div class="boxWrap">
          <div class="MonitorData">
            <div class="filterData">
              <div>
                <el-select v-model="equipmentValue" placeholder="设备类型" style @change="equipmentValueChange">
                  <el-option label="设备类型" value></el-option>
                  <el-option v-for="item in equipmentTyleList" :key="item.type" :label="item.name" :value="item.type"></el-option>
                </el-select>
              </div>
              <div>
                <el-select v-model="deviceStatus" placeholder="设备状态" @change="deviceStatusChange">
                  <el-option label="设备状态" value></el-option>
                  <el-option v-for="item in deviceStatusList" :key="item.type" :label="item.name" :value="item.type"></el-option>
                </el-select>
              </div>
              <div>
                <input class="installNumbers" placeholder="请输入设备编号" @change="getDevsData" v-model="installNumber">
              </div>
            </div>
            <div class="waterConten">
              <div class="showWaterTanks">
                <div class="watertitle">
                  <span>正常</span>
                  <span>米</span>
                </div>
                <WaterCharts></WaterCharts>
                <div class="Graphics">
                  <div>名称:某某某某某</div>
                  <div>编码:123456789101112</div>
                  <div>区域:某某某某</div>
                  <div>地址:某某某区某某路某某大道</div>
                </div>
              </div>
              <div class="showWaterTanks">
                <div class="watertitle">
                  <span>正常</span>
                  <span>米</span>
                </div>
                <HydraulicFn></HydraulicFn>
                <div class="Graphics">
                  <div>名称:某某某某某</div>
                  <div>编码:123456789101112</div>
                  <div>区域:某某某某</div>
                  <div>地址:某某某区某某路某某大道</div>
                </div>
              </div>
              <div class="showWaterTanks">
                <div class="watertitle">
                  <span>正常</span>
                  <span>米</span>
                </div>
                <Thermometer></Thermometer>
                <div class="Graphics">
                  <div>名称:某某某某某</div>
                  <div>编码:123456789101112</div>
                  <div>区域:某某某某</div>
                  <div>地址:某某某区某某路某某大道</div>
                </div>
              </div>
            </div>
          </div>
          <div class="rightCentent" v-show="show2">
            <RightCommon ref="rightChild"></RightCommon>
          </div>
        </div>
      </div>
    </div>
  </renderless-component-example>
</template>
<script>
import RightCommon from '../../common/components/RightCommon'
import qs from 'qs'
import Headers from '../../common/components/Header'
import LeftCommon from '../../common/components/LeftCommon'
import { deviceStatus, codeName, levCodeName } from './../rule/typeName'
import { getTimeToString } from './../rule/getTime'
import DetailsCommon from '../../common/components/DetailsCommon'
import WaterCharts from './components/WaterCharts'
import HydraulicFn from './components/HydraulicFn'
import Thermometer from './components/Thermometer'
export default {
  data() {
    return {
      equipmentValue: '',
      deviceStatus: '',
      show2: true,
      areaId: '',
      lang: localStorage.getItem('Language'),
      currentPage: '',
      total: 0,
      installInfoList: [],
      installNumberList: [],
      deviceStatusList: [],
      equipmentTyleList: [],
      installNumber: '',
    }
  },
  components: {
    LeftCommon,
    Headers,
    DetailsCommon,
    RightCommon,
    WaterCharts,
    HydraulicFn,
    Thermometer
  },
  mounted() {},
  methods: {
    fatherClickFn(data) {
      this.areaId = data.id
      this.getDevsData()
    },
    //切换中英文
    switchLanguage(lang) {
      this.lang = lang
      this.getDevsData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getDevsData()
    },
    equipmentValueChange() {
      this.getDevsData()
    },
    deviceStatusChange() {
      this.getDevsData()
    },
    installNumberChange() {
      this.getDevsData()
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

      .rightCentent {
        position: relative;
        width: 640px;
        margin-bottom: 30px;
        background: rgba(0, 6, 31, 1);
      }

      .MonitorData {
        flex: 6;
        position: relative;
        margin-right: 30px;
        margin-bottom: 30px;
        padding-left: 30px;
        padding-top: 30px;
        background: #00061f;
        border: 1px solid rgba(112, 212, 254, 1);

         .filterData {
          widows: 100%;
          display: flex;

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


        .waterConten{
          margin-right 30px;
          margin-top:40px;
          .showWaterTanks{
            margin-right:20px
            float left;
            width:220px;
            border:1px solid rgba(112,212,254,0.25);
            background:rgba(0,13,66,1);
            border-radius:4px;
            height:300px
            .watertitle{
              display:flex;
              margin-left:10px;
              margin-top:5px;
              justify-content:space-between;
              span{
                width:26px;
                height:12px;
                font-size:12px;
                font-family:PingFang SC;
                font-weight:300;
                color:rgba(230,230,230,1);
              }
            }

            .Graphics{
              display:flex;
              flex-direction:column;
              margin-left:20px;
              div{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:100;
                color:rgba(204,204,204,1);
              }
            }
          }
        }

        .installInfo {
          height: 680px;
          margin-top: 20px;
          margin-right: 30px;

          .tableHeader {
            display: flex;
            height: 60px;
            text-align: center;
            background: rgba(0, 14, 71, 1);
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

          .tebleColumn {
            display: flex;
            height: 38px;
            cursor: pointer;
            align-items: flex-start;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            margin-top: 22px;
            text-align: center;

            div {
              flex: 2;
              max-width: 200px;
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 300;
              white-space: nowrap;
              overflow: hidden;
              color: rgba(229, 229, 229, 1);
            }
          }

          .pagination2 {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>