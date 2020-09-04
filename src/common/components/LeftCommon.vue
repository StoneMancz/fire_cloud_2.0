<template>
  <div>
    <input type='checkbox' id='sidemenu'>
    <div class="code_area">
      <div id='wrap'>
        <label id='sideMenuControl' for='sidemenu'></label>
      </div>
      <div>
        <input v-model="filterText" class="input__inner" />
      </div>
      <div class="filter-tree">
        <el-tree :data="data" :props="defaultProps" :filter-node-method="filterNode" ref="tree" @node-click="clickFn">
        </el-tree>
      </div>
      <div class="qrcodeClass">
        <div id="qrcode"></div>
        <div class="arerDesc">
          <div><span>{{$t('Index.Installation.area')}}：</span><span>{{areaName}}</span></div>
          <div><span>{{$t('Index.principal')}}：</span><span>{{areaContact}}</span></div>
          <div><span>{{$t('Index.Contact')}}：</span><span>{{areaContactPhone}}</span></div>
          <div><span>{{$t('Index.AddressInfo')}}：</span><span>{{areaLocDetail}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import qs from 'qs'
export default {
  data() {
    return {
      areaID: '',
      data: [],
      areaName:'',
      filterText: '',
      areaContact: '',
      areaContactPhone: '',
      areaLocDetail: '',
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  methods: {
    clickFn(data) {
      console.log(data);
      this.areaName=data.label;
      this.areaContact = data.areaContact
      this.areaContactPhone = data.areaContactPhone
      this.areaLocDetail = data.areaLocDetail
      document.getElementById('qrcode').innerHTML = ''
      this.qrcode(data.areaQRCode)
      this.$parent.fatherClickFn(data)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    qrcode(text) {
      let that = this
      let qrcode = new QRCode('qrcode', {
        width: 100,
        height: 100,
        text: text,
      })
    },
    toTree(data) {
      let result = []
      if (!Array.isArray(data)) {
        return result
      }
      data.forEach((item) => {
        delete item.children
      })
      let map = {}
      data.forEach((item) => {
        map[item.id] = item
      })
      data.forEach((item) => {
        let parent = map[item.parentAreaID]
        if (parent) {
          ;(parent.children || (parent.children = [])).push(item)
        } else {
          result.push(item)
        }
      })
      return result
    },
    initArea() {
      let this_ = this
      this.$http.post('http://srv.shine-iot.com:8060/area/org/areas').then(function (response) {
        let areaData = response.data.data
        this_.data = this_.toTree(areaData)
      })
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
  },
  mounted() {
    this.qrcode('area-22e214823b294d57b1ffd5e557b325ad')
    this.initArea()
  },
}
</script>
<style lang="stylus" scoped>
.code_area {
  position: relative;
  margin-top: 5px;
  width: 200px;
  float: left;
  height: 100%;
  z-index: 99;
  background: rgba(0, 4, 20, 1);
  text-align: center;

  .input__inner {
    width: 140px;
    height: 30px;
    margin-top: 20px;
    border: none;
    color: white;
    background: rgba(0, 13, 66, 1);
  }

  .filter-tree {
    margin-top: 20px;
    max-height: 445px;
    overflow: auto;
  }

  /* 滚动条样式 */
  .filter-tree::-webkit-scrollbar {
    /* 滚动条整体样式 */
    width: 4px; /* 高宽分别对应横竖滚动条的尺寸 */
    height: 4px;
  }

  .filter-tree::-webkit-scrollbar-thumb {
    /* 滚动条里面小方块 */
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .filter-tree::-webkit-scrollbar-track {
    /* 滚动条里面轨道 */
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  .qrcodeClass {
    position: absolute;
    left: 35px;
    bottom: 60px;

    .arerDesc {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      justify-content: flex-start;

      div {
        display: flex;
        max-width: 150px;
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
        justify-content: flex-start;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 300;
        color: rgba(204, 204, 204, 1);
      }
    }
  }
}

.el-tree {
  background: rgba(0, 4, 20, 1);
  color: #A7B1C2;
}

#sidemenu {
  display: none;
}

#sidemenu:checked + .code_area {
  width: 0px;
  left: -200px;

  #sideMenuControl {
    margin-left: 0px;
    width: 30px;
    height: 120px;
    background: url('~@/static/img/right.png') no-repeat;
    background-position: center center;
  }
}

#wrap {
  margin-left: 200px;
  transition: 0.2s ease-out;

  #sideMenuControl {
    width: 30px;
    height: 120px;
    position: absolute;
    z-index: 9999;
    top: 50%;
    margin-left: -30px;
    margin-top: -45px;
    background: url('~@/static/img/left.png') no-repeat;
    background-position: center center;
  }
}
</style>