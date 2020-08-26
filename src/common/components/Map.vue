<template>
  <renderless-component-example>
    <div id="mapContent" @click="handleClick"></div>
    <div class="equipmentStatistics">
      <div class="typeRows">
        <div v-for="(item,index) in mapTypeList" class="typeRowItem">
          <div class="typeClck" v-if="item.type==30" style="background: rgba(219, 132, 44, 0.8);"></div>
          <div class="typeClck" v-if="item.type==41" style="background: rgba(219,89,44,0.8);"></div>
          <div class="typeClck" v-if="item.type==42" style="background: rgba(44,132,219,0.8);"></div>
          <div class="typeClck" v-if="item.type==43" style="background: rgba(219,190,44,0.8);"></div>
          <div class="typeClck" v-if="item.type==31" style="background: rgba(111,219,44,0.8);"></div>
          <span class="typeNameClass">{{item.name}}({{item.num}})</span>
        </div>
      </div>
    </div>
    <DeviceDetailsCom ref="childEquipmentDetails"></DeviceDetailsCom>
  </renderless-component-example>
</template>

<script>
import MapLoader from '../../assets/js/AMap'
import DeviceDetailsCom from '../../common/components/DeviceDetails'
import qs from 'qs'
import { deviceStatus, DeviceType, LevCodeName } from '../../components/rule/typeName'
export default {
  components: {
    MapLoader,
    DeviceDetailsCom,
  },
  data() {
    return {
      markers: [],
      map: '',
      mapTypeList: [],
    }
  },
  methods: {
    handleClick(e) {
      if (e.target.nodeName.toLowerCase() === 'button') {
        this.seeDeviceDatil(e.target.value)
      }
    },
    //地图接口调用
    initMap() {
      //加载数据
      let that = this
      MapLoader().then(
        (AMap) => {
          this.map = new AMap.Map('mapContent', {
            center: [121.203894, 31.083081],
            zoom: 12,
            mapStyle: 'amap://styles/a5752c030da62782b5dbf2ebc3081c36',
            lang: 'zh_cn', //可选值：en，zh_en, zh_cn
          })
          this.$http.post('http://srv.shine-iot.com:8060/org/logps').then((data) => {
            data.data.data.forEach((obj, index) => {
              const lnglat = [obj.areaLong, obj.areaLat]
              that.map.add(
                new AMap.Marker({
                  position: lnglat,
                  icon: 'http://srv.shine-iot.com:8060/img/map/water/green.png',
                  offset: new AMap.Pixel(-15, -15),
                }).on('click', function () {
                  var currentData = qs.stringify({ areaId: obj.areaID })
                  that.$http
                    .post('http://srv.shine-iot.com:8060/org/area/dcnt', currentData)
                    .then(function (response) {
                      var infoWindow
                      //构建信息窗体中显示的内容
                      var info = []
                      let content = `
                          <div >
                            <div style="padding:0px 0px 0px 4px;color:white;font-size:16px;">
                              单位信息
                            </div>
                            <div style=margin-top:10px>
                              <span style=font-size:14px;color:rgba(153,153,153,1);>名称：</span>
                              <span style=font-size:14px;>${response.data.areaName}</span>
                            </div>

                            <div style=width:110%;>
                                <span style=font-size:14px;color:rgba(153,153,153,1);>地址：</span>
                                <span style=font-size:14px;>${response.data.areaLocDetail}</span>
                            </div>

                            <div style=width:100%;display:flex;>
                              <div style=width:150px;>
                                <span style=font-size:14px;color:rgba(153,153,153,1);>联系人：</span>
                                <span style=font-size:14px;>${response.data.areaContact}</span>
                              </div>
                              <div>
                                <span style="font-size:14px;color:rgba(153,153,153,1);">联系电话：</span>
                                <span>${response.data.areaContactPhone}</span>
                              </div>
                            </div>

                            <div style=width:100%;display:flex;>
                              <div style=width:150px;>
                                <span style=font-size:14px;color:rgba(153,153,153,1);>类型：</span>
                                <span style=font-size:14px;>${DeviceType(
                                  response.data.deviceKinds
                                )}</span>
                              </div>
                              <div>
                                <span style=font-size:14px;color:rgba(153,153,153,1);>设备数量：</span>    
                                <span style=font-size:14px;>
                                  ${response.data.deviceCount}
                                </span>
                              </div>
                                                      
                              </div>
                          </div>

                      `
                      infoWindow = new AMap.InfoWindow({
                        content: content, //使用默认信息窗体框样式，显示信息内容
                      })
                      infoWindow.open(that.map, lnglat)
                    })
                })
              )
            })
          })
        },
        (e) => {
          console.log('地图加载失败', e)
        }
      )
    },
    location(areaLong, areaLat) {
      if (areaLong != null && areaLat != null) {
        this.map.setZoomAndCenter(15, [areaLong, areaLat])
      }
    },
    areDeviceMap(data) {
      this.location(data.areaLong, data.areaLat)
      let that = this
      that.markers = []
      var currentData = qs.stringify({ areaId: data.id })
      this.$http
        .post('http://srv.shine-iot.com:8060/device/area/devgps', currentData)
        .then((data) => {
          data.data.data.forEach((obj, index) => {
            const lnglat = [obj.deviceGpsLong, obj.deviceGpsLati]
            if (obj.runStatus === 1) {
              that.map.add(
                new AMap.Marker({
                  position: lnglat,
                  icon: 'http://srv.shine-iot.com:8060/img/map/water/green.png',
                  offset: new AMap.Pixel(-15, -15),
                }).on('click', function () {
                  var infoWindow
                  //构建信息窗体中显示的内容
                  let content = `
                    <div style=width:399px>
                      <div style="padding:0px 0px 0px 4px;font-size:16px;color:white"><b>设备信息</b>
                        <div style=width:100%;display:flex;justify-content:space-between;font-size:14px;>
                          <span style=color:rgba(153,153,153,1);>设备编号：</span>
                          <span>${obj.deviceSN}</span>
                          <span style=color:rgba(153,153,153,1);>设备类型：</span>
                          <span>${obj.dcTypeName}</span>
                        </div>
                        </br>
                        <div style=width:100%;display:flex;font-size:14px;margin-top:-20px><div style=width:195px;>
                          <span style=color:rgba(153,153,153,1);>设备状态：</span>
                          <span>${deviceStatus(obj.runStatus)}</span>
                        </div>
                         </br>
                        <button value='${
                          obj.deviceId
                        }' style=border:none;background:#000D40;color:#365CF5;text-decoration:underline>设备详情</button>
                      </div>
                      </br>
                      <div style=margin-top:-20px;><span style="color:rgba(54,92,245,1);>地址:</span>${
                        obj.deviceAddr
                      }</div>
                      </br>
                    </div>
                  </div>`
                  infoWindow = new AMap.InfoWindow({
                    content: content, //使用默认信息窗体框样式，显示信息内容
                  })
                  infoWindow.open(that.map, lnglat)
                })
              )
            } else if (obj.runStatus === 3) {
              that.map.add(
                new AMap.Marker({
                  position: lnglat,
                  icon: 'http://srv.shine-iot.com:8060/img/map/water/red.png',
                  offset: new AMap.Pixel(-15, -15),
                }).on('click', function () {
                  var infoWindow
                  //构建信息窗体中显示的内容
                  var info = []
                  info.push('<div>')
                  info.push(
                    '<div style="padding:0px 0px 0px 4px;color:black;font-size:14px;color:white"><b>设备信息</b>'
                  )
                  info.push(
                    '<span>设备编号 :' +
                      obj.deviceSN +
                      '</span><span style="margin-left:10px;">设备类型' +
                      obj.dcTypeName +
                      '</span>'
                  )
                  info.push(
                    '<span>设备状态 :' +
                      deviceStatus(obj.runStatus) +
                      '</span><span style="margin-left:20px;color:rgba(54,92,245,1);">设备详情 :</span>'
                  )
                  info.push('地址 :' + obj.deviceAddr + '</div></div>')
                  infoWindow = new AMap.InfoWindow({
                    content: info.join('<br/>'), //使用默认信息窗体框样式，显示信息内容
                  })
                  infoWindow.open(that.map, lnglat)
                })
              )
            }
          })
        })
    },
    seeDeviceDatil(deviceId) {
      this.$refs.childEquipmentDetails.openEquipmentDetails(deviceId)
    },
    kcntFunction(areaId, lang) {
      var paramData = qs.stringify({ areaId: areaId, lang: lang })
      let this_ = this
      this.$http
        .post('http://srv.shine-iot.com:8060/device/org/kcnt', paramData)
        .then(function (response) {
          this_.mapTypeList = response.data
        })
    },
    initEnMap() {
      //加载数据
      let that = this
      MapLoader().then(
        (AMap) => {
          this.map = new AMap.Map('mapContent', {
            center: [121.203894, 31.083081],
            zoom: 12,
            mapStyle: 'amap://styles/a5752c030da62782b5dbf2ebc3081c36',
            lang: 'zh_en', //可选值：en，zh_en, zh_cn
          })
          this.$http.post('http://srv.shine-iot.com:8060/org/logps').then((data) => {
            data.data.data.forEach((obj, index) => {
              const lnglat = [obj.areaLong, obj.areaLat]
              that.map.add(
                new AMap.Marker({
                  position: lnglat,
                  icon: 'http://srv.shine-iot.com:8060/img/map/water/green.png',
                  offset: new AMap.Pixel(-15, -15),
                }).on('click', function () {
                  var currentData = qs.stringify({ areaId: obj.areaID })
                  that.$http
                    .post('http://srv.shine-iot.com:8060/org/area/dcnt', currentData)
                    .then(function (response) {
                      var infoWindow
                      //构建信息窗体中显示的内容
                      var info = []
                      info.push('<div>')
                      info.push(
                        '<div style="padding:0px 0px 0px 4px;color:white;font-size:14px"><b>信息</b>'
                      )
                      info.push('<span>名称 :' + response.data.areaName + '</span>')
                      info.push('<span>地址:' + response.data.areaLocDetail + '</span>')
                      info.push(
                        '<span>联系人:' +
                          response.data.areaContact +
                          '</span><span style="margin-left:30px">联系电话：' +
                          response.data.areaContactPhone +
                          '</span>'
                      )
                      info.push(
                        '<span>设备种类：' +
                          DeviceType(response.data.deviceKinds) +
                          '</span><span style="margin-left:10px">设备数量：' +
                          response.data.deviceCount +
                          '</span></div></div>'
                      )
                      infoWindow = new AMap.InfoWindow({
                        content: info.join('<br/>'), //使用默认信息窗体框样式，显示信息内容
                      })
                      infoWindow.open(that.map, lnglat)
                    })
                })
              )
            })
          })
        },
        (e) => {
          console.log('地图加载失败', e)
        }
      )
    },
  },
  mounted() {
    //加载地图
    setTimeout(() => {
      this.initMap()
    }, 2000)
    this.kcntFunction('', 'zh-CN')
  },
}
</script>
<style lang="stylus" scoped>
#mapContent {
  width: 100%;
  height: 100%;
}

.equipmentStatistics {
  position: fixed;
  bottom: 40px;
  left: 250px;
  width: 657px;
  height: 73px;
  background: rgba(0, 13, 66, 0.4);

  .typeRows {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;

    .typeRowItem {
      display: flex;
      align-items: center;
      margin-left: 30px;

      span {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 300;
        color: rgba(204, 204, 204, 1);
      }

      .typeClck {
        width: 10px;
        height: 10px;
        background: rgba(219, 132, 44, 0.8);
        border-radius: 50%;
        margin-right: 5px;
      }
    }
  }
}
</style>