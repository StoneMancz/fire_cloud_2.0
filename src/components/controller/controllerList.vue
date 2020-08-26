<template>
  <renderless-component-example>
    <Headers></Headers>
    <div class="centent">
      <LeftCommon></LeftCommon>
      <div class="right">
        <div class="boxWrap">
          <div class="leftTable">
            <el-tabs v-model="activeName1" @tab-click="handleClick">
              <el-tab-pane label="异常节点" name="first">
                <div class="table">
                  <div class="tebleHeader" style="background:rgba(0,14,71,1);">
                    <div>机号</div>
                    <div>回路号</div>
                    <div>节点号</div>
                    <div>节点类型</div>
                    <div>节点状态</div>
                    <div>分区</div>
                    <div>地址</div>
                    <div>时间</div>
                    <div>操作</div>
                  </div>
                  <div class="tebleColumn" v-for="item in tableData" :key="item.id">
                    <div>{{item.mcNo}}</div>
                    <div>{{item.loopNo}}</div>
                    <div>{{item.nodeNo}}</div>
                    <div>{{item.nodeTypeName}}</div>
                    <div>{{item.nodeStatName}}</div>
                    <div>{{item.area}}</div>
                    <div>{{item.deviceAddr}}</div>
                    <div></div>
                    <div>
                      <span class="detalis">详情</span>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="控制器列表" name="second">
                <div class="table">
                  <div class="tebleHeader" style="background:rgba(0,14,71,1);">
                    <div>机号</div>
                    <div>控制器号</div>
                    <div>控制器状态</div>
                    <div>区域</div>
                    <div>地址</div>
                    <div>操作</div>
                  </div>
                  <div class="tebleColumn" v-for="(item1,index1) in tableData1" :key="index1" style="background:#00061F">
                    <div>{{item1.mcNo}}</div>
                    <div>{{item1.ctrlNo}}</div>
                    <div>{{item1.ctrlCmdName}}</div>
                    <div>{{item1.areaName}}</div>
                    <div>{{item1.deviceAddr}}</div>
                    <div>
                      <span class="detalis">详情</span>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
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
import qs from 'qs'
import Headers from '../../common/components/Header'
import LeftCommon from '../../common/components/LeftCommon'
import RightCommon from '../../common/components/RightCommon'
export default {
  components: {
    Headers,
    LeftCommon,
    RightCommon,
  },
  data() {
    return {
      activeName1: 'first',
      show2: true,
      areaId: '',
      lang: 'zh-CN',
      pageNo: 1,
      tableData: [],
      tableData2: [],
    }
  },
  mounted() {
    this.abnormalNode(this.areaId, this.pageNo, this.lang)
    this.controllerList(this.areaId, this.pageNo, this.lang)
  },
  methods: {
    handleClick(tab, event) {},
    fatherClickFn(data) {
      this.areaId = data.id
      //显示右侧数据
      this.$refs.rightChild.initControllEchar(this.lang, data.id)
    },
    abnormalNode(areaId, pageNo, lang) {
      let this_ = this
      var currentData = qs.stringify({
        areaId: areaId,
        pageNo: pageNo,
        lang: lang,
      })
      this.$http
        .post('http://srv.shine-iot.com:8060/fctrl/faultnds', currentData)
        .then(function (response) {
          this_.tableData = response.data.data.records
        })
    },
    controllerList(areaId, pageNo, lang) {
      let this_ = this
      var currentData = qs.stringify({
        areaId: areaId,
        pageNo: pageNo,
        lang: lang,
      })
      this.$http
        .post('http://srv.shine-iot.com:8060/fctrl/devs', currentData)
        .then(function (response) {
          this_.tableData1 = response.data.data.records
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
      color: #fff;
      height: 100%;
      display: flex;

      .leftTable {
        flex: 6;
        margin-right: 10px;
        padding: 15px;
        position: relative;
        background: #00061f;

        .table {
          width: 100%;
          margin: 20px auto;
          text-align: center;
          background: #00061f;

          .tebleColumn, .tebleHeader {
            display: flex;
            justify-content: center;
            text-align: center;
            border-bottom: 1px solid #0f152c;

            div {
              flex: 1;
              height: 45px;
              line-height: 40px;
              border-bottom: 1px solid #0f152c;

              .detalis {
                color: #70d4fe;
                cursor: pointer;
              }
            }
          }
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

>>> .el-pagination {
  color: white !important;
  background: transparent !important;
}

>>> .el-pager, >>> .el-pager li {
  background: transparent !important;
}

>>> .el-pagination .btn-next, >>> .el-pagination .btn-prev {
  background: transparent !important;
  color: #fff !important;
}

.el-pagination >>> button:disabled, .el-pagination >>> button:disabled {
  color: white !important;
  background: transparent !important;
}

>>> .el-tabs__item {
  color: #fff !important;
}

>>> .el-tabs__nav-wrap::after {
  background-color: transparent;
}

>>> .el-input__inner {
  width: 120px;
  background: #000d42;
  border: none;
}
</style>