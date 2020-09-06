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
      map: '',
      lang: localStorage.getItem('Language'),
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
    initMap(lang) {
      this.lang = lang
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
              if (obj.areaLong != '' && obj.areaLat != '') {
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
                          <div style='width:393px'>
                            <div style="padding:0px 0px 0px 4px;color:white;font-size:16px;">
                              单位信息
                            </div>
                            <div style=margin-top:10px>
                              <span style=font-size:14px;color:rgba(153,153,153,1);>名称：</span>
                              <span style=font-size:14px;margin-left:30px>${response.data.areaName}</span>
                            </div>

                            <div style=width:100%;margin-top:19px>
                                <span style=font-size:14px;color:rgba(153,153,153,1);>地址：</span>
                                <span style=font-size:14px;margin-left:30px>${response.data.areaLocDetail}</span>
                            </div>

                            <div style=width:100%;display:flex;margin-top:19px>
                              <div style=width:150px;>
                                <span style=font-size:14px;color:rgba(153,153,153,1);>联系人：</span>
                                <span style=font-size:14px;>${response.data.areaContact}</span>
                              </div>
                              <div>
                                <span style="font-size:14px;color:rgba(153,153,153,1);margin-left:70px">联系电话：</span>
                                <span>${response.data.areaContactPhone}</span>
                              </div>
                            </div>

                            <div style=width:100%;display:flex;margin-top:19px>
                              <div style=width:150px;>
                                <span style=font-size:14px;color:rgba(153,153,153,1);>设备种类：</span>
                                <span style=font-size:14px;>${response.data.deviceKinds}</span>
                              </div>
                              <div>
                                <span style=font-size:14px;color:rgba(153,153,153,1);margin-left:70px>设备数量：</span>    
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
              } else {
                return
              }
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
      var currentData = qs.stringify({ areaId: data.id, lang: this.lang })
      this.$http
        .post('http://srv.shine-iot.com:8060/device/area/devgps', currentData)
        .then((data) => {
          data.data.data.forEach((obj, index) => {
            const lnglat = [obj.deviceGpsLong, obj.deviceGpsLati]
            if (obj.runStatus === 1 || obj.runStatus === 29) {
              that.map.add(
                new AMap.Marker({
                  position: lnglat,
                  icon: 'http://srv.shine-iot.com:8060/img/map/water/green.png',
                  offset: new AMap.Pixel(-15, -15),
                }).on('click', function () {
                  var infoWindow
                  //构建信息窗体中显示的内容
                  let content = `
                    <div style='width:399px'>
                      <div style="padding:0px 0px 0px 4px;font-size:16px;color:white"><b>${that.$t(
                        'Index.Information'
                      )}</b>
                        <div style=width:100%;display:flex;justify-content:space-between;font-size:14px;margin-top:20px>
                          <span style=color:rgba(153,153,153,1);>${that.$t(
                            'Index.DeviceID'
                          )}：</span>
                          <span>${obj.deviceSN}</span>
                          <span style=color:rgba(153,153,153,1);margin-left:10px;>${that.$t(
                            'Index.Type'
                          )}：</span>
                          <span>${obj.dcTypeName}</span>
                        </div>
                        </br>
                        <div style=width:100%;display:flex;font-size:14px;><div style=width:195px;>
                          <span style=color:rgba(153,153,153,1);>${that.$t('Index.Status')}：</span>
                          <span>${obj.runStatusName}</span>
                        </div>
                         </br>
                        <button value='${
                          obj.deviceId
                        }' style=border:none;background:#000D40;color:#365CF5;text-decoration:underline;margin-left:10px;>${that.$t(
                    'Index.Details'
                  )}</button>
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
            } else if (
              obj.runStatus === 3 ||
              obj.runStatus === 69 ||
              obj.runStatus === 67 ||
              obj.runStatus === 28
            ) {
              console.log(obj)
              that.map.add(
                new AMap.Marker({
                  position: lnglat,
                  icon: 'http://srv.shine-iot.com:8060/img/map/water/red.png',
                  offset: new AMap.Pixel(-15, -15),
                }).on('click', function () {
                  var infoWindow
                  //构建信息窗体中显示的内容
                  let content = `
                    <div style='width:399px'>
                      <div style="padding:0px 0px 0px 4px;font-size:16px;color:white"><b>${that.$t(
                        'Index.Information'
                      )}</b>
                        <div style=width:100%;display:flex;justify-content:space-between;font-size:14px;margin-top:20px>
                          <span style=color:rgba(153,153,153,1);>${that.$t(
                            'Index.DeviceID'
                          )}：</span>
                          <span>${obj.deviceSN}</span>
                          <span style=color:rgba(153,153,153,1);margin-left:10px;>${that.$t(
                            'Index.Type'
                          )}：</span>
                          <span>${obj.dcTypeName}</span>
                        </div>
                        </br>
                        <div style=width:100%;display:flex;font-size:14px;><div style=width:195px;>
                          <span style=color:rgba(153,153,153,1);>${that.$t('Index.Status')}：</span>
                          <span>${obj.runStatusName}</span>
                        </div>
                         </br>
                        <button value='${
                          obj.deviceId
                        }' style=border:none;background:#000D40;color:#365CF5;text-decoration:underline;margin-left:10px;>${that.$t(
                    'Index.Details'
                  )}</button>
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
            } else if (obj.runStatus === 2 || obj.runStatus === 8) {
              console.log(obj)
              that.map.add(
                new AMap.Marker({
                  position: lnglat,
                  icon: 'http://srv.shine-iot.com:8060/img/map/water/orange.png',
                  offset: new AMap.Pixel(-15, -15),
                }).on('click', function () {
                  var infoWindow
                  //构建信息窗体中显示的内容
                  let content = `
                    <div style='width:399px'>
                      <div style="padding:0px 0px 0px 4px;font-size:16px;color:white"><b>${that.$t(
                        'Index.Information'
                      )}</b>
                        <div style=width:100%;display:flex;justify-content:space-between;font-size:14px;margin-top:20px>
                          <span style=color:rgba(153,153,153,1);>${that.$t(
                            'Index.DeviceID'
                          )}：</span>
                          <span>${obj.deviceSN}</span>
                          <span style=color:rgba(153,153,153,1);margin-left:10px;>${that.$t(
                            'Index.Type'
                          )}：</span>
                          <span>${obj.dcTypeName}</span>
                        </div>
                        </br>
                        <div style=width:100%;display:flex;font-size:14px;><div style=width:195px;>
                          <span style=color:rgba(153,153,153,1);>${that.$t('Index.Status')}：</span>
                          <span>${obj.runStatusName}</span>
                        </div>
                         </br>
                        <button value='${
                          obj.deviceId
                        }' style=border:none;background:#000D40;color:#365CF5;text-decoration:underline;margin-left:10px;>${that.$t(
                    'Index.Details'
                  )}</button>
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
            } else {
              that.map.add(
                new AMap.Marker({
                  position: lnglat,
                  icon: 'http://srv.shine-iot.com:8060/img/map/water/green.png',
                  offset: new AMap.Pixel(-15, -15),
                }).on('click', function () {
                  var infoWindow
                  //构建信息窗体中显示的内容
                  let content = `
                    <div style='width:399px'>
                      <div style="padding:0px 0px 0px 4px;font-size:16px;color:white"><b>${that.$t(
                        'Index.Information'
                      )}</b>
                        <div style=width:100%;display:flex;justify-content:space-between;font-size:14px;margin-top:20px>
                          <span style=color:rgba(153,153,153,1);>${that.$t(
                            'Index.DeviceID'
                          )}：</span>
                          <span>${obj.deviceSN}</span>
                          <span style=color:rgba(153,153,153,1);margin-left:10px;>${that.$t(
                            'Index.Type'
                          )}：</span>
                          <span>${obj.dcTypeName}</span>
                        </div>
                        </br>
                        <div style=width:100%;display:flex;font-size:14px;><div style=width:195px;>
                          <span style=color:rgba(153,153,153,1);>${that.$t('Index.Status')}：</span>
                          <span>${obj.runStatusName}</span>
                        </div>
                         </br>
                        <button value='${
                          obj.deviceId
                        }' style=border:none;background:#000D40;color:#365CF5;text-decoration:underline;margin-left:10px;>${that.$t(
                    'Index.Details'
                  )}</button>
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
    initEnMap(lang) {
      //加载数据
      this.lang = lang
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
              if (obj.areaLong != '' && obj.areaLat != '') {
                that.map.add(
                  new AMap.Marker({
                    position: lnglat,
                    icon: 'http://srv.shine-iot.com:8060/img/map/water/green.png',
                    offset: new AMap.Pixel(-15, -15),
                  }).on('click', function () {
                    var currentData = qs.stringify({
                      areaId: obj.areaID,
                      lang: 'en-US',
                    })
                    that.$http
                      .post('http://srv.shine-iot.com:8060/org/area/dcnt', currentData)
                      .then(function (response) {
                        var infoWindow
                        //构建信息窗体中显示的内容
                        var info = []
                        let content = `
                          <div style='width:393px'>
                            <div style="padding:0px 0px 0px 4px;color:white;font-size:16px;">
                              Information
                            </div>
                            <div style=margin-top:10px>
                              <span style=font-size:14px;color:rgba(153,153,153,1);>Name：</span>
                              <span style=font-size:14px;margin-left:30px>${response.data.areaName}</span>
                            </div>

                            <div style=width:100%;margin-top:19px>
                                <span style=font-size:14px;color:rgba(153,153,153,1);>address：</span>
                                <span style=font-size:14px;margin-left:30px>${response.data.areaLocDetail}</span>
                            </div>

                            <div style=width:100%;display:flex;margin-top:19px>
                              <div style=width:150px;>
                                <span style=font-size:14px;color:rgba(153,153,153,1);>Contact：</span>
                                <span style=font-size:14px;>${response.data.areaContact}</span>
                              </div>
                              <div>
                                <span style="font-size:14px;color:rgba(153,153,153,1);margin-left:70px">phone：</span>
                                <span>${response.data.areaContactPhone}</span>
                              </div>
                            </div>

                            <div style=width:100%;display:flex;margin-top:19px>
                              <div style=width:150px;>
                                <span style=font-size:14px;color:rgba(153,153,153,1);>species：</span>
                                <span style=font-size:14px;>${response.data.deviceKinds}</span>
                              </div>
                              <div>
                                <span style=font-size:14px;color:rgba(153,153,153,1);margin-left:70px>Amount：</span>    
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
              } else {
                return
              }
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
    if (this.lang == 'zh-CN') {
      //加载中文地图
      setTimeout(() => {
        this.initMap(this.lang)
      }, 1000)
    } else {
      //加载英文地图
      setTimeout(() => {
        this.initEnMap(this.lang)
      }, 1000)
    }

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