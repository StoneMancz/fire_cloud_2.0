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
                <el-select v-model="deviceStatus" placeholder="设备状态" style @change="deviceStatusChange">
                  <el-option label="设备状态" value></el-option>
                  <el-option v-for="item in deviceStatusList" :key="item.type" :label="item.name" :value="item.type"></el-option>
                </el-select>
              </div>
              <div>
                <el-select v-model="installNumber" placeholder="安装编号" style @change="installNumberChange">
                  <el-option label="安装编号" value></el-option>
                  <el-option v-for="item in installNumberList" :key="item.type" :label="item.name" :value="item.type"></el-option>
                </el-select>
              </div>
            </div>
            <div class="installInfo">
              <div class="tableHeader">
                <span>安装编号</span>
                <span>设备名称</span>
                <span>设备编码</span>
                <span>当前状态</span>
                <span>所属区域</span>
                <span>地址</span>
                <span>详情</span>
              </div>
              <div class="tebleColumn" v-for="(item,index) in installInfoList" @click="installInfoDetails(item.eventId)" :key="index">
                <div>{{item.installNumber}}</div>
                <div>{{item.dcShortName}}</div>
                <div>{{item.deviceSN}}</div>
                <div style="color:rgba(0,143,19,1);" v-if="item.runStatusName=='正常'">{{item.runStatusName}}</div>
                <div style="color:red;" v-else-if="item.runStatusName=='报警'">{{item.runStatusName}}</div>
                <div v-else>{{item.runStatusName}}</div>
                <div>{{item.areaName}}</div>
                <div>{{item.deviceAddr}}</div>
                <div style="color:rgba(112,212,254,1);">详情</div>
              </div>
              <el-pagination class="pagination2" :current-page.sync="currentPage" layout="prev, pager, next" :total="total" style="text-align: center;" @current-change="handleCurrentChange"></el-pagination>
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
export default {
  data() {
    return {
      equipmentValue: '',
      deviceStatus: '',
      show2: true,
      areaId: '',
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
  },
  mounted() {
    //查询设备列表
    this.getDevsData()
    //查询设备类型
    this.deiceTypes()
    //查询设备的状态列表
    this.deiceStusList()
  },
  methods: {
    getDevsData() {
      let this_ = this
      var currentData = qs.stringify({
        areaId: this.areaId,
        deviceType: this.equipmentValue,
        runStatus: this.deviceStatus,
        deviceSN: this.installNumber,
        pageNo: this.currentPage,
      })
      this.$http
        .post('http://srv.shine-iot.com:8060/fdev/mnt/devs', currentData)
        .then(function (response) {
          this_.installInfoList = response.data.data.records
          this_.total = response.data.data.total
        })
    },
    fatherClickFn(data) {
      this.areaId = data.id
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
    //查询设备类型
    deiceTypes() {
      let this_ = this
      this.$http.get('http://srv.shine-iot.com:8060/fdev/mnt/types').then(function (response) {
        console.log('设备类型')
        console.log(response)
        this_.equipmentTyleList = response.data.data
      })
    },
    //查询设备的状态列表
    deiceStusList() {
      let this_ = this
      this.$http.get('http://srv.shine-iot.com:8060/fdev/mnt/stus').then(function (response) {
        this_.deviceStatusList = response.data.data
      })
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